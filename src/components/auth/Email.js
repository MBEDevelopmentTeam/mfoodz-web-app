import React, {Component} from "react";
import axios from "axios";
import "./Loginstyle.css";
import logo from "../../img/SignUpLogo.png";




export default class Email extends Component { 
    
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: "",
      test:"",
      resend:"",
      black: true,
        
        
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
 

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  changeColor(){
    this.setState({black: !this.state.black})
 }



  handleSubmit(event) {
   
    const { email, password } = this.state;
    localStorage.setItem("email",email);
    window.location.href = "/name";
    //var otp = localStorage.getItem("otp");
    //alert(otp);
   

    event.preventDefault();
  }

  render() {
   
    let btn_class = this.state.black ? "_do _dp _ap _c _b _a5 _k _l _df _cl _dm _ar _dg _cc _p _r _dh _di _cw _dj _ce _dk _cf _bg _c7 _c7 _c8 _dq _dr" : "ddM  _dpp _ap _c _b _a5 _k _l _df _cl _dm _ar _dg _cc _p _r _dh _di _cw _dj _ce _dk _cf _bg _c7 _c7 _c8 _dq _dr";
    
    //alert(message);
    //var gg = window.topicText;
  
    return (
        <div class="_a3 _am"  style={{
            position: 'absolute', left: '50%', top: '40%',
            transform: 'translate(-50%, -50%)'
        }}> 
        <img alt="M-Foods" role="img" src={logo} 
        style={{
            position: 'absolute', left: '50%',
            transform: 'translate(-50%, -50%)'
        }}
        
        />
        <div class="_u _v _w _x _y _z _a0 _a1 _a2">
        
        <div class="">
        <h4 class="_c _d _e _f _g _h _b _i _j">Let's get started</h4>
        <form onSubmit={this.handleSubmit}>
         <div>
            <div class="_ap _c3 _c4 ">
                <label id="input-label-mobile" class="_a _d _k _l _m _n" for="mobile"> Email (required) </label>
                    <div class="_dm _ar _aa _ab _ac _ad _ae _bk _bl _bm _bn _bo _bp _bq _br _bs _bt _bu _d6 _d7 _d8 _d9 _bz _c0 _c1 _b5 _c2 _aj _ak _al _am">
                    <div class="_dm _ar _aa _ab _ac _ad _ae _bk _bl _bm _bn _bo _bp _bq _br _bs _bt _bu _af _ag _ah _ai _bz _c0 _c1 _b5 _c2 _bv _bw _bx _by _ap" >

           <div class="_dm _ar _aa _ab _ac _ad _ae _bk _bl _bm _bn _bo _bp _bq _br _bs _bt _bu _af _ag _ah _ai _bz _c0 _c1 _b5 _c2 _bv _bw _bx _by" >
           <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            onClick={this.changeColor.bind(this)}
            required
            class="_c7 _c7 _c8 _a _b _d _k _l _c9 _ap _ca _cb _cc _cd _ce _cf _cg _ch _ci _cj _ck _cl _dm _ar _cm"
          />
              

               <div class="_d1 _d2 _d3 _d4 _d5 _bg _bf icon icon_phone"></div></div></div></div><div role="alert" aria-live="assertive" aria-atomic="false">
                   <div class="_a _da _k _l _db _dm _ar _t _dc">&nbsp;</div></div></div></div>
                   
                   <button className={btn_class} type="submit">Next</button>
                 
                       
                       </form>
                        </div></div>
                       </div>

    );
  }
}