import React ,{useEffect, useState} from "react";
import "./HeaderPanelItem.css";
import {ControlledCarousel} from '../Header/ControlledCarousel';
import {Loader} from "../Loader/Loader";

export function HeaderPanelItem(props) {

    const [HeaderData, setHeaderData] = useState([]);


    useEffect(() => {
        (async () => {
    
    
    
          const fetchedPanels = await fetch('http://172.16.100.199:8083/api/MRide/HeadersBanners?DeviceID=1');
          //const fetchedCategories = await fetch(url);
    
          const loadedPanels =  await fetchedPanels.json();
         
          var hData = JSON.parse(loadedPanels.Result.Data);
         // alert(cData.Categorys);
          //console.log(hData.Header);
          await setHeaderData(hData.Header);
    
        })();
      });
    
      return (
        <>
      <div class="hpItemBoxh">
        <ControlledCarousel/>
        </div>
      </>
      );
    
      
    }



//   return (
//     <>

// <div class="hpItem">
//     <button class="btnhpBack">
//     <span class="fa fa-arrow-left"></span>
//     </button>
//     <div class="hpItemBox">
//     <a>
//         <div class="box">
//             <div class="boxText">
//                 Buy One, 
//                 Get One is back
//             <button class="boxBtn">
//                 Order Now
//                 <span class="fa fa-arrow-right boxBtn-span"></span>
//             </button>
//             </div>
            
//             <img class="boxImg" src="https://d1g1f25tn8m2e6.cloudfront.net/2dceff4e-e6bb-4a5e-a988-82b81754aa44.jpg">

//             </img>
            
//         </div>
//     </a>
// </div>

// <div class="hpItemBox">
//     <a>
//         <div class="box">
//             <div class="boxText">
//                 Buy One, Get One is back
//             <button class="boxBtn">
//                 Order Now
//                 <span class="fa fa-arrow-right boxBtn-span"></span>
//             </button>
//             </div>
            
//             <img class="boxImg" src="https://d1g1f25tn8m2e6.cloudfront.net/2dceff4e-e6bb-4a5e-a988-82b81754aa44.jpg">

//             </img>
            
//         </div>
//     </a>
// </div>

// <button class="btnhpNext">
//     <span class="fa fa-arrow-right"></span>
//     </button>


// </div>
//     </>
//   );
// }
