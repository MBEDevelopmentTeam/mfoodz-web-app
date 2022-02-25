
import React, { useState, useEffect, useRef } from "react";
import "./SearchPanel.css";

import { Button, Modal, } from 'react-bootstrap';
import WrappedMap from "./Map";
import AsyncPaginationExample from "./AsyncPaginationExample";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};


function handleScriptLoad(updateQuery, autoCompleteRef) {

  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["geocode"] }
  );
  autoComplete.setFields(["address_components", "geometry", "icon", "name", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}
async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);

}

function MyVerticallyCenteredModal(props) {
  let pinLocation = JSON.parse(localStorage.getItem('PinLocation'));
  const [pinLoc, setCount] = useState(pinLocation);

  const [query, setQuery] = useState("");


  function addressbutton() {


    let LatLng = document.getElementById('latLngHidden').value;
    LatLng = JSON.parse(LatLng)


    if (Object.keys(LatLng).length > 0) {

      var lat = LatLng.lat
      var lng = LatLng.lng

      // console.log(lat);
      // console.log(lng);


      var geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({
        latLng: {
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        }
      }

        , function (responses) {


          if (responses && responses.length > 0) {

            document.getElementById("result").value = responses[0].formatted_address;
            document.getElementById("mainaddress").value = responses[0].formatted_address;

          } else {
            console.log(responses);

          }
        });

    }

  }







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

            onChange={event => setQuery(event.target.value)}
            type="text"
            className="location"
            id="result"
            placeholder={pinLoc}
          />
        </Modal.Title>


      </Modal.Header>
      <Modal.Body className="maps">

        <WrappedMap

          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBoggmNYAGO4585YCVDhYsQOrr_YLl_pYs`}
          loadingElement={<div style={{ height: `200%` }} />}
          containerElement={<div style={{ height: `320px` }} />}
          mapElement={<div style={{ height: `140%` }} />}

        />


        <button onClick={() => addressbutton()} style={{ zIndex: '2', position: 'relative', width: '245px', border: '1px solid', color: 'white', backgroundColor: '#f26c2a', left: '247px', top: '58px' }}>FIND LOCATION</button>

      </Modal.Body>
      <Modal.Footer>

        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


export function SearchPanel(props) {


  let pinLocation = JSON.parse(localStorage.getItem('PinLocation'));
  const [pinLoc, setCount] = useState(pinLocation);

  const [query, setQuery] = useState("");


  const autoCompleteRef = useRef(null);


  // useEffect(() => {
  //   loadScript(
  //     'https://maps.googleapis.com/maps/api/js?key=AIzaSyBiu--yn4i253z0gNIQ3Dle6Nr-P2zmyas&libraries=places',
  //     () => handleScriptLoad(setQuery, autoCompleteRef)
  //   );
  // }, []);

  function geolocate() {



    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const circle = new window.google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy,
        });
        autoComplete.setBounds(circle.getBounds());
      });
    }
  }


  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <div className="sp_location">
        <span><i className="fa fa-map-marker fa-lg" onClick={() => setModalShow(true)} ></i></span>
        <input
          id="mainaddress"
          ref={autoCompleteRef}
          onChange={event => setQuery(event.target.value)}
          type="text"
          className="sp_location_ph"
          onFocus={event => geolocate()}
          placeholder={pinLoc}
        />
      </div>
      <div className="spacer"></div>

      <span ><i className="fa fa-search fa-lg bbgg"> </i></span>

      <div className="sp_search">

        <AsyncPaginationExample />

      </div>


      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );

}