import React from "react";
import { Link } from "react-router-dom";
import "./RestaurantCard.css";
import test from "./heart.png";
import background from "../../img/rest-img.png";
import defaultcard from "./defaultCard.jpg";

let ShopID = null;
export function RestaurantCard(props) {
  function onPageClick() {
    // alert(props.uuid + 'Hello');
    return console.log(props.Id);
  }

  function onClickBox(id) {
    // alert(id)
    // alert(props.Id)
    if (props.Id == id) {
      //alert("Done")
    } else {
      //alert("Fail")
    }
  }

  function onBoxClick() {
    let userdID = localStorage.getItem("UserId");
    //alert(userdID);
    let resURL = "/ProductsPage/";
    ShopID = props.Id;
    let fullURL = resURL + ShopID;

    if (userdID == null) {
      window.location.href = fullURL;
      // window.location.href = "/login";
      //window.open('/login','_blank');
    } else {
      window.location.href = "/login";
    }
  }

  var bg = props.ShopImage;
  // if (bg == null) {
  //   // bg = 'https://register.m-rides.com/images/test-foodz.jpg';
  //   bg = defaultcard;
  // }
  const unreadMessages = props.Offer;

  // alert(test.length);
  return (
    <Link
      onClick={() => onClickBox(props.Id)}
      to={`ProductsPage?shopId=${props.Id}&StoreName=${props.name}`}
    >
      <div
        style={{ cursor: "pointer" }}
        className="restaurant-card"

        //onClick={() => window.open(`/ProductsPage?shopId=${props.Id}&StoreName=${props.name}`, '_self')}
      >
        <div className="restaurant-card__photo">
          {/* <div
            className="restaurant-card__photo"
            style={{ background: "url(" + bg + ")" }}
          > */}
          {bg != null ? (
            <img className="restaurant-photo" src={bg} />
          ) : (
            <img
              style={{ border: "2px solid #A2A1A6" }}
              className="restaurant-photo"
              src={defaultcard}
            />
          )}

          <div class="ag bs bdd dg ff">
            <div class="af">
              <span class="badge-info" data-testid="badge-info">
                {props.deliveryTime} MIN
              </span>
            </div>
          </div>
          {/* </div> */}
        </div>

        <div style={{ fontFamily: "Poppins-Regular" }} className="hy bc f1">
          <div className="restaurant-card__preview f">
            <p className="restaurant-card__name f">{props.name}</p>
            <p className="restaurant-card__price f">
              <ul class="tg" data-testid="extra-info">
                <span class="" data-cy="delivery-fee-active">
                  <span>
                    <strong>
                      {props.Currency} {props.price}{" "}
                    </strong>
                    Delivery fee
                  </span>
                </span>
              </ul>
            </p>
            {/* <p className="restaurant-card__delivery-time f">{props.deliveryTime}</p> */}
          </div>
          {/* <div class="i2 cb cc eb ea i3 cd g8 bc be g4">4.4</div> */}

          <span class="ratings-component">
            <span class="stars">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11">
                <path d="M9 7.02L9.7 11 6 9.12 2.3 11 3 7.02 0 4.2l4.14-.58L6 0l1.86 3.62L12 4.2z"></path>
              </svg>
            </span>
            <span class="rating">
              <b>{props.Rating} 3.9</b>/5
            </span>
          </span>
        </div>

        {/* </Link> */}
      </div>
    </Link>
  );
}
