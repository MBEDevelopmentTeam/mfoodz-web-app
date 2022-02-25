import React, { useState, useEffect } from "react";
import { Typeahead, AsyncTypeahead } from "react-bootstrap-typeahead";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import options from './aData';
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./TAhead.css";
import { Header } from "carbon-components-react";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { addressModalShow, addressModalHide, deliveryMap } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, } from 'react-bootstrap';
import WrappedMap from "../SearchPanel/Map";
import './TDAhead.css';
import { GoogleKey, presavedlocationfromourdb } from '../AllApi';

let fulladd = null;

// const find = () => {
//   window.location.href = "/Main";
// };

let TestLat = null;
let Testlng = null;
let TestLocationName = null;
let options = [];
let count = 0;
export const TDAhead = () => {
  const addressmodal = useSelector((state) => state.addressmodal);
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selected, setSelected] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);


  // const [onChangeSelected, setonChangeSelected] = useState("");

  if (typeof selected[0] != "undefined" && selected[0] != null) {
    TestLat = selected[0].lat;
    Testlng = selected[0].lng;
    TestLocationName = selected[0].label;
    console.log(TestLat + ',' + Testlng);
    localStorage.setItem("lat", parseFloat(TestLat));
    localStorage.setItem("lng", parseFloat(Testlng));
    localStorage.setItem("TestLocationName", TestLocationName);
  }

  let userdID = localStorage.getItem("UserId");
  //alert(userdID);
  if (userdID == null) {
  } else {
  }

  let SearchValue = null;
  let lat = null;
  let lng = null;
  let CountryCode = null;

  SearchValue = "clifton";
  CountryCode = "PK";



  const handleInputChange = (input, e) => {
    fn_GetSearchLocation(input);
    //console.log(input);
  };

  useEffect(() => {

    var utc;
    var currentTime = new Date();
    var currentTimezone = currentTime.getTimezoneOffset();
    currentTimezone = (currentTimezone / 60) * -1;

    if (currentTimezone !== 0) {
      utc = currentTimezone > 0 ? ' +' : ' ';
      utc += currentTimezone
    };
    if (utc > 0) {
      CountryCode = "PK"
    }
    else {
      CountryCode = "CA"
    }
    localStorage.setItem("CountryCode", CountryCode);
    // console.log(CountryCode);	




  });



  async function fn_GetSearchLocation(input) {
    options = [];

    var LocationURL = `${presavedlocationfromourdb}?SearchValue=${input}&CountryCode=${CountryCode}`;
    const fetchSelectedLoation = await fetch(LocationURL);
    const LoadSelectedLoation = await fetchSelectedLoation.json();

    return fetch(`${LocationURL}`)
      .then((loc) => loc.json())
      .then((Response) => {
        var LocationResponse = JSON.parse(Response.Result.Response);
        var AllLoactionObject = JSON.parse(Response.Result.Data);
        if (AllLoactionObject != null) {


          const LocationArray = [];
          var LocationList = AllLoactionObject.Locations;
          // console.log("LocationList");
          // console.log(LocationList);

          if (LocationList != null) {
            LocationList.map((val) => {
              if (typeof val.Coordinates != "undefined") {
                lat = val.Coordinates.split(",")[0];
                lng = val.Coordinates.split(",")[1];
              }

              const single = {
                label: val.LocationsName,
                lat,
                lng,
                CountryCode: val.CountryCode,
                country: "",
                state: "",
                city: "",
              };
              options.push(single);
            });
            LocationArray.push(LocationList);
            count++;
            setSelectedLocation(count);

          }
        }
        else {
          // console.log("No record");

        }




      });
  }
  const dispatch1 = useDispatch();

  const deliveryAddress = useSelector((state) => state.deliverymap);
  return (
    <>
      <div className="TDAhead1 " >
        <Typeahead
          id="TypeInput"
          className="TDAhead"
          onChange={setSelected}
          options={options}
          selected={selected}
          placeholder="Enter your delivery location..."
          onInputChange={handleInputChange}

        />
        <span


          className="addressIcon"

        >
          <FaMapMarkerAlt className="deliveryMapIcon" onClick={() => dispatch1(deliveryMap())} />
          <MyVerticallyCenteredModal
            show={deliveryAddress}
            onHide={() => setModalShow(false)}
          />
        </span>
        {/* <span class="input-group-btn">


      </span> */}
      </div>
      <br />
    </>
  );

};


var Lat = localStorage.getItem("lat", Lat);
var Long = localStorage.getItem("lng", Long);
var GetLocationName = localStorage.getItem("TestLocationName", GetLocationName);
//let CountryCode = "PK";
function MyVerticallyCenteredModal(props) {
  let pinLocation = JSON.parse(localStorage.getItem('PinLocation'));
  const [pinLoc, setCount] = useState(pinLocation);

  const [query, setQuery] = useState("");



  function addressbutton() {
    let LatLng = document.getElementById("latLngHidden").value;
    LatLng = JSON.parse(LatLng);

    if (Object.keys(LatLng).length > 0) {
      var lat = LatLng.lat;
      var lng = LatLng.lng;

      // console.log(lat);
      // console.log(lng);

      var geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        {
          latLng: {
            lat: parseFloat(lat),
            lng: parseFloat(lng),
          },
        },

        function (responses) {
          //alert(JSON.stringify(responses));
         // alert(responses[0].formatted_address)
          if (responses && responses.length > 0) {
            localStorage.setItem("lat", lat);
            localStorage.setItem("lng", lng);

            // window.location.href = `../main?lat=${lat}&lng=${lng}&CountryCode=${CountryCode}`;

            document.getElementById("result").value = responses[0].formatted_address;

            fulladd = document.getElementById("mainaddress").value = responses[0].formatted_address;
            GetLocationName = fulladd;
            localStorage.setItem("TestLocationName", GetLocationName);
          }
          else {
            console.log('addressbutton');
            console.log(responses);
          }
        }
      );
    }
  }
  const dispatch1 = useDispatch();

  return (

    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >


        <Modal.Title id="contained-modal-title-vcenter">
          <input

            // onChange={event => setQuery(event.target.value)}
            value={GetLocationName}
            type="text"
            className="location"
            id="result"
            placeholder={pinLoc}
          />
        </Modal.Title>


      </Modal.Header>
      <Modal.Body className="maps">

        <WrappedMap

          googleMapURL={GoogleKey}
          loadingElement={<div style={{ height: `200%` }} />}
          containerElement={<div style={{ height: `320px` }} />}
          mapElement={<div style={{ height: `140%` }} />}

        />


        <button onClick={() => (addressbutton(), dispatch1(deliveryMap()))} data- dismiss="modal" style={{ zIndex: '2', position: 'relative', width: '245px', border: '1px solid', color: 'white', backgroundColor: '#f26c2a', left: '247px', top: '58px' }}>Confirm Location</button>
        {/* onClick={() => dispatch1(deliveryMap())} */}
      </Modal.Body>
      <Modal.Footer>

        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


// ReactDOM.render(<TAhead />, document.getElementById('root'));
