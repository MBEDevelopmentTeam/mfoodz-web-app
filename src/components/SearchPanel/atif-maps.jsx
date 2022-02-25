
import React, { useRef, useState } from "react";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";



function Map() {


  const [center, setCenter] = useState({ lat: 24.8607, lng: 67.0011 });
  const refMap = useRef(null);

  const handleBoundsChanged = () => {
    const mapCenter = refMap.current.getCenter();

    setCenter(mapCenter);

    var makerLatlng = {};
    makerLatlng = JSON.stringify(mapCenter);


    document.getElementById('latLngHidden').value = makerLatlng;

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

export default withScriptjs(withGoogleMap(Map));
