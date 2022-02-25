// import React ,{useEffect, useState} from 'react';
import React, { useState, useEffect } from 'react'
import { ControlledCarousel } from './ControlledCarousel';
import './hb.css';
import { HeadersBanners } from '../AllApi'

export function HomeSlider(props) {

  const [HeaderData, setHeaderData] = useState([]);


  useEffect(() => {
    (async () => {



      const fetchedPanels = await fetch(`${HeadersBanners}`);
      //const fetchedCategories = await fetch(url);

      const loadedPanels = await fetchedPanels.json();

      var hData = JSON.parse(loadedPanels.Result.Data);
      //alert(hData);
      if (hData != null) {
        await setHeaderData(hData.Header);
      }
      else {
        //alert("Data not found");
        //window.location.href = "/dataNotFound";
      }
    })();
  });

  return (
    <>
      <div className="hpItemBox" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <div id='slidersection' style={{ textAlign: "center", }} className='col-md-5 col-sm-6'>
          <h1>Ordering Food Online in a Matter Of Seconds</h1>
          <h3 style={{ color: "#f16b2a" }}>Key Services and Core Values</h3>
          {/* <hr/> */}
          <br />
          <p style={{ color: 'black' }}>
            If you’re going hungry and can’t wait any longer, don’t put yourself through the trouble of traveling.
            You won’t have to waste time looking for restaurants near you, too. We are just a tap away!
          </p>
          <br />
          <p style={{ color: 'black' }}>
            Simply check for your favorite meals on the M-Rides App.
            Whether it’s a scrumptious plate of spicy Chicken Biryani;
            rich, aromatic Chinese food, or your favorite freshly made Burger,
            we will drop it in, in a couple of minutes. Be it your office, home, or almost any location in Karachi.
          </p>
        </div>
      </div>
    </>
  );


}



