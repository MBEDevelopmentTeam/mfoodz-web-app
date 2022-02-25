import React, { useState, useRef } from "react";
import "./SearchPanel.css";
import { Button, Modal } from "react-bootstrap";
import WrappedMap from "./Map";
import AsyncPaginationExample from "./AsyncPaginationExample";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GoogleKey } from "../AllApi";
import { useSelector } from "react-redux";
// import Autocomplete from "./Autocomplete";

let autoComplete;
let fulladd = null;
const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";
  if (script.readyState) {
    script.onreadystatechange = function() {
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
  autoComplete.setFields([
    "address_components",
    "geometry",
    "icon",
    "name",
    "formatted_address",
  ]);
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
  let pinLocation = JSON.parse(localStorage.getItem("PinLocation"));
  const [pinLoc, setCount] = useState(pinLocation);

  const [query, setQuery] = useState("");

  function addressbutton() {
    let LatLng = document.getElementById("latLngHidden").value;

    LatLng = JSON.parse(LatLng);

    if (Object.keys(LatLng).length > 0) {
      var lat = LatLng.lat;
      var lng = LatLng.lng;

      var geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        {
          latLng: {
            lat: parseFloat(lat),
            lng: parseFloat(lng),
          },
        },

        function(responses) {
          if (responses && responses.length > 0) {
            localStorage.setItem("lat", lat);
            localStorage.setItem("lng", lng);

            window.location.href = `/main?lat=${lat}&lng=${lng}&CountryCode=${CountryCode}`;

            document.getElementById("result").value =
              responses[0].formatted_address;
            fulladd = document.getElementById("mainaddress").value =
              responses[0].formatted_address;
            GetLocationName = fulladd;
            localStorage.setItem("TestLocationName", GetLocationName);
          } else {
            console.log(responses);
          }
        }
      );
    }
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
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

        <button className="findLocation" onClick={() => addressbutton()}>
          FIND LOCATION
        </button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

var Lat = localStorage.getItem("lat", Lat);
var Long = localStorage.getItem("lng", Long);
var GetLocationName = localStorage.getItem("TestLocationName", GetLocationName);
let CountryCode = "PK";

export function SearchPanel(props) {
  let pinLocation = JSON.parse(localStorage.getItem("PinLocation"));
  const [pinLoc, setCount] = useState(pinLocation);

  const mp = useSelector((state) => state.mainpath);
  const autoCompleteRef = useRef(null);

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <div className="newsearchpanel">
        {mp ? (
          <div className="sp_location">
            <span className="addressIcon" onClick={() => setModalShow(true)}>
              <FaMapMarkerAlt />
            </span>
            <input
              id="mainaddress"
              ref={autoCompleteRef}
              value={GetLocationName}
              type="text"
              className="sp_location_ph"
              placeholder={pinLoc}
              
            />
          </div>
        ) : null}

        {mp ? (
          <div className="newfoodsearch">
            <AsyncPaginationExample />
          </div>
        ) : null}

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </>
  );
}
