// import React, { useState } from "react";
// import emailjs from "emailjs-com";
// import "./hb.css";
// import alldata from "./data/data.json";
// import { Container } from "react-bootstrap";

// const initialState = {
//   name: "",
//   email: "",
//   message: "",
// };

// const Contact = (props) => {
//   const [{ name, email, message }, setState] = useState(initialState);

//   // let data = JSON.stringify(alldata.Header.title)
//   const [about, setAbout] = useState([alldata.About]);
//   const [siteMap, setSiteMap] = useState();
//   const [contact, setContact] = useState([alldata.Contact]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setState((prevState) => ({ ...prevState, [name]: value }));
//   };
//   const clearState = () => setState({ ...initialState });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // console.log(name, email, message);
//     emailjs
//       .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", e.target, "YOUR_USER_ID")
//       .then(
//         (result) => {
//           console.log(result.text);
//           clearState();
//         },
//         (error) => {
//           console.log(error.text);
//         }
//       );
//   };
//   return (
//     <div id="contact">
//       <div className="container">
//         <div className="row">
//           {/* {/ About M-Foods /} */}

//           {about.map((item1) => {
//             return (
//               <div className="col-md-4 ulFooter">
//                 <h2 style={{ color: "#f16b2a" }} className="footerTitles">
//                   About M-Foods
//                 </h2>
//                 <p style={{ textAlign: "justify" }}>{item1.Why2}</p>
//               </div>
//             );
//           })}

//           {/* {/ Site Map /} */}
//           <div className="col-md-4 ulFooter">
//             <h2 style={{ color: "#f16b2a" }} className="footerTitles">
//               Site Map
//             </h2>
//             <p>
//               {/* {/ <span className="cw">Address:</span> /} */}
//               <a href="https://register.m-rides.com" target="_blank">
//                 - Create a Business Account
//               </a>
//             </p>
//             <p>
//               {/* {/ <span className="cw">Phone</span> /} */}
//               <a href="https://register.m-rides.com" target="_blank">
//                 - Add your Restaurant
//               </a>
//             </p>
//             <p>
//               {/* {/ <span className="cw">Email</span> /} */}
//               {/* {/ {props.data ? props.data.email : "loading"} /} */}
//               <a href="https://register.m-rides.com">- Sign up to Deliver</a>
//             </p>
//             <p>
//               {/* {/ <span className="cw">Email</span> /} */}
//               {/* {/ {props.data ? props.data.email : "loading"} /} */}
//               <a href="">- My Orders</a>
//             </p>
//           </div>

//           {/* {/ Get In Touch /} */}

//           {contact.map((item) => {
//             return (
//               <div className="col-md-4 ulFooter">
//                 <h2 style={{ color: "#f16b2a" }} className="footerTitles">
//                   Get In Touch
//                 </h2>
//                 <p>
//                   <span className="cw">Address :</span>
//                   {item.address}
//                 </p>
//                 <p>
//                   <span className="cw">Phone :</span>
//                   {item.phone}
//                 </p>
//                 <p>
//                   <span className="cw">Email :</span>
//                   {item.email}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };
