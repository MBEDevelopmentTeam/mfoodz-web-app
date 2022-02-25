
// import React, { useState, useEffect } from "react";
// import { RestaurantInfo } from './ProductsPage';
// import { getShopMenu } from '../AllApi';



// const RestaurantClass = (props) => {

//   const [LocationData, setLocationData] = useState([]);
//   const ShopID = new URLSearchParams(props.location.search).get("shopId");
//   alert(ShopID);
//   var RestaurantMenuURL = `${getShopMenu}?ShopId=${ShopID}`;

//   // alert(RestaurantMenuURL);
//   //Get RestaurantMenu Details

//   useEffect(() => {
//     (async () => {
//       const fetchRestaurantMenuDetails = await fetch(RestaurantMenuURL);
//       const loadRestaurantMenuURLDetails = await fetchRestaurantMenuDetails.json();

//       return fetch(`${RestaurantMenuURL}`)
//         .then((ResMenuResponse) => ResMenuResponse.json())
//         .then((Response) => {
//           var RestaurantResponse = JSON.parse(Response.Result.Response);
//           var RestaurantObject = JSON.parse(Response.Result.Data);
//           //alert(JSON.stringify(RestaurantObject));

//           const ShopMenuArray = [];
//           const ShopLocationArray = [];
//           const ShopFinancialsArray = [];
//           const MenuCategoryArray = [];

//           //Get ShopMenuDetails
//           var ShopMenuDetails = RestaurantObject.ShopMenu[0];
//           ShopMenuArray.push(ShopMenuDetails);
//           //alert(JSON.stringify(ShopMenuDetails));

//           //Get ShopMenu => ShopLocation
//           var ShopLocationDetails = ShopMenuDetails.ShopLocation;
//           ShopLocationArray.push(ShopLocationDetails);
//           setLocationData(ShopLocationDetails);
//           //alert(JSON.stringify(ShopLocationDetails));

//           //Get ShopMenu => ShopFinancials
//           var ShopFinancialsDetails = ShopMenuDetails.ShopFinancials;
//           ShopFinancialsArray.push(ShopFinancialsDetails);
//           //alert(JSON.stringify(ShopFinancialsDetails));

//           //Get ShopMenu => MenuCategory
//           var MenuCategoryDetails = ShopMenuDetails.MenuCategory;
//           MenuCategoryArray.push(MenuCategoryDetails);
//           //alert(JSON.stringify(MenuCategoryDetails));
//         });
//     })();
//   });
//   return (
//     <>
//       <div className="products_page_container">


//         <RestaurantInfo
//           address={LocationData.Address}
//         />

//       </div>
//     </>
//   );
// };
// export default RestaurantClass;
