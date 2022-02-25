import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import "./profilestyles.css";
import logo from "../../img/MLogo.png";
import { Alert } from "@material-ui/lab";
//import { withAlert } from 'react-alert'
//import ProfileHeader from "./ProfileHeader"
import { Link, Redirect } from "react-router-dom";
import { GetProfile, EditCustomerProfile } from "../AllApi";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: "",
      fname: "",
      lname: "",
      password: "",
      placehol: "",
      black: true,
      email: "",
      cc: "",
      ref: "",
      col: "",
      data: [],
      showSuccessAlert: false,
      showFailAlert: false,
      msg: "",
      //FoodPassword :"",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    //   alert(23);
    var ids = localStorage.getItem("UserId");

    if (ids > 0) {
      fetch(`${GetProfile}${ids}`)
        .then((response) => response.json())
        .then((data) =>
          this.setState(() => {
            var testNew = data.Result;
            var mm = testNew.FirstName;
            localStorage.setItem("Name", mm);
            //  alert(testNew.PwdCheck );
            if (testNew.PwdCheck == "True") {
              this.setState({ placehol: "**********" });
            } else {
              this.setState({ placehol: "" });
            }

            this.setState({
              phone: testNew.PhoneNumber,
              fname: testNew.FirstName,
              lname: testNew.LastName,
              email: testNew.Email,
            });

            // return { testNew};
          })
        )
        .catch((err) => {
          // console.log(err);
          //Change the state here which will show your Alert
          this.setState({
            showFailAlert: true,
          });
        });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  changeColor() {
    //this.setState({black: !this.state.black})
  }

  // handleClick = (e) =>{
  //   //alert(23);
  //   //const [CategoryData, setCategoryData] = useState([]);

  //   (async () => {

  //     var phone = localStorage.getItem("PhoneNumber");
  //     //alert(phone);
  //     const fetchedCategories = await fetch(`http://172.16.100.199:8083/api/MRide/ForgotPwdForCustomer?custPhoneNumber=${phone}`);
  //     const loadedResult =  await fetchedCategories.json();
  //     console.log(loadedResult.Result);
  //     var myObject = loadedResult.Result.Code;
  //    // console.log(myObject);
  //     if(loadedResult.Result.Code == "00"){
  //       var myObject = loadedResult.Result.Code;

  //     }
  //     else{
  //      // alert("Oops! something went wrong")

  //       this.setState({

  //         msg:"Oops! something went wrong"
  //     })
  //     }

  //   })();

  //   e.preventDefault();
  // }

  handleSubmit(event) {
    setTimeout(() => {
      this.setState({ showSuccessAlert: false, showFailAlert: false });
    }, 2000);
    const { email, password, fname, lname, phone } = this.state;
    var se = localStorage.setItem("custname", fname);
    // var gg = localStorage.getItem("Name");
    // alert(gg);
    var id = localStorage.getItem("UserId");

    // alert(id);
    //  var email = ;

    const urlss = `${EditCustomerProfile}`;
    //const newUrl=proxyurl + url;
    //alert(password);
    var querystrings = require("querystring");
    axios
      .post(
        urlss,
        querystrings.stringify({
          CustId: id,
          Email: email,
          FirstName: fname,
          Password: password,
          LastName: lname,
          PhoneNumber: phone,
          State: "",
          Country: "Pakistan",
          PostalCode: "",
          City: "",

          //Password:password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )

      .then((json) => {
        // console.log(json);

        var test = json.data.Result.Message;

        window.location.reload("./GenralHeader");
        // var redirect = (window.location.href = "/");
        //alert(test);
        //alert(json.data.Result.Code);

        this.setState({
          msg: test,
        });
        this.setState({
          showSuccessAlert: true,
        });
      })
      .catch((err) => {
        // console.log(err);
        //Change the state here which will show your Alert
        this.setState({
          showFailAlert: true,
        });
      });

    event.preventDefault();
  }
  handleMouseOver(id) {
    this.setState({
      enabled: id,
    });
  }
  render() {
    let inputs = [];
    for (let i = 0; i <= 20; i++) {
      inputs.push({ id: i, placeholder: "Input " + i });
    }
    let btn_color = this.state.col;
    let btn_class;
    if (btn_color == "") {
      btn_class = this.state.black
        ? "_do _dp _ap _c _b _a5 _k _l _df _cl _dm _ar _dg _cc _p _r _dh _di _cw _dj _ce _dk _cf _bg _c7 _c7 _c8 _dq _dr"
        : "ddM  _dpp _ap _c _b _a5 _k _l _df _cl _dm _ar _dg _cc _p _r _dh _di _cw _dj _ce _dk _cf _bg _c7 _c7 _c8 _dq _dr";
    } else {
      btn_class = this.state.col;
    }
    //alert(message);
    //var gg = window.topicText;

    return (
      <>
        {localStorage.getItem("UserStatus") !== "true" ? (
          <Redirect to="/login" />
        ) : null}

        <div className="maincontainer">
          <div class="container-fluid">
            <div class="row no-gutter">
              <div class="col-md-6 d-none d-md-flex bg-image-profile"></div>
              <div class="col-md-6" id="logincontainer">
                <div class="login d-flex align-items-center py-5">
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-10 col-xl-7 mx-auto">
                        {/* <img alt="M-Foods" role="img" src={logo} 
                style={{
                    position: 'absolute',
                    left: '18%',
                    //top : '-5px',
                    marginTop: '15px',
                    transform: 'translate(-50%, -50%)',
                    height:'40px',
                    width:'150px'
                }} /> */}
                        <br></br>
                        <h4 class="display-4">
                          Welcome <strong>{this.state.fname}</strong>
                        </h4>
                        <form onSubmit={this.handleSubmit}>
                          <div>
                            <label
                              id="input-label-mobile"
                              class="_a _d _k _l _m _n"
                              for="mobile"
                            >
                              Phone Number{" "}
                            </label>
                            <input
                              type="test"
                              name="phNumber"
                              disabled
                              //onClick={this.changeColor.bind(this)}
                              value={this.state.phone}
                              onChange={this.handleChange}
                              required
                              class="form-control"
                              style={{ borderRadius: "50px" }}
                            />
                            <br />
                            <label
                              id="input-label-mobile"
                              class="_a _d _k _l _m _n"
                              for="mobile"
                            >
                              {" "}
                              First Name
                            </label>
                            <input
                              type="text"
                              name="fname"
                              //onClick={this.changeColor.bind(this)}
                              value={this.state.fname}
                              onChange={this.handleChange}
                              required
                              class="_c7 _c7 _c8 _a _b _d _k _l _c9 _ap _ca _cb _cc _cd _ce _cf _cg _ch _ci _cj _ck _cl _dm _ar _cm"
                              style={{ borderRadius: "50px" }}
                            />

                            <br />
                            <label
                              id="input-label-mobile"
                              class="_a _d _k _l _m _n"
                              for="mobile"
                            >
                              {" "}
                              Last Name
                            </label>
                            <input
                              type="text"
                              name="lname"
                              // onClick={this.changeColor.bind(this)}
                              value={this.state.lname}
                              onChange={this.handleChange}
                              required
                              class="_c7 _c7 _c8 _a _b _d _k _l _c9 _ap _ca _cb _cc _cd _ce _cf _cg _ch _ci _cj _ck _cl _dm _ar _cm"
                              style={{ borderRadius: "50px" }}
                            />
                            <br />
                            <label
                              id="input-label-mobile"
                              class="_a _d _k _l _m _n"
                              for="mobile"
                            >
                              {" "}
                              Email{" "}
                            </label>
                            <input
                              type="email"
                              name="email"
                              //  onClick={this.changeColor.bind(this)}
                              value={this.state.email}
                              onChange={this.handleChange}
                              // required
                              class="_c7 _c7 _c8 _a _b _d _k _l _c9 _ap _ca _cb _cc _cd _ce _cf _cg _ch _ci _cj _ck _cl _dm _ar _cm"
                              style={{ borderRadius: "50px" }}
                            />
                            <br />
                            <label
                              id="input-label-mobile"
                              class="_a _d _k _l _m _n"
                              for="mobile"
                            >
                              {" "}
                              Password
                            </label>
                            <input
                              type="password"
                              name="password"
                              placeholder={this.state.placehol}
                              onClick={this.changeColor.bind(this)}
                              value={this.state.password}
                              onChange={this.handleChange}
                              // required
                              class="_c7 _c7 _c8 _a _b _d _k _l _c9 _ap _ca _cb _cc _cd _ce _cf _cg _ch _ci _cj _ck _cl _dm _ar _cm"
                              style={{ borderRadius: "50px" }}
                            />

                            <button
                              className="ddM  _dpp _ap _c _b _a5 _k _l _df _cl _dm _ar _dg _cc _p _r _dh _di _cw _dj _ce _dk _cf _bg _c7 _c7 _c8 _dq _dr {btn_class} btn btn-primary btn-block mb-2 rounded-pill shadow-sm"
                              type="submit"
                            >
                              Save Changes
                            </button>
                          </div>
                        </form>
                        <div class="_a _d _k _l _o _p">
                          {this.state.welResendOTP}
                          {this.state.test}
                          {this.state.resend}
                        </div>
                        <div>
                          {this.state.showSuccessAlert && (
                            <Alert variant="filled" severity="success">
                              {this.state.msg} redirect{" "}
                            </Alert>
                          )}{" "}
                          {this.state.showFailAlert && (
                            <Alert variant="filled" severity="error">
                              {this.state.msg}
                            </Alert>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div class="_a3 _am"  style={{
            position: 'absolute', left: '50%', top: '45%',
            transform: 'translate(-50%, -50%)'
        }}> 
       
        <div class="_u _v _w _x _y _z _a0 _a1 _a2">
        
        <div class="">
        <h4 class="_c _d _e _f _g _h _b _i _j">Welcome back</h4>
       
        <form onSubmit={this.handleSubmit}>

         <div>
         
           <div class="_ap _c3 _c4 ">
           <label id="input-label-mobile" class="_a _d _k _l _m _n" for="mobile"> <b>Phone Number</b> </label>
               <div class="_dm _ar _aa _ab _ac _ad _ae _bk _bl _bm _bn _bo _bp _bq _br _bs _bt _bu _d6 _d7 _d8 _d9 _bz _c0 _c1 _b5 _c2 _aj _ak _al _am">
               <div class="_dm _ar _aa _ab _ac _ad _ae _bk _bl _bm _bn _bo _bp _bq _br _bs _bt _bu _af _ag _ah _ai _bz _c0 _c1 _b5 _c2 _bv _bw _bx _by _ap" >

      <div class=" _dm _ar _aa _ab _ac _ad _ae _bk _bl _bm _bn _bo _bp _bq _br _bs _bt _bu _af _ag _ah _ai _bz _c0 _c1 _b5 _c2 _bv _bw _bx _by" >
        <input
        type="test"
        name="phNumber"
        disabled
        //onClick={this.changeColor.bind(this)}
        value={this.state.phone}
        onChange={this.handleChange}
        required
        class="ph _c7 _c7 _c8 _a _b _d _k _l _c9 _ap _ca _cb _cc _cd _ce _cf _cg _ch _ci _cj _ck _cl _dm _ar _cm"
      />
         
          <div class="_d1 _d2 _d3 _d4 _d5 _bg _bf icon icon_phone"></div></div></div></div><div role="alert" aria-live="assertive" aria-atomic="false">
              <div class="_a _da _k _l _db _dm _ar _t _dc">&nbsp;</div></div></div>
              
           
                   <div class="_ap _c3 _c4 ">
                <label id="input-label-mobile" class="_a _d _k _l _m _n" for="mobile"> <b>First Name </b></label>
                    <div class="_dm _ar _aa _ab _ac _ad _ae _bk _bl _bm _bn _bo _bp _bq _br _bs _bt _bu _d6 _d7 _d8 _d9 _bz _c0 _c1 _b5 _c2 _aj _ak _al _am">
                    <div class="_dm _ar _aa _ab _ac _ad _ae _bk _bl _bm _bn _bo _bp _bq _br _bs _bt _bu _af _ag _ah _ai _bz _c0 _c1 _b5 _c2 _bv _bw _bx _by _ap" >

           <div class="_dm _ar _aa _ab _ac _ad _ae _bk _bl _bm _bn _bo _bp _bq _br _bs _bt _bu _af _ag _ah _ai _bz _c0 _c1 _b5 _c2 _bv _bw _bx _by" >
           <input
            type="text"
            name="fname"
            //onClick={this.changeColor.bind(this)}
            value={this.state.fname}
            onChange={this.handleChange}
            required
            class="_c7 _c7 _c8 _a _b _d _k _l _c9 _ap _ca _cb _cc _cd _ce _cf _cg _ch _ci _cj _ck _cl _dm _ar _cm"
          />
               <div class="_d1 _d2 _d3 _d4 _d5 _bg _bf icon icon_phone"></div></div></div></div><div role="alert" aria-live="assertive" aria-atomic="false">
                   <div class="_a _da _k _l _db _dm _ar _t _dc">&nbsp;</div></div></div>
                  
                   <div class="_ap _c3 _c4 ">
                <label id="input-label-mobile" class="_a _d _k _l _m _n" for="mobile"> <b>Last Name</b> </label>
                    <div class="_dm _ar _aa _ab _ac _ad _ae _bk _bl _bm _bn _bo _bp _bq _br _bs _bt _bu _d6 _d7 _d8 _d9 _bz _c0 _c1 _b5 _c2 _aj _ak _al _am">
                    <div class="_dm _ar _aa _ab _ac _ad _ae _bk _bl _bm _bn _bo _bp _bq _br _bs _bt _bu _af _ag _ah _ai _bz _c0 _c1 _b5 _c2 _bv _bw _bx _by _ap" >

           <div class="_dm _ar _aa _ab _ac _ad _ae _bk _bl _bm _bn _bo _bp _bq _br _bs _bt _bu _af _ag _ah _ai _bz _c0 _c1 _b5 _c2 _bv _bw _bx _by" >
           <input
            type="text"
            name="lname"
           // onClick={this.changeColor.bind(this)}
            value={this.state.lname}
            onChange={this.handleChange}
            required
            class="_c7 _c7 _c8 _a _b _d _k _l _c9 _ap _ca _cb _cc _cd _ce _cf _cg _ch _ci _cj _ck _cl _dm _ar _cm"
          />
              
               <div class="_d1 _d2 _d3 _d4 _d5 _bg _bf icon icon_phone"></div></div></div></div><div role="alert" aria-live="assertive" aria-atomic="false">
                   <div class="_a _da _k _l _db _dm _ar _t _dc">&nbsp;</div></div></div>
                   <div class="_ap _c3 _c4 ">
                <label id="input-label-mobile" class="_a _d _k _l _m _n" for="mobile"> <b>Email</b> </label>
                    <div class="_dm _ar _aa _ab _ac _ad _ae _bk _bl _bm _bn _bo _bp _bq _br _bs _bt _bu _d6 _d7 _d8 _d9 _bz _c0 _c1 _b5 _c2 _aj _ak _al _am">
                    <div class="_dm _ar _aa _ab _ac _ad _ae _bk _bl _bm _bn _bo _bp _bq _br _bs _bt _bu _af _ag _ah _ai _bz _c0 _c1 _b5 _c2 _bv _bw _bx _by _ap" >

           <div class="_dm _ar _aa _ab _ac _ad _ae _bk _bl _bm _bn _bo _bp _bq _br _bs _bt _bu _af _ag _ah _ai _bz _c0 _c1 _b5 _c2 _bv _bw _bx _by" >
           <input
            type="email"
            name="email"
          //  onClick={this.changeColor.bind(this)}
            value={this.state.email}
            onChange={this.handleChange}
           // required
            class="_c7 _c7 _c8 _a _b _d _k _l _c9 _ap _ca _cb _cc _cd _ce _cf _cg _ch _ci _cj _ck _cl _dm _ar _cm"
          />
              
               <div class="_d1 _d2 _d3 _d4 _d5 _bg _bf icon icon_phone"></div></div></div></div><div role="alert" aria-live="assertive" aria-atomic="false">
                   <div class="_a _da _k _l _db _dm _ar _t _dc">&nbsp;</div></div></div>
                   <div class="_ap _c3 _c4 ">
                <label id="input-label-mobile" class="_a _d _k _l _m _n" for="mobile"> <b>Password</b> </label>
                    <div class="_dm _ar _aa _ab _ac _ad _ae _bk _bl _bm _bn _bo _bp _bq _br _bs _bt _bu _d6 _d7 _d8 _d9 _bz _c0 _c1 _b5 _c2 _aj _ak _al _am">
                    <div class="_dm _ar _aa _ab _ac _ad _ae _bk _bl _bm _bn _bo _bp _bq _br _bs _bt _bu _af _ag _ah _ai _bz _c0 _c1 _b5 _c2 _bv _bw _bx _by _ap" >

           <div class="_dm _ar _aa _ab _ac _ad _ae _bk _bl _bm _bn _bo _bp _bq _br _bs _bt _bu _af _ag _ah _ai _bz _c0 _c1 _b5 _c2 _bv _bw _bx _by" >
           <input
            type="password"
            name="password"
            placeholder={this.state.placehol}
            onClick={this.changeColor.bind(this)}
            value={this.state.password}
            onChange={this.handleChange}
           // required
            class="_c7 _c7 _c8 _a _b _d _k _l _c9 _ap _ca _cb _cc _cd _ce _cf _cg _ch _ci _cj _ck _cl _dm _ar _cm"
          />
              
               <div class="_d1 _d2 _d3 _d4 _d5 _bg _bf icon icon_phone"></div></div></div></div><div role="alert" aria-live="assertive" aria-atomic="false">
                   <div class="_a _da _k _l _db _dm _ar _t _dc">&nbsp;</div></div></div>
                   
                   </div>
      
                   <button className="ddM  _dpp _ap _c _b _a5 _k _l _df _cl _dm _ar _dg _cc _p _r _dh _di _cw _dj _ce _dk _cf _bg _c7 _c7 _c8 _dq _dr" type="submit" >Save Changes</button>
                   <div class="">
                       <a href="" onClick={this.handleClick} class="_q _r _ff">Forgot Password ? 
                       </a> <div class="_a _d _k _l _o _p">{this.state.test}
           
           </div></div>
                       
                       </form>
                       <div class="_a _d _kk _l _o _p">By continuing,you agree to the 
                       <a href="admin.mride.pk" class="_q _r ">Terms Of Use
                       </a> and <a href="admin.mride.pk" class="_q _r">Privacy Policy
                       </a> </div>

            </div>

            </div>
            <div>
        { this.state.showSuccessAlert && <Alert variant="filled" severity="success">
       {this.state.msg}
                    </Alert> }
        { this.state.showFailAlert && <Alert variant="filled" severity="error">
        {this.state.msg}
            </Alert> }
        </div> 
        
        </div> */}
      </>
    );
  }
}
