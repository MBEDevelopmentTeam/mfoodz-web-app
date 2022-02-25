import React, { Component } from "react";
import axios from "axios";
import "./Loginstyle.css";
import logo from "../../img/MLogo.png";
import { Alert } from "@material-ui/lab";
import { CustomerSignupApi } from "../AllApi";
import { Link, Redirect } from "react-router-dom";

export default class Otp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: "",
      test: "",
      resend: "",
      black: true,
      col: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ black: !this.state.black });

    this.setState({
      col:
        "ddM  _dpp _ap _c _b _a5 _k _l _df _cl _dm _ar _dg _cc _p _r _dh _di _cw _dj _ce _dk _cf _bg _c7 _c7 _c8 _dq _dr",
    });

    // alert('if')
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  changeColor() {
    this.setState({ black: !this.state.black });
  }
  handleURL = (url) => {
    this.props.history.push({
      pathname: url,
    });
  };

  handleSubmit(event) {
    const { FirstName, LastName } = this.state;

    var tt = FirstName;
    localStorage.setItem("Name", tt);
    localStorage.setItem("FirstName", FirstName);
    localStorage.setItem("LastName", LastName);

    var masterCode = localStorage.getItem("mastercode");

    if (masterCode == "02") {
      var pho = localStorage.getItem("PhoneNumber");

      var cco = localStorage.getItem("CountryCode");
      var fname = localStorage.getItem("FirstName");
      var lname = localStorage.getItem("LastName");
      localStorage.setItem("custname", fname);
      const urls = `${CustomerSignupApi}`;
      var querystring = require("querystring");
      axios
        .post(
          urls,
          querystring.stringify({
            PhoneNumber: pho,
            CountryCode: cco,
            Email: "",
            FirstName: fname,
            LastName: lname,
            Password: "",
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then(function(response) {
          // console.log(response);

          var myObject = response.data.Result;
          //alert(myObject.Code);
          localStorage.setItem("UserId", myObject.UserId);
          if (myObject.Code == "00" || myObject.Code == "08") {
            localStorage.setItem("UserStatus", true);

            window.location.href = "/";
          }
        });
    } else {
      alert("Oop! internet not working");
      //window.location.href = "/main";
    }
    event.preventDefault();
  }

  render() {
    //alert(message);
    //var gg = window.topicText;

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
        {localStorage.getItem("LoginStatus") !== "true" ? (
          <Redirect to="/login" />
        ) : // (window.location.href = "/login")
        null}

        {localStorage.getItem("UserStatus") === "true" ? (
          <Redirect to="/" />
        ) : null}

        <div className="maincontainer">
          <div class="container-fluid">
            <div class="row no-gutter">
              <div class="col-md-6 d-none d-md-flex bg-image-Name"></div>
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
                        <h4 class="display-4">Let's get started</h4>
                        <form onSubmit={this.handleSubmit}>
                          <div>
                            <p class="text-muted mb-4">Full Name (required)</p>
                            <label
                              id="input-label-mobile"
                              class="_a _d _k _l _m _n"
                              for="mobile"
                            >
                              First Name
                            </label>
                            <input
                              type="text"
                              name="FirstName"
                              placeholder="First name"
                              value={this.state.FirstName}
                              onChange={this.handleChange}
                              onClick={this.changeColor.bind(this)}
                              required
                              class="_c7 _c7 _c8 _a _b _d _k _l _c9 _ap _ca _cb _cc _cd _ce _cf _cg _ch _ci _cj _ck _cl _dm _ar _cm"
                              style={{ borderRadius: "50px" }}
                            />
                            <label
                              id="input-label-mobile"
                              class="_a _d _k _l _m _n"
                              for="mobile"
                            >
                              Last Name
                            </label>
                            <input
                              type="text"
                              name="LastName"
                              placeholder="Last name"
                              value={this.state.LastName}
                              onChange={this.handleChange}
                              required
                              class="_c7 _c7 _c8 _a _b _d _k _l _c9 _ap _ca _cb _cc _cd _ce _cf _cg _ch _ci _cj _ck _cl _dm _ar _cm"
                              style={{ borderRadius: "50px" }}
                            />

                            <button
                              id="btnOtpNext"
                              class="className={btn_class} btn btn-primary btn-block mb-2 rounded-pill shadow-sm"
                              type="submit"
                            >
                              Next
                            </button>
                          </div>
                        </form>

                        <div class="_a _d _k _l _o _p">
                          {this.state.welResendOTP}
                          {this.state.test}
                          {this.state.resend}
                        </div>
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
