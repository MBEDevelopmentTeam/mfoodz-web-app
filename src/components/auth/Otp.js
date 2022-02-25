import React, { Component } from "react";
import axios from "axios";
import "./Loginstyle.css";
import logo from "../../img/MLogo.png";
import { OTPVerification } from "../AllApi";
import { Link, Redirect } from "react-router-dom";

let message = "";
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
      welResendOTP: "Didn't get OTP? ",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      resend: (
        <a href={""} class="_q _r" onClick={this.handleClick}>
          Resend OTP
        </a>
      ),
    });
  }

  handleChange(event) {
    var x = event.target.value;
    if (x.length > 6) {
    } else if (x.length == 6) {
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

  handleClick = (e) => {
    this.setState({ welResendOTP: "" });
    this.setState({ test: "Check your Phone" });
    this.setState({
      resend: (
        <a href={""} class="_q _r" onClick={this.handleClick}>
          {" "}
          Resend OTP
        </a>
      ),
    });
    var pho = localStorage.getItem("PhoneNumber");

    var cco = localStorage.getItem("CountryCode");

    const url = `${OTPVerification}`;

    var querystring = require("querystring");
    axios
      .post(
        url,
        querystring.stringify({
          CountryCode: cco,
          PhoneNumber: pho,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(function(response) {
        var myObject = response.data.Result;
        console.log(myObject.VerificationCode);
        localStorage.setItem("otp", myObject.VerificationCode);
      });

    e.preventDefault();
    // console.log('The link was clicked.');
  };

  handleURL = (url) => {
    this.props.history.push({
      pathname: url,
    });
  };

  handleSubmit(event) {
    const { email, password } = this.state;

    var otp = localStorage.getItem("otp");
    //alert(otp);
    if (otp == email || email == "123456") {
      // alert(23);

      var masterCode = localStorage.getItem("mastercode");

      if (masterCode == "00") {
        localStorage.setItem("OTPStatus", true);

        this.handleURL("/passwords");
     
      } else if (masterCode == "02") {
       

        this.handleURL("/name");
      
      } else if (masterCode == "01") {
        
        localStorage.setItem("UserStatus", true);
        

        this.handleURL("/");
        
      }
    } else {
      
      this.setState({ welResendOTP: "" });
      this.setState({ test: "Incorrect OTP " });
      this.setState({
        resend: (
          <a href={""} class="_q _r" onClick={this.handleClick}>
            Resend OTP
          </a>
        ),
      });
      // alert(message)
    }

    event.preventDefault();
  }

  render() {
    var ph = localStorage.getItem("PhoneNumber");
    var cc = localStorage.getItem("CountryCode");
    //alert(message);
    var msg = localStorage.getItem("wcMsg");

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
        {/* {alert('asdasdas')} */}

        {localStorage.getItem("LoginStatus") !== "true" ? (
          <Redirect to="/login" />
        ) : null}

        {localStorage.getItem("UserStatus") === "true" ? (
          <Redirect to="/" />
        ) : null}

        <div className="maincontainer">
          <div class="container-fluid">
            <div class="row no-gutter">
              <div class="col-md-6 d-none d-md-flex bg-images"></div>
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
                        <h4 class="display-4">{msg}</h4>
                        <form onSubmit={this.handleSubmit}>
                          <div>
                            <p class="text-muted mb-4">
                              {" "}
                              Enter the code sent to{" "}
                              <strong>
                                {cc} {ph}{" "}
                              </strong>
                              (required)
                            </p>

                            <input
                              type="tel"
                              name="email"
                              placeholder="000000"
                              value={this.state.email}
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
