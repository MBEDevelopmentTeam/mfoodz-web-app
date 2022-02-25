import React, { useState, useEffect } from "react";
import { Typeahead, AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./TAhead.css";
import { presavedlocationfromourdb, GoogleKey } from "../AllApi";
import $ from "jquery";
import { FaSearchLocation } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAddress } from "../../actions";
import { updatedStore } from "../../index";
import { notifySuccess, notifyError } from "../Notifications";
// import { FaBeer } from 'react-icons/fa';
// import { MdOutlineMyLocation } from "@react-icons/all-files/Md/MdOutlineMyLocation";
// import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import options from './aData';
// import { Header } from "carbon-components-react";

// const find = () => {
//   window.location.href = "/Main";
// };

let TestLat = null;
let Testlng = null;
let TestLocationName = null;
let options = [];
let count = 0;
export const TAhead = () => {
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selected, setSelected] = useState([]);

  // const [onChangeSelected, setonChangeSelected] = useState("");

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    // console.log('lat')
    // console.log(position.coords.latitude)
    // console.log('long')
    // console.log(position.coords.longitude)
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    findAddressFromLatLong(lat, lng);
  }

  function findAddressFromLatLong(latitude, longitude) {
    let LatLng = {
      lat: latitude,
      lng: longitude,
    };

    if (Object.keys(LatLng).length > 0) {
      var lat = LatLng.lat;
      var lng = LatLng.lng;

      //convert to String
      var currentLatLong = `${lat},${lng}`;

      fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          currentLatLong +
          "&key=AIzaSyBoggmNYAGO4585YCVDhYsQOrr_YLl_pYs",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      )
        .then((responseJson) => responseJson.json())
        .then(async (responseJson) => {
          if (responseJson.status == window.google.maps.GeocoderStatus.OK) {
            var location = responseJson.results[0].formatted_address;

            if (location != null) {
              updatedStore.dispatch(
                getCurrentAddress({
                  address: location,
                  lat: lat,
                  long: lng,
                  label: location,
                })
              );

              const LoadingObj = [
                {
                  label: location,
                  lat: parseFloat(lat),
                  lng: parseFloat(lng),
                },
              ];
              setSelected(LoadingObj);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  if (typeof selected[0] != "undefined" && selected[0] != null) {
    TestLat = selected[0].lat;
    Testlng = selected[0].lng;
    TestLocationName = selected[0].label;
    localStorage.setItem("lat", TestLat);
    localStorage.setItem("lng", Testlng);
    localStorage.setItem("TestLocationName", TestLocationName);
  }

  function fn_MoveMainPage() {
    if (typeof selected[0] != "undefined") {
      if (TestLat == null && Testlng == null) {
        window.location.href = "/dataNotFound";
        //notifyError("Please select loaction");
      } else {
        window.open(
          `/main?lat=${TestLat}&lng=${Testlng}&CountryCode=${CountryCode}`,
          "_self"
        );
      }
    } else {
      alert("Please type your address to find food!");
    }
  }

  let userdID = localStorage.getItem("UserId");
  // console.log(userdID);
  if (userdID == null) {
  } else {
  }

  let SearchValue = null;
  let lat = null;
  let lng = null;
  let CountryCode = null;
  let NewCountryCode = null;

  var utc;
  var currentTime = new Date();
  var currentTimezone = currentTime.getTimezoneOffset();
  currentTimezone = (currentTimezone / 60) * -1;

  if (currentTimezone !== 0) {
    utc = currentTimezone > 0 ? " +" : " ";
    utc += currentTimezone;
  }
  if (utc > 0) {
    CountryCode = "PK";
  } else {
    CountryCode = "CA";
  }
  localStorage.setItem("CountryCode", CountryCode);
  // console.log(CountryCode);
  if (CountryCode == "CA") {
    NewCountryCode = 1;
  } else if (CountryCode == "PK") {
    NewCountryCode = 92;
  } else {
    alert("Country code invalid");
  }

  localStorage.setItem("NewCountryCode", NewCountryCode);
  SearchValue = "clifton";
  //CountryCode = "PK";

  const handleInputChange = (input, e) => {
    fn_GetSearchLocation(input);
    //console.log(input);
  };

  async function fn_GetSearchLocation(input) {
    options = [];

    var LocationURL = `${presavedlocationfromourdb}?SearchValue=${input}&CountryCode=${CountryCode}`;
    const fetchSelectedLoation = await fetch(LocationURL);
    const LoadSelectedLoation = await fetchSelectedLoation.json();

    return fetch(`${LocationURL}`)
      .then((loc) => loc.json())
      .then((Response) => {
        var LocationResponse = JSON.parse(Response.Result.Response);
        var AllLoactionObject = JSON.parse(Response.Result.Data);
        if (AllLoactionObject != null) {
          const LocationArray = [];
          var LocationList = AllLoactionObject.Locations;
          // console.log("LocationList");
          // console.log(LocationList);

          if (LocationList != null) {
            LocationList.map((val) => {
              if (typeof val.Coordinates != "undefined") {
                lat = val.Coordinates.split(",")[0];
                lng = val.Coordinates.split(",")[1];
              }

              const single = {
                label: val.LocationsName,
                lat,
                lng,
                CountryCode: val.CountryCode,
                country: "",
                state: "",
                city: "",
              };
              options.push(single);
            });
            LocationArray.push(LocationList);
            count++;
            setSelectedLocation(count);
          }
        } else {
          // console.log("No record");
        }
      });
  }

  function loader() {
    setLocAnimation(true);

    setTimeout(() => {
      getLocation();
      setLocAnimation(false);
    }, 3000);
  }

  useEffect(() => {
    // var utc;
    // var currentTime = new Date();
    // var currentTimezone = currentTime.getTimezoneOffset();
    // currentTimezone = (currentTimezone / 60) * -1;
    // if (currentTimezone !== 0) {
    //   utc = currentTimezone > 0 ? " +" : " ";
    //   utc += currentTimezone;
    // }
    // if (utc > 0) {
    //   CountryCode = "PK";
    // } else {
    //   CountryCode = "CA";
    // }
    // localStorage.setItem("CountryCode", CountryCode);
    // // console.log(CountryCode);
    // if (CountryCode == "CA") {
    //   NewCountryCode = 1;
    // } else if (CountryCode == "PK") {
    //   NewCountryCode = 92;
    // } else {
    //   alert("Country code invalid");
    // }
    // localStorage.setItem("NewCountryCode", NewCountryCode);
  }, []);

  const [locAnimation, setLocAnimation] = useState(false);

  return (
    <>
      <div className="input-group">
        <Typeahead
          id="TypeInput"
          onChange={(test) => {
            setSelected(test);
          }}
          options={options}
          selected={selected}
          placeholder="Type your location"
          onInputChange={handleInputChange}
        />

        <div className="getLocationBox">
          {/* <button className="getLocationBtn" onClick={() => getLocation()}> */}

          {!locAnimation ? (
            <BiCurrentLocation
              googleMapURL={GoogleKey}
              onClick={() => loader()}
              className="getLocationButton"
            />
          ) : (
            <BounceLoader
              className="getLocationAnimation"
              css={bouncer}
              color={"#f26c2a"}
              size={27}
            />
          )}
        </div>
      </div>

      <div>
        <button
          // target="_self"
          onClick={() => fn_MoveMainPage()}
          //onClick={find}
          id="btnFindFood"
          type="button"
        >
          Search
        </button>
      </div>
    </>
  );
};

const ww = $(window).width() > 600 ? true : false;

const bouncer = css`
  position: absolute;
  right: 0.6em;
  top: 16px;
`;

// ReactDOM.render(<TAhead />, document.getElementById('root'));
