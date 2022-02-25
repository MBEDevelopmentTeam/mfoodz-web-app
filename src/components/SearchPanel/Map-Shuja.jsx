import React, { useRef, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

function Map() {
  const [center, setCenter] = useState({ lat: 24.8607, lng: 67.0011 });
  const refMap = useRef(null);
  //alert(setCenter.lat);
  //console.log(center.lng);
  //const pos= center.lat+","+center.lng;
  //console.log(pos);
  //geocodePosition(center);
  //const markers = refMap.getPosition();
  const handleBoundsChanged = () => {
    const mapCenter = refMap.current.getCenter();
    // const markers = mapCenter.current.getPosition();

    //get map center
    setCenter(mapCenter);

    //console.log(JSON.stringify(mapCenter))
    //console(mapCenter.getPosition().lat());
    //console.log(markers);
    var makerLatlng = {};
    makerLatlng = JSON.stringify(mapCenter);

    geocodePosition(makerLatlng);
  };

  return (
    <GoogleMap
      ref={refMap}
      defaultZoom={13}
      defaultCenter={{ lat: 24.8607, lng: 67.0011 }}
      onBoundsChanged={handleBoundsChanged}
    >
      <Marker position={center} />
    </GoogleMap>
  );
}

function geocodePosition(makerLatlng) {
  //lat : parseFloat( value.lat ),
  //lng : parseFloat( value.lng )
  //alert(center.lat);
  console.log(makerLatlng);

  if (makerLatlng.length > 0) {
    var latlng = makerLatlng.split(",");
    // console.log(latlng[0]);
    var lat = latlng[0].split(":");
    var lng = latlng[1].split(":");
    //console.log(lat[1]);
    //console.log(lng[1]);
  }
  var geocoder = new window.google.maps.Geocoder();
  geocoder.geocode(
    {
      latLng: {
        lat: parseFloat(lat[1]),
        lng: parseFloat(lng[1]),
      },
    },

    function(responses) {
      // alert(responses);
      //console.log(responses);

      if (responses && responses.length > 0) {
        //alert(responses[0].formatted_address);
        //localStorage.setItem("Address", responses[0].formatted_address);
        //console.log(responses[0].formatted_address);
        document.getElementById("result").value =
          responses[0].formatted_address;
        document.getElementById("mainaddress").value =
          responses[0].formatted_address;
        // this.props.history.push({
        //   pathname: '/SearchPanel',
        //   data: responses[0].formatted_address // your data array of objects
        // })
        // this.history.push({
        //   pathname: "/SearchPanel",
        //   state: { message: responses[0].formatted_address },
        // });
      } else {
        console.log(responses);
        //alert("failed");
        //updateMarkerAddress('Cannot determine address at this location.');
      }
    }
  );
  // return(
  //   <>
  //       <Link
  //           to={{
  //             pathname: "/SearchPanel",
  //             state: responses[0].formatted_address // your data array of objects
  //           }}

  //       ></Link>
  //   </>
  // );
}

export default withScriptjs(withGoogleMap(Map));
