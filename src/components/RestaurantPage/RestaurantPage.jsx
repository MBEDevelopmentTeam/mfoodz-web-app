// import React, {useState, useEffect} from 'react';
// import {RestaurantTeaser} from "../RestaurantTeaser/RestaurantTeaser";
// import {RestaurantMenu} from "../RestaurantMenu/RestaurantMenu";
// import {MenuType} from "../MenuType/MenuType";


// export function RestaurantPage(props) {
//     const [uuid, setUuid] = useState(props.match.params.id);
//     const [restaurant, setRestaurant] = useState({});
//     const [menu, setMenu] = useState({});
//     const [head, setHead] = useState({});
    
//     // useEffect(() => {
//     //     (async () => {
//     //         const response = await fetch(
//     //              `https://uber-eats-mates.herokuapp.com/api/v1/restaurants/${uuid}`
//     //           //  "172.16.100.199:8081/api/MRide/GetCategoryByShopID/?ShopID=1"
//     //         );
//     //         const loadedRestaurant = await response.json();
//     //        // alert(loadedRestaurant);

//     //         await setRestaurant(loadedRestaurant);
//     //     })();
//     // });

//     useEffect(() => {
//         (async () => {
//             const response = await fetch(
//                  `http://172.16.100.199:8083/api/MRide/GetCategoryByShopID/?ShopID=1`
//               //  "172.16.100.199:8081/api/MRide/GetCategoryByShopID/?ShopID=1"
//             );
//             const loadedRestaurant = await response.json();
//            // alert(23);
//            // alert(loadedRestaurant);
//              //   console.log(loadedRestaurant);
//              var myObject = JSON.parse(loadedRestaurant.Result.Data);

//             // console.log(myObject);
//             await setRestaurant(myObject);

//             const res = await fetch(
//                 `http://172.16.100.199:8083/api/MRide/GetResturantDataByShopID/?ShopID=1`
//              //  "172.16.100.199:8081/api/MRide/GetCategoryByShopID/?ShopID=1"
//            );
//            const loadedRestaurantMenu = await res.json();
//           // alert(23);
//           // alert(loadedRestaurant);
//             //   console.log(loadedRestaurant);
//             var myObject2 = JSON.parse(loadedRestaurantMenu.Result.Data);

//            //console.log(myObject2);
//            await setMenu(myObject2);

//            const responc = await fetch(
//                          `https://uber-eats-mates.herokuapp.com/api/v1/restaurants/${uuid}`
//                       //  "172.16.100.199:8081/api/MRide/GetCategoryByShopID/?ShopID=1"
//                     );
//                     const loadedRestaurs = await responc.json();
//                    // alert(loadedRestaurant);
        
//                     await setHead(loadedRestaurs);

                    

//         })();
//     });


//     function isNotEmpty(obj) {
//         for (let key in obj) {
//             return true;
//         }
//         return false;
//     }

//     return (
//         <main>



//             {isNotEmpty(head) ? (
//                 <RestaurantTeaser
//                     restaurant={head}/>
//             ) : (
//                 ""
//             )}
//              {isNotEmpty(restaurant) ? (
//                 <RestaurantMenu
//                     restaurant={restaurant}/>
//             ) : (
//                 ""
//             )} 
//              {isNotEmpty(menu) ? (
//                 <MenuType
//                     restaurant={menu}/>
//             ) : (
//                 ""
//             )} 
//         </main>
//     );
// }