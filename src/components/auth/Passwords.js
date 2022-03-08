import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import "./Loginstyle.css";
import logo from "../../img/MLogo.png";
import { Alert } from "@material-ui/lab";
import { FPassApi, PwdVerificationOfCustomer } from "../AllApi";
import { useHistory, withRouter } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";

export default class Passwords extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      loginErrors: "",
      test: "",
      resend: "",
      black: true,
      test: "",
      ref: "",
      col: "",
      Foodmsg: "",
      showSuccessAlert: false,
      showFailAlert: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount() {
  //   let cc = localStorage.getItem("CountryCode");
  //   alert(cc);
  // }

  handlePasswordURL = () => {
    localStorage.setItem("UserStatus", true);
    this.handleURL("/");
    // window.location.href = "/";
  };

  handleChange(event) {
    var x = event.target.value;
    if (x.length > 10) {
    } else if (x.length == 10) {
      this.setState({ black: !this.state.black });

      this.setState({
        col:
          "ddM  _dpp _ap _c _b _a5 _k _l _df _cl _dm _ar _dg _cc _p _r _dh _di _cw _dj _ce _dk _cf _bg _c7 _c7 _c8 _dq _dr",
      });

      // alert('if')
      this.setState({
        [event.target.name]: event.target.value,
      });
    } else {
      //alert(101);
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  }
  changeColor() {
    //this.setState({black: !this.state.black})
  }

  handleClick = (e) => {
    (async () => {
      var cc = localStorage.getItem("CountryCode");
      var phone = localStorage.getItem("PhoneNumber");

      const fetchedCategories = await fetch(
        `${FPassApi}?custPhoneNumber=${phone}`
      );
      const loadedResult = await fetchedCategories.json();
      // console.log(loadedResult.Result);
      var myObject = loadedResult.Result.Code;
      this.setState({ Foodmsg: myObject.Message });

      //console.log(myObject.CustPassword);
      if (loadedResult.Result.Code == "00") {
        var myObject = loadedResult.Result.Code;
      } else {
        this.setState({
          showFailAlert: true,
        });
      }
    })();

    e.preventDefault();
  };

  handleSubmit(event) {
    this.setState({ showSuccessAlert: false, showFailAlert: false });

    const { email, password } = this.state;

    var pho = localStorage.getItem("PhoneNumber");
    var cco = localStorage.getItem("CountryCode");
    var mail = localStorage.getItem("email");
    var fname = localStorage.getItem("FirstName");
    var lname = localStorage.getItem("LastName");
    var id = localStorage.getItem("UserId");

    const urlss = `${PwdVerificationOfCustomer}`;
    //const newUrl=proxyurl + url;

    var querystrings = require("querystring");
    axios
      .post(
        urlss,
        querystrings.stringify({
          UserId: id,
          PhoneNumber: pho,
          //Email:mail,
          Password: password,
          //LastName:lname,
          //Password:password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        //console.log(response);

        var myObject = response.data.Result;

        this.setState({ FoodPasswordmsg: myObject.Message });

        if (myObject.Code == "00") {
          var se = myObject.FirstName;
          localStorage.setItem("Name", se);
          localStorage.setItem("UserStatus", true);
          this.handleURL("/");
        } else if (myObject.Code == "01" || myObject.Code == "55") {
          this.setState({
            showFailAlert: true,
          });
          this.setState({ FoodPasswordmsg: myObject.Message });
        } else if (myObject.Code == "00") {
          localStorage.setItem("UserStatus", true);

          this.handleURL("/");
        }
      })
      .catch((err) => {
        this.setState({ Foodmsg: "Internet Error!" });
        this.setState({
          showFailAlert: true,
        });
      });

    event.preventDefault();
  }

  handleURL = (url) => {
    this.props.history.push({
      pathname: url,
    });
  };

  render() {
    let btn_color = this.state.col;
    let btn_class;
    if (btn_color == "") {
      btn_class = this.state.black
        ? "_do _dp _ap _c _b _a5 _k _l _df _cl _dm _ar _dg _cc _p _r _dh _di _cw _dj _ce _dk _cf _bg _c7 _c7 _c8 _dq _dr"
        : "ddM  _dpp _ap _c _b _a5 _k _l _df _cl _dm _ar _dg _cc _p _r _dh _di _cw _dj _ce _dk _cf _bg _c7 _c7 _c8 _dq _dr";
    } else {
      btn_class = this.state.col;
    }

    return (
      <>
        {localStorage.getItem("OTPStatus") !== "true" ? (
          <Redirect to="/otp" />
        ) : null}

        {localStorage.getItem("UserStatus") === "true" ? (
          <Redirect to="/" />
        ) : null}

        <div className="maincontainer">
          <div class="container-fluid">
            <div class="row no-gutter">
              <div class="col-md-6 d-none d-md-flex bg-password"></div>
              <div class="col-md-6" id="logincontainer">
                <div class="login d-flex align-items-center py-5">
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-10 col-xl-7 mx-auto">
                        <img
                          alt="M-Foods"
                          role="img"
                          src={logo}
                          style={{
                            position: "absolute",
                            left: "40%",
                            top: "-20px",
                            transform: "translate(-50%, -50%)",
                            height: "85px",
                            width: "320px",
                          }}
                        />
                        <h4 class="display-4">Welcome Back</h4>
                        <p class="text-muted mb-4">
                          Enter a password (required)
                        </p>
                        <form onSubmit={this.handleSubmit}>
                          <input
                            type="password"
                            name="password"
                            onClick={this.changeColor.bind(this)}
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                            class="_c7 _c7 _c8 _a _b _d _k _l _c9 _ap _ca _cb _cc _cd _ce _cf _cg _ch _ci _cj _ck _cl _dm _ar _cm"
                          />
                          <label
                            id="input-label-mobile"
                            class="_a ddg _k _l _m _n"
                            for="mobile"
                          >
                            {" "}
                            Minimum 10 characters{" "}
                          </label>

                          <button
                            id="btnPasswordNext"
                            className="{btn_class} btn btn-primary btn-block mb-2 rounded-pill shadow-sm"
                            type="submit"
                          >
                            Next
                          </button>
                          {this.state.showSuccessAlert && (
                            <Alert variant="filled" severity="success">
                              {this.state.FoodPasswordmsg}
                            </Alert>
                          )}
                          {this.state.showFailAlert && (
                            <Alert variant="filled" severity="error">
                              {this.state.FoodPasswordmsg}
                            </Alert>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
