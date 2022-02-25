import React, {Suspense, lazy } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
// import { ProviderBasket } from "./components/ContextBasket/ContextBasket";

// import { RestaurantPage } from "./components/RestaurantPage/RestaurantPage";

import WelcomePage from "./components/WelcomePage/WelcomePage";

import MainPage from "./components/MainPage/MainPage";


import DataNotFound from "./components/DataNotFound/DataNotFound";

import Login from "./components/auth/Login";
import Otp from "./components/auth/Otp";
import Name from "./components/auth/Name";
import Email from "./components/auth/Email";
import Profile from "./components/ProfilePages/Profile";
import Password from "./components/auth/Passwords";

import ProductsPage from "./components/ProductsPage/ProductsPage";
import Deliverypanel from "./components/Deliverypanel/Deliverypanel";
import OrderTracking from "./components/OrderTracking/OrderTracking";
import OrderHistory from "./components/OrderHistory/OrderHistory";


import "./components/Website/webstyle.css";
import "./components/MenuType/MenuType.css";
import "font-awesome/css/font-awesome.min.css";
import ReactNotifications from "react-notifications-component";

import { connect } from "react-redux";
import { connectToSocketForChatting } from "./components/chat-client";

let CusId = localStorage.getItem("UserId");

console.log(CusId);
console.log("CusId");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      uuid: [],
      isModalOpen: false,
    };
  }

  // basket = [];
  // renderRestaurantPage = (props) => {
  //   return <RestaurantPage match={props.match} />;
  // };

  toggleModal() {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  }
  render() {
    connectToSocketForChatting(CusId, "atif_hyder");

    return (
      <>
        <ReactNotifications />
        <input id="latLngHidden" style={{ display: "none" }} value="" />
        {/* <ProviderBasket value={this.basket}> */}
        <Router>
          {/* <ScrollToTop> */}
          <Route path="/" exact component={WelcomePage} />

          {/* <Suspense> */}
            <Route path="/main" exact component={MainPage} />
            <Route path="/dataNotFound" exact component={DataNotFound} />
            <Route path="/login" exact component={Login} />
            <Route path="/otp" exact component={Otp} />
            <Route path="/name" exact component={Name} />
            <Route path="/email" exact component={Email} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/passwords" exact component={Password} />
            <Route path="/ProductsPage" exact component={ProductsPage} />
            <Route path="/Deliverypanel/" exact component={Deliverypanel} />

            <Route
              path="/OrderTracking/:id/:shoplat/:shoplong/:droplat/:droplong/"
              exact
              component={OrderTracking}
            />
            <Route path="/OrderHistory" exact component={OrderHistory} />
          {/* </Suspense> */}
          {/* </ScrollToTop> */}
        </Router>
        {/* </ProviderBasket> */}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    store: state,
  };
}
export default connect(
  mapStateToProps,
  null
)(App);
