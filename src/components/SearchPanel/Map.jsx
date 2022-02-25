import React, { useRef, useState } from "react";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
var tt1 = null;
var tt = null;
function Map() {
  const [center, setCenter] = useState({ lat: 24.8607, lng: 67.0011 });
  const refMap = useRef(null);
  tt1 = localStorage.getItem("lat");
  tt = localStorage.getItem("lng");

  // console.log(tt1);
  // console.log(tt);
  const handleBoundsChanged = () => {
    const mapCenter = refMap.current.getCenter();
    setCenter(mapCenter);

    var makerLatlng = {};
    makerLatlng = JSON.stringify(mapCenter);

    document.getElementById("latLngHidden").value = makerLatlng;
  };

  return (
    <GoogleMap
      ref={refMap}
      defaultZoom={13}
      defaultCenter={{ lat: parseFloat(tt1), lng: parseFloat(tt) }}
      onBoundsChanged={handleBoundsChanged}
      options={{
        disableDefaultUI: true,
      }}
    >
      <Marker position={center} />
    </GoogleMap>
  );
}

export default withScriptjs(withGoogleMap(Map));
