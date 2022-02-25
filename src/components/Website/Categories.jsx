// import React, { useState, useEffect } from 'react'
// import { Loader } from "./Loader";
// import Carousel from "./Carousel/Carousel";
// import './hb.css';
// import { GetCategory } from '../AllApi';

// export function Categories(props) {

//   const [CategoryData, setCategoryData] = useState([]);

//   useEffect(() => {
//     (async () => {

//       const fetchedCategories = await fetch(`${GetCategory}`);
//       //const fetchedCategories = await fetch(url);

//       const loadedCategories = await fetchedCategories.json();

//       var myObject = JSON.parse(loadedCategories.Result.Data);
//       if (loadedCategories.Result.Data != null) {
//         await setCategoryData(myObject.Categorys);
//       }

//     })();
//   });

//   function onPageClick(ID, CateName) {
//     //alert(ID);
//     if (ID > 0) {
//       // alert(ID);
//       // var urls = "http://172.16.100.199:8083/api/MRide/GetRestrurantsByCategoryID?CategoryID="+ID;
//       //alert(urls);
//       localStorage.setItem("Cate", ID);
//       localStorage.setItem("CateName", CateName);
//     }
//   }
//   const breakPoints = [
//     { width: 1, itemsToShow: 1 },
//     { width: 300, itemsToShow: 1 },
//     { width: 400, itemsToShow: 2 },
//     { width: 500, itemsToShow: 3 },
//     { width: 786, itemsToShow: 4 },
//     { width: 1200, itemsToShow: 5 },
//   ];

//   return (
//     <>
//       <div id='categories' style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 0, textAlign: '-webkit-center' }}>
//         <div className='container'>
//           <div style={{ textAlign: "center" }} className='col-md-8 col-md-offset-2 section-title'>
//             <h1 style={{ fontWeight: "bolder", fontSize: "50px" }}>Restaurants in your pocket</h1>
//             <p style={{ color: 'black' }}>
//               Order from your favorite restaurants & track on the go, with the all-new M-Foodz app. 
//             </p>
//           </div>
//         </div>
//         <Carousel show={7} >
//           {CategoryData.length > 0 ? CategoryData.map((category) => {
//             return (
//               <div style={{ padding: 8 }}>
//                 <img src={category.imageUrl} alt={category.CategoryName} style={{ width: '100%' }} />
//                 <span class="AllCategories">
//                   <div style={{ textAlign: "center" }} className='CategoriesName'>
//                     <b style={{ fontFamily: "'Raleway', 'sans-serif'", fontSize: "1.5rem", fontWeight: "500" }}>{category.CategoryName}</b>
//                   </div>
//                 </span>
//               </div>
//             );
//           })
//             : <Loader />
//           }
//         </Carousel>
//       </div>
//       <br />
//       <br />
//     </>
//   );
// }

