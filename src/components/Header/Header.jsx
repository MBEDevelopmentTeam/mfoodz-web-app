import React from "react";
import logo from "../../img/MLogo.png";
import { useState } from "react";
import { Cabinet } from "../Cabinet/Cabinet";
import SideBar from "./sidebar";
import ConsumerBasket from "../ContextBasket/ContextBasket";
import cart from "./cart.jpg";
import { openCartPanel } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";

export function Header(props) {
  const cartNumber = useSelector((state) => state.cartnumber);

  // const mp = '/main'

  // const ww = useSelector((state) => state.windowwidth);
  // const mp = useSelector((state) => state.mainpath);
  // console.log(ww)
  // console.log(mp)
  // const mp = useSelector((state) => state.windowwidth.mp);

  // let mobilewidth = true ? $(window).width() < 600 : false;
  // let mainpath = true ? window.location.pathname == "/main" : false;

  function onKillCateID() {
    // window.location.href='';
    localStorage.removeItem("Cate");
  }

  let headerColor = true ? window.location.pathname == "/" : false;

  const [headerColor1, setHeader1Color] = useState(true);

  window.onscroll = function() {
    scrollFunction();
  };

  function scrollFunction() {
    if (window.scrollY >= 35) {
      setHeader1Color(false);
    } else {
      setHeader1Color(true);
    }
  }

  return (
    <ConsumerBasket>
      {(context) => {
        return (
          <>
            <div
              style={
                headerColor
                  ? headerColor1
                    ? { backgroundColor: "transparent", boxShadow: "none" }
                    : null
                  : null
              }
              className="newheader00"
            >
              {window.location.pathname !== "/" ? (
                <SideBar
                  pageWrapId={"page-wrap"}
                  outerContainerId={"header__fixed"}
                />
              ) : null}

              <div className="bmenu00">
                <span className="bm-burger-bars"></span>
                <span className="bm-burger-bars"></span>
                <span className="bm-burger-bars"></span>
              </div>

              <div className="mlogo00">
                <a href="/" className="ggm" onClick={() => onKillCateID()}>
                  <img width="200px" src={logo} alt="logo" />
                </a>
              </div>

              <div className="search00">
                <Cabinet context={context} />
              </div>

              <div className="cart00">
                {cartNumber > 0 && window.location.pathname == "/main" ? (
                  <div style={{ marginRight: "40px" }}>
                    <CartIcon />
                  </div>
                ) : null}

                {window.location.pathname == "/" ? <LoginButton /> : null}
              </div>
            </div>
          </>
        );
      }}
    </ConsumerBasket>
  );
}

export const CartIcon = () => {
  const cartNumber = useSelector((state) => state.cartnumber);
  // console.log(cartNumber)
  const dispatch = useDispatch();

  return (
    <div className="cartIcon">
      <a onClick={() => dispatch(openCartPanel("300px"))}>
        <img src={cart} style={{ width: "40px", height: "40px" }}></img>
      </a>

      <p
        style={{
          color: "#f26c2a",
          fontSize: "20px",
          paddingTop: "6px",
          paddingLeft: "10px",
        }}
      >
        {cartNumber}
      </p>
    </div>
  );
};

export function LoginButton() {
  const findLogin = () => {
    window.location.href = "/login";
  };

  var masterCode = localStorage.getItem("mastercode");
  var cname = localStorage.getItem("custname");

  if (cname == null || cname == 0) {
    cname = "User";
  }

  function onKillCateID() {
    localStorage.removeItem("PhoneNumber");
    localStorage.removeItem("CountryCode");
    localStorage.removeItem("otp");
    localStorage.removeItem("UserId");
    localStorage.removeItem("mastercode");
    localStorage.removeItem("UserStatus");
    localStorage.removeItem("LoginStatus");
    localStorage.removeItem("OTPStatus");
  }

  return (
    <div className="btn202">
      {localStorage.getItem("UserStatus") !== "true" ? (
        <button onClick={findLogin} id="btnLogin" className="btnLogin">
          Login/Sign Up
        </button>
      ) : (
        <div className="btnDropdown">
          <button id="btnLogin" className="btnLogin">
            {"Hello, " + cname}
          </button>

          <a
            id="btnLogout"
            className="btnLogout"
            onClick={() => onKillCateID()}
            href="/"
          >
            LogOut
          </a>
        </div>
      )}
    </div>
  );
}
