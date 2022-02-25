import React from "react";
import "./WelcomePage.css";
import { Header } from "../Header/Header";
import HeaderNew from "./Header/Header";
import CategoryCollections from "./CategoryCollections/CategoryCollections";
import BulletPoints from "./BulletPoints/BulletPoints";
import MobileServices from "./MobileServices/MobileServices";
import LinksPanel from "./LinksPanel/LinksPanel";
import Footer from "./Footer/Footer";
import { connect } from "react-redux";
import CurrentOrdersPanel from "./CurrentOrdersPanel/CurrentOrdersPanel";

class WelcomePage extends React.Component {
  constructor() {
    super();
  }

  // componentDidMount() {
  //   alert("this check is runing from welcome page (redirecting to '/' page)");
  //   alert(localStorage.getItem("UserStatus"));
  // }

  render() {
    // if (localStorage.getItem("UserStatus") === "true") {
    // }

    if (localStorage.getItem("UserStatus") !== "true") {
    } else {
      localStorage.removeItem("LoginStatus");
      localStorage.removeItem("OTPStatus");
    }
    // (function() {
    //
    // })();

    let cos = this.props.store.currentOrderStatus;

    // localStorage.setItem("UserStatus", true);

    // setTimeout(() => {
    //   if (localStorage.getItem("UserStatus") === "true") {
    //     console.log(typeof localStorage.getItem("UserStatus"));
    //     console.log("type of userstatus");
    //     console.log("userStatus is true");
    //   } else {
    //     console.log("userStatus is false");
    //   }
    // }, 1000);
    return (
      <>
        <Header />
        <HeaderNew />

        {cos ? <CurrentOrdersPanel /> : null}

        <CategoryCollections />
        <BulletPoints />
        <MobileServices />
        <LinksPanel />
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: state,
  };
};

export default connect(
  mapStateToProps,
  null
)(WelcomePage);
