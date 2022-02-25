// import React, { useEffect, useState } from "react";
// import { RestaurantCard } from "../RestaurantCard/RestaurantCard";
// import { PreviewCard } from "../PreviewCard/PreviewCard";
// import "./RestaurantsList.css";
// import { DataNotFound } from "../dataNotFound/dataNotFound";
// import { Loader } from "../Loader/Loader";
// import { Divider } from "@material-ui/core";


// export function RestaurantsList(props) {
//   const [RestaurantsData, setRestaurantsData] = useState([]);
//   var url = "http://172.16.100.199:8083/api/MRide/GetAllShop";

//   let byCategory = localStorage.getItem('Cate');
//   let lat = localStorage.getItem('latitude');
//   let lng = localStorage.getItem('longitude');
//   //localStorage.clear();
//   //alert(byCategory);
//   if (byCategory != null) {
//     //alert(23);
//     //alert(byCategory);
//     url = 'http://172.16.100.199:8083/api/MRide/GetRestrurantsByCategoryID?CategoryID=' + byCategory;
//     //alert(byCategory);
//     // alert(url);
//   }
//   else {
//     // alert(24);
//     url = "http://172.16.100.199:8083/api/MRide/GetAllShop?Lat=24.816890599999997&Long=67.034556&Radius=5";
//   }

//   //alert(byCategory);
//   // alert(url);
//   //

//   var message = '';
//   useEffect(() => {
//     (async () => {
//       //alert(url);
//       const fetchedRestaurants = await fetch(url);
//       const loadedRestaurants = await fetchedRestaurants.json();
//       //console.log(loadedRestaurants);
//       var myObject = JSON.parse(loadedRestaurants.Result.Data);
//       var test = JSON.parse(loadedRestaurants.Result.Response);
//       //console.log(myObject);
//       //console.log(test.Code);
//       var responseCode = test.Code;

//       //alert(responseCode);

//       if (responseCode == '05') {
//         message = test.Message;
//       }
//       else if (responseCode == '11') {

//         message = "Oops no resturant found in this food category";


//       }
//       else {
//         await setRestaurantsData(myObject.Shop);

//       }

//     })();
//   });

//   //alert(RestaurantsData);
//   // let filtred = RestaurantsData.filter(
//   //     restaurant =>
//   //           restaurant.GenralInfo.StoreName.toLowerCase().includes(props.searchValue) //||
//   //         //(restaurant.tags && props.filterTags(restaurant)) ||
//   //         //(restaurant.categories && props.filterCategories(restaurant))
//   // );

//   function onRestaurantClick() {

//   }
//   return (

//     <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 0 }}>
//       <div style={{ marginBottom: "-35px" }}>

//         <div style={{ textAlign: "left" }} className='col-md-8 col-md-offset-2 section-title'>
//           {/* <h1 style={{fontSize:"30px"}}>All Resturants</h1> */}

//         </div>
//         <br />
//       </div>

//       <div className="restaurants-list">

//         {RestaurantsData.length > 0 ? RestaurantsData.map((restaurant) => {
//           //alert(restaurant.ShopDiscount.OfferName);
//           return (

//             <>

//               {/* <RestaurantCard
//             key={restaurant.GenralInfo.ShopID}
//             uuid={restaurant.GenralInfo.ShopID}
//             url= {"http://172.16.100.195:8076/Uploadfile/Shoplogo/"+restaurant.ShopDocument.TempFileName}
//             name={restaurant.GenralInfo.StoreName}
//             onRestaurantClick={onRestaurantClick}
//             price={restaurant.GenralInfo.DeliveryFees}
//             deliveryTime={restaurant.GenralInfo.EstimatedDeliveryTime}
           
//             Offer = {restaurant.ShopDiscount.OfferName}
//            // categories={restaurant.categories.map(category => {
//            //   return ` •  ${category.name}`;
//            // })}
//            // deliveryTime={`${restaurant.etaRange.min}-${restaurant.etaRange.max} Min`}
//           /> */}

//               {/* <PreviewCard
//             uuid={restaurant.GenralInfo.ShopID}
//             title={restaurant.GenralInfo.StoreName}
//             deliveryTime={restaurant.GenralInfo.EstimatedDeliveryTime}
//              price={restaurant.GenralInfo.DeliveryFees}
//             Offer = {restaurant.ShopDiscount.OfferName}
          
//           /> */}


//             </>

//           );

//         }) : null}

//       </div>
//     </div>


//   );

// }
