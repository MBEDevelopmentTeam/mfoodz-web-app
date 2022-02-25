// import React, { useEffect, useState } from "react";
// import Carousel from 'react-bootstrap/Carousel'
// import "./Carousel.css";
// import { Loader } from "../Loader/Loader";
// import { HeadersBanners } from '../AllApi';


// export function ControlledCarousel(props) {

//   // const [index, setIndex] = useState(0);

//   //   const handleSelect = (selectedIndex, e) => {
//   //     setIndex(selectedIndex);
//   //   };

//   const [HeaderData, setHeaderData] = useState([]);


//   let headerBannersURL = `${HeadersBanners}`;

//   useEffect(() => {
//     (async () => {



//       const fetchedPanels = await fetch(headerBannersURL);
//       //const fetchedCategories = await fetch(url);

//       const loadedPanels = await fetchedPanels.json();
//       //console.log(loadedPanels);
//       var hData = JSON.parse(loadedPanels.Result.Data);
//       // alert(hData.length);

//       //alert(hData.Header.length);
//       //console.log(hData.Header);
//       if (hData.Header.length > 0) {

//         await setHeaderData(hData.Header);
//       }


//     })();
//   });

//   return (
//     <>
//       <Carousel className="c">
//         {HeaderData.length > 0 ? HeaderData.map((item) => {
//           return (
//             <Carousel.Item>
//               <div class="cbg">
//                 <img
//                   className="d-block cimg"
//                   src={`http://admin.mride.pk/Images/headerImages/${item.Image}`}
//                   alt="First slide"
//                 />
//                 <Carousel.Caption>
//                   <div className="dm">
//                     <h3 className="ff">{item.Heading}</h3>
//                     <p>{item.Description}</p>

//                   </div>

//                 </Carousel.Caption>
//               </div>

//             </Carousel.Item>

//           );

//         }) : <Loader />}

//       </Carousel>
//     </>
//   );





// }

