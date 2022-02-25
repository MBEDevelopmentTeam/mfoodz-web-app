import React ,{useEffect, useState} from "react";
import Carousel from 'react-bootstrap/Carousel'
import "./Carousel.css";
import {Loader} from "./Loader";


export function ControlledCarousel(props) {

  // const [index, setIndex] = useState(0);
  
  //   const handleSelect = (selectedIndex, e) => {
  //     setIndex(selectedIndex);
  //   };

    // const [HeaderData, setHeaderData] = useState([]);

    // useEffect(() => {
    //   (async () => {
  
  
  
    //     const fetchedPanels = await fetch('http://172.16.100.199:8083/api/MRide/HeadersBanners?DeviceID=1');
    //     //const fetchedCategories = await fetch(url);
  
    //     const loadedPanels =  await fetchedPanels.json();
    //   //console.log(loadedPanels);
    //     var hData = JSON.parse(loadedPanels.Result.Data);
    //    // alert(hData.length);

    //    //alert(hData.Header.length);
    //     //console.log(hData.Header);
    //     if(hData.Header.length > 0){

    //       await setHeaderData(hData.Header);
    //     }
        
  
    //   })();
    // });
   
    return (
    <>
      <Carousel fade>
        <Carousel.Item interval={2000}>
            <img style={{borderRadius:"20px"}}
              className="d-block w-100"
              src=".\images\slide2.jpg"
              alt="First slide"
              height='300px'
            />
          {/* <Carousel.Caption>
            <h1>First slide </h1>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img style={{borderRadius:"20px"}}
            className="d-block w-100"
            src=".\images\slide1.jpg"
            alt="Second slide"
            height='300px'
          /> 

      {/* <Carousel.Caption>
        <h1>Second slide</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption> */}

      
    </Carousel.Item>

    <Carousel.Item interval={1000}>
          <img style={{borderRadius:"20px"}}
            className="d-block w-100"
            src=".\images\slide3.jpg"
            alt="Third slide"
            height='300px'
          />

      {/* <Carousel.Caption>
        <h1>Second slide</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption> */}

      
    </Carousel.Item>

      </Carousel>
<br/>
<br/>
<br/>
      </>
    );
    
  
   
  
        
}
   
 