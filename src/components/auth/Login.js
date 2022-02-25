import React, { Component } from "react";
import axios from "axios";
import "./Loginstyle.css";
import logo from "../../img/MLogo.png";
import { Loader } from "../Loader/Loader";
import { Alert } from "@material-ui/lab";
import { DataNotFound } from "../DataNotFound/DataNotFound";
import { Link, Redirect } from "react-router-dom";
import { GetCountries, OTPVerification } from "../AllApi";

const encodeFormData = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: "",
      countryCode: "+92",
      msg: "",
      black: true,
      color: true,
      col: "",
      showSuccessAlert: false,
      showFailAlert: false,
      combo: "",
      countriess: [],

      // custname:"",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleURL = (url) => {
    this.props.history.push({
      pathname: url,
    });
  };

  async componentDidMount() {
    fetch(`${GetCountries}`)
      .then((response) => response.json())
      .then((data) =>
        this.setState(() => {
          var testNew = JSON.parse(data.Result.Data);
          // console.log("testNew");
          // console.log(testNew);
          if (testNew != null) {
            this.setState({
              countriess: testNew.Countries,
            });
          } else {
            // alert('data not found');

            this.handleURL("/dataNotFound");
            // window.location.href = "/dataNotFound";
          }

          // return { testNew};
        })
      );
  }

  handleChange(event) {
    var x = event.target.value;

    if (x.length > 10) {
    } else if (x.length == 10) {
      this.setState({ black: !this.state.black });
      // this.setState({color: !this.state.color})

      this.setState({
        col:
          "ddM  _dpp _ap _c _b _a5 _k _l _df _cl _dm _ar _dg _cc _p _r _dh _di _cw _dj _ce _dk _cf _bg _c7 _c7 _c8 _dq _dr",
      });

      //alert('if')
      this.setState({
        [event.target.name]: event.target.value,
      });
    } else {
      //alert(101);
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
    // alert(event.target.name);
  }

  handleSubmit(event) {
    setTimeout(() => {
      this.setState({ showSuccessAlert: false, showFailAlert: false });
    }, 1000);

    const { email, countryCode } = this.state;

    if (email.length == 10) {
      const url = `${OTPVerification}`; // site that doesn’t send Access-Control-*
      var querystring = require("querystring");
      axios
        .post(
          url,
          querystring.stringify({
            PhoneNumber: email,
            CountryCode: countryCode,
            AuthenticationId: "",
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => {
          // console.log("response from login page");
          // console.log(response);

          var myObject = response.data.Result;
          localStorage.setItem("mastercode", myObject.Code);

          if (myObject.Code == "01") {
            console.log("loginPage01");
            localStorage.setItem("PhoneNumber", email);
            localStorage.setItem("CountryCode", countryCode);
            localStorage.setItem("otp", myObject.VerificationCode);
            localStorage.setItem("UserId", myObject.UserId);
            localStorage.setItem(
              "custname",
              myObject.FirstName + " " + myObject.LastName
            );

            localStorage.setItem("wcMsg", "Welcome Back");

            // window.location.href = "/otp";
            localStorage.setItem("LoginStatus", true);
            // console.log(localStorage.getItem("LoginStatus"));
            this.handleURL("/otp");
            // window.location.href = "/otp";

            // <Redirect to="/" />
          } else if (myObject.Code == "55" || myObject.Code == "22") {
            // console.log("loginPage02");
            var test = myObject.Message;
            this.setState({ msg: test });
            this.setState({
              showFailAlert: true,
            });
          } else if (myObject.Code == "00") {
            //this condition is called when an existing user is loging
            // console.log("loginPage03");
            localStorage.setItem("PhoneNumber", email);
            localStorage.setItem("CountryCode", countryCode);
            localStorage.setItem("otp", myObject.VerificationCode);
            localStorage.setItem("UserId", myObject.UserId);
            localStorage.setItem(
              "custname",
              myObject.FirstName + " " + myObject.LastName
            );
            // window.location.href = "/otp";
            localStorage.setItem("LoginStatus", true);
            this.handleURL("/otp");
            // window.location.href = "/otp";
          } else if (myObject.Code == "02") {
            //this condition is called when a new user is sigup
            console.log("loginPage04");
            localStorage.setItem("PhoneNumber", email);
            localStorage.setItem("CountryCode", countryCode);
            localStorage.setItem("otp", myObject.VerificationCode);
            localStorage.setItem("UserId", myObject.UserId);
            localStorage.setItem(
              "custname",
              myObject.FirstName + " " + myObject.LastName
            );
            // window.location.href = "/otp";
            localStorage.setItem("LoginStatus", true);
            localStorage.setItem("wcMsg", "Let's get started");
            this.handleURL("/otp");
            // window.location.href = "/otp";
            //this.setState({msg:myObject.Message});
          }
        })
        .catch((err) => {
          this.setState({ msg: "Connection Error" });
          this.setState({
            showFailAlert: true,
          });
          setTimeout(() => {
            this.setState({ showSuccessAlert: false, showFailAlert: false });
          }, 2000);
        });
    } else {
      this.setState({ msg: "Invalid Phone Number" });
      this.setState({
        showFailAlert: true,
      });
    }

    event.preventDefault();
  }

  render() {
    const { countriess } = this.state;
    //  alert(btn_color.length);
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
        {localStorage.getItem("UserStatus") === "true" ? (
          <Redirect to="/" />
        ) : null}

        <div className="maincontainer">
          <div class="container-fluid">
            <div class="row no-gutter">
              <div class="col-md-6 d-none d-md-flex bg-image"></div>
              <div class="col-md-6" id="logincontainer">
                <div class="login d-flex align-items-center py-5">
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-10 col-xl-7 mx-auto">
                        <a href="/" target="_blank">
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
                        </a>
                        <h4 class="display-4">Let's get started</h4>
                        <p class="text-muted mb-4">
                          Enter your phone number (required)
                        </p>
                        <form onSubmit={this.handleSubmit}>
                          <div style={{ height: "100%" }} class="input-group">
                            <div class="input-group-prepend">
                              <select
                                aria-hidden="true"
                                onChange={this.handleChange}
                                value={this.state.countryCode}
                                name="countryCode"
                                className="custom-select"
                                style={{ height: "35px", fontSize: "16px" }}
                              >
                                {this.state.countriess != null ? (
                                  this.state.countriess.map((country) => (
                                    <option
                                      key={country.Id}
                                      value={country.CCode}
                                    >
                                      {country.CCode}&nbsp;{country.CountryName}
                                    </option>
                                  ))
                                ) : (
                                  <div>
                                    <h2>Data not found</h2>
                                  </div>
                                )}
                              </select>
                            </div>
                            <input
                              id="inputNumber"
                              type="number"
                              name="email"
                              //onClick={this.changeColor.bind(this)}
                              value={this.state.email}
                              onChange={this.handleChange}
                              placeholder="Enter Phone Number"
                              required=""
                              class="_c7 _c7 _c8 _a _b _d _k _l _c9 _ap _ca _cb _cc _cd _ce _cf _cg _ch _ci _cj _ck _cl _dm _ar _cm"
                            />
                          </div>

                          <div class="custom-control custom-checkbox mb-3"></div>
                          <button
                            type="submit"
                            id="btnNext"
                            class="className={btn_class} btn btn-primary btn-block mb-2 rounded-pill shadow-sm"
                          >
                            Next
                          </button>
                        </form>
                        <div className="_a _d _k _l _o _p" id="Already">
                          Already use M-Ride?
                          <a href="http://admin.mride.pk/" className="_q _r">
                            Sign in
                          </a>
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
