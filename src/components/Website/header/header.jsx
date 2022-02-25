// import React from "react";
// import { TAhead } from "../TAhead";
// import "./header.css";
// import TrackingWidget from "../../TrackingWidget/TrackingWidget";
// import $ from "jquery";
// // import {onKillCateID } from '../../Header/sidebar'
// // import './hb.css';
// // import { Contact } from './contact';
// // import Carousel from "react-elastic-carousel";
// // import { Row } from 'carbon-components-react';
// // import { Col } from 'react-bootstrap';

// // const find = () => {

// //   // localStorage.setItem('latitude',lat);
// //   // localStorage.setItem('longitude',lng);
// //   // alert("lat: "+lat+" .Long: "+lng);
// //   // window.location.href = '/Main';

// // }

// const findLogin = () => {
//   window.location.href = "/login";
// };

// export const Header = (props) => {
//   var masterCode = localStorage.getItem("mastercode");
//   var cname = localStorage.getItem("custname");
//   //alert(cname)
//   if (cname == null || cname == 0) {
//     cname = "User";
//   }

//   // function onKillCateID() {
//   //   localStorage.removeItem("PhoneNumber");
//   //   localStorage.removeItem("CountryCode");
//   //   localStorage.removeItem("otp");
//   //   localStorage.removeItem("UserId");
//   //   localStorage.removeItem("mastercode");
//   //   localStorage.removeItem("UserStatus");

//   //   // localStorage.removeItem("Name");
//   //   // localStorage.removeItem("custname");
//   // }

//   return (
//     <>
//       <div className="headercontainer">
//         <div className="btn202">
//           {masterCode == null ? (
//             <button onClick={findLogin} id="btnLogin" className="btnLogin">
//               Login
//             </button>
//           ) : (
//             <div className="btnDropdown">
//               <button id="btnLogin" className="btnLogin">
//                 {"Hello, " + cname}
//               </button>

//               <a
//                 id="btnLogout"
//                 className="btnLogout"
//                 onClick={() => onKillCateID()}
//                 href="/"
//               >
//                 LogOut
//               </a>
//             </div>
//           )}
//         </div>

//         <div>
//           <TrackingWidget />

//           {/* {masterCode == null ? null : (
           
//           )} */}
//         </div>

//         <div className="section202">
//           <div>
//             <img className="one" src={"../images/MLogo.png"} />
//           </div>

//           <div>
//             <h1 className="two">
//               {props.data ? props.data.title : "Loading..."}
//             </h1>
//           </div>

//           <div>
//             <p className="three">
//               {props.data ? props.data.paragraph : "Loading..."}
//             </p>
//           </div>
//         </div>

//         <div className="four">
//           <TAhead />
//         </div>
//       </div>
//     </>
//   );
// };
