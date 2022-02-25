
import "./MainPageTopSlider.css";
import "../Header/Carousel.css";
import React ,{useEffect, useState} from "react";
import Carousel from 'react-bootstrap/Carousel'
import {HeaderPanelItem} from "../Header/HeaderPanelItem";
import ControlledCarousel from '../Carousel/ControlledCarousel';
import {Loader} from "../Loader/Loader";
    


function MainPageTopSilder(props){

    const [HeaderData, setHeaderData] = useState([]);

    useEffect(() => {
      (async () => {

        const fetchedPanels = await fetch('http://172.16.100.199:8083/api/MRide/HeadersBanners?DeviceID=1');
        //const fetchedCategories = await fetch(url);
  
        const loadedPanels =  await fetchedPanels.json();
      //console.log(loadedPanels);
        var hData = JSON.parse(loadedPanels.Result.Data);
       // alert(hData.length);

       //alert(hData.Header.length);
        //console.log(hData.Header);
        if(hData.Header.length > 0){

          await setHeaderData(hData.Header);
        }
    })();
});

    return(
        <>
        <div className='MainContainer'>
            
            <div className='col-md-4 childContainer1'>
                <h2>Crave it? Get it.</h2>
                <p>Search for a favorite restaurant, cuisine, or dish.</p>
            </div>

            <div className='col-md-8 childContainer2'>
            
            <Carousel>
            {HeaderData.length > 0 ? HeaderData.map((item) => {
            return (
            <Carousel.Item>
            
            <div className='col-md-2 SliderText'>
                <Carousel.Caption>
                <h3 className="ff">{item.Heading}</h3>
                <p>{item.Description}</p>
                </Carousel.Caption>
            </div>

            <div className='col-md-6 SliderImage'>
            <img
            className="col-md-6 col-lg-12"
            src={`http://admin.mride.pk/Images/headerImages/${item.Image}`}
            alt="First slide"
        />
            </div>
		</Carousel.Item>
	);

}) : <Loader/>} 

		</Carousel>

            </div>
        </div>

</>
    );
}

export default MainPageTopSilder;