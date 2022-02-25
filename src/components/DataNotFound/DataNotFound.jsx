import React, { useEffect, useState } from "react";
// import pic from "./dnf.png";
// import tt from "./dnf.jpeg";
import "./DataNotFound.css";

import gifimage from "./58718-404-error-page.gif";
import { GetNoServicePageData } from "../AllApi";

let NoDataFoundArray = [];

function DataNotFound() {
  const [datanotfound, setDatanotfound] = useState([]);

  var GetNoServicePageURL = `${GetNoServicePageData}?CountryCode=92`;

  useEffect(() => {
    (async () => {
      try {
        const fetchGetNoServicePage = await fetch(GetNoServicePageURL);
        const LoadGetNoServicePage = await fetchGetNoServicePage.json();
      } catch (err) {}
      return fetch(`${GetNoServicePageURL}`)
        .then((res) => res.json())
        .then((Response) => {
          var GetNoServicePageResponse = JSON.parse(Response.Result.Response);
          // console.log(GetNoServicePageResponse)
          var GetNoServicePageObject = JSON.parse(Response.Result.Data);
          NoDataFoundArray = GetNoServicePageObject;

          if (
            typeof GetNoServicePageObject != "undefined" &&
            GetNoServicePageObject != null
          ) {
            var NoFound = GetNoServicePageObject.Data;
            if (NoFound != null) {
              setDatanotfound(NoFound);
              // console.log(NoFound);
            }
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    })();
  }, []);

  let byCategory = "";
  var ResturantQuery = localStorage.getItem("querry");
  var CategoryQuery = localStorage.getItem("CateName");

  if (ResturantQuery != null) {
    byCategory = ResturantQuery;
  } else {
    byCategory = CategoryQuery;
  }
  //byCategory=localStorage.getItem('CateName');
  function onKillCateID() {
    //  alert(88);
    //window.location.href='/Main';
    localStorage.removeItem("Cate");
    localStorage.removeItem("querry");
    localStorage.removeItem("CateName");
    //window.location.href='/main';
  }
  return (
    <div className="dataNotfoundMain">
      {typeof datanotfound != "undefined" && datanotfound.length > 0
        ? datanotfound.map((val) => {
            return (
              <>
                <img
                  className="dataNotFoundImage"
                  alt="Image 404"
                  speed="4"
                  loop
                  controls
                  autoplay
                  src={gifimage}
                />
                <div class="fj fk fl fi jd">
                  {val.HeaderText}
                  <p style={{ color: "black" }}>{val.BodyText}</p>
                  <a href="/">
                    <button id="btndatanotfound">{val.ButtonText}</button>
                  </a>
                </div>
              </>
            );
          })
        : null}
    </div>
  );
}
export default DataNotFound;
