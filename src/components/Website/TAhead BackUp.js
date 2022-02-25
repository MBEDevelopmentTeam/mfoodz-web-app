import React, { useState ,useEffect} from 'react';
import { Typeahead,AsyncTypeahead } from 'react-bootstrap-typeahead';
import ReactDOM from 'react-dom';
import options from './aData';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './TAhead.css';
import {Fragment,Form} from 'react';

const findlt = (e) => {

//alert(e);
  // localStorage.setItem('latitude',lat);
        
  // localStorage.setItem('longitude',lng);  

  // alert("lat: "+lat+" .Long: "+lng);
  //window.location.href='/Main';
  }

  const find = () => {
       window.location.href='/Main';
    }

 export const TAhead = () => {

  let SearchValue = "korangi";
  let CountryCode = "PK";

  var LocationURL =  `http://172.16.100.199:8083/api/MRide/SearchLocation?SearchValue=${SearchValue}&CountryCode=${CountryCode}`;

  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    (async() => {
        const fetchSelectedLoation = await fetch(LocationURL);
        const LoadSelectedLoation = await fetchSelectedLoation.json();

        return fetch(
          `${LocationURL}`,

        )
        .then((loc) => loc.json())
        .then((Response) => {
            var LocationResponse = JSON.parse(Response.Result.Response);
            var AllLoactionObject = JSON.parse(Response.Result.Data);

            const LocationArray = [];
            var LocationList = AllLoactionObject.Locations;
            LocationArray.push(LocationList)
            setSelectedLocation(JSON.stringify(LocationList));
            
            // alert(JSON.stringify(LocationList));
            // console.log("Location-List");
            // console.log(LocationList);

        });
    })();
  });
 
 
  return (
    
    <div class="input-group">
      
        <Typeahead
          id='TypeInput'
          onChange={setSelected}
          options={options}
          selected={selected}
          placeholder="Enter your delivery location"
        />
      <span class="input-group-btn">
          <button className='btn btn-default' target='_self' onClick={find} id='btnFindFood' type="button">Find Location</button>
       </span>
      
    </div>
  );
};

// ReactDOM.render(<TAhead />, document.getElementById('root'));