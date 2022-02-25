import React, { useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./TAhead.css";
import { getFinalAddress } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import WrappedMap from "../SearchPanel/Map";
import "./TDAhead.css";
import { GoogleKey, presavedlocationfromourdb } from "../AllApi";
import { updatedStore } from "../../index";

let Lastadd = "";
let LastLat = null;
let LastLong = null;

let TestLat = null;
let Testlng = null;
let TestLocationName = null;
let options = [];
let count = 0;

export const TDAhead = () => {
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selected, setSelected] = useState([]);

  if (typeof selected[0] != "undefined" && selected[0] != null) {
    TestLat = selected[0].lat;
    Testlng = selected[0].lng;
    TestLocationName = selected[0].label;

    localStorage.setItem("lat", parseFloat(TestLat));
    localStorage.setItem("lng", parseFloat(Testlng));
    localStorage.setItem("TestLocationName", TestLocationName);
  }

  let userdID = localStorage.getItem("UserId");

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
  };

  useEffect(() => {
    var utc;
    var currentTime = new Date();
    var currentTimezone = currentTime.getTimezoneOffset();
    currentTimezone = (currentTimezone / 60) * -1;

    if (currentTimezone !== 0) {
      utc = currentTimezone > 0 ? " +" : " ";
      utc += currentTimezone;
    }
    if (utc > 0) {
      CountryCode = "PK";
    } else {
      CountryCode = "CA";
    }
    localStorage.setItem("CountryCode", CountryCode);
    var lat = localStorage.getItem("lat");
    var lng = localStorage.getItem("lng");
    const LoadingObj = [
      {
        label: GetLocationName,
        lat,
        lng,
        country: "",
        state: "",
        city: "",
      },
    ];
    setSelected(LoadingObj);
  }, []);
  function addressbutton() {
    let LatLng = document.getElementById("latLngHidden").value;

    LatLng = JSON.parse(LatLng);
    if (Object.keys(LatLng).length > 0) {
      LastLat = LatLng.lat;
      LastLong = LatLng.lng;

      var geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        {
          latLng: {
            lat: parseFloat(LastLat),
            lng: parseFloat(LastLong),
          },
        },

        function(responses) {
          if (responses != null && responses.length > 0) {
            Lastadd = responses[0].formatted_address;

            // updatedStore.dispatch(
            //   getFinalAddress({
            //     address: Lastadd,
            //     lat: LastLat,
            //     long: LastLong,
            //     country: "",
            //     state: "",
            //     city: "",
            //     label: Lastadd,
            //   })
            // );

            localStorage.setItem("TestLocationName", Lastadd);
            FinalLocationName = localStorage.getItem("TestLocationName");
            const LoadingObj = [
              {
                label: FinalLocationName,
                lat: parseFloat(LastLat),
                lng: parseFloat(LastLong),
                country: "",
                state: "",
                city: "",
              },
            ];
            setSelected(LoadingObj);
          } else {
          }
        }
      );
    }
  }

  async function fn_GetSearchLocation(input) {
    options = [];
    console.log(GetLocationName);
    console.log("GetLocationName");

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
        } else {
        }
      });
  }

  return (
    <>
      <div id="XOOOP" style={{ paddingRight: "25px", position: "relative" }}>
        <WrappedMap
          googleMapURL={GoogleKey}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `320px` }} />}
          mapElement={<div style={{ height: `112%` }} />}
        />

        <button
          className="confirmLocationBTN"
          onClick={() => {
            addressbutton();
          }}
          data-dismiss="modal"
          style={{}}
        >
          Confirm Location
        </button>
      </div>

      <div className="TDAhead1 ">
        <Typeahead
          id="TypeInput"
          className="TDAhead"
          onChange={(test) => {
            setSelected(test);
          }}
          options={options}
          selected={selected}
          placeholder="Enter your delivery location"
          onInputChange={handleInputChange}
        />
      </div>
      <br />
    </>
  );
};

var Lat = localStorage.getItem("lat", Lat);
var Long = localStorage.getItem("lng", Long);
var GetLocationName = localStorage.getItem("TestLocationName", GetLocationName);

let FinalLocationName = null;
//let CountryCode = "PK";
