import React from "react";
import "./MapModal.css";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { addressModalHide } from "../../actions";
import { Alert } from "react-bootstrap";
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);

var Lat = localStorage.getItem("lat", Lat);
var Long = localStorage.getItem("lng", Long);
var GetLocationName = localStorage.getItem("TestLocationName", GetLocationName);
    
  const MapModal = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="mappanel">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h3 style={{ flex: "9", fontWeight: "750", paddingBottom: "5%" }}>
            Is this your exact location?
          </h3>
          <button
            style={{ float: "right", flex: "1" }}
            onClick={() => dispatch(addressModalHide())}
            style={{ color: "#f26c2a" }}
          >
            &#x2715;
          </button>
        </div>
        <TextField
          style={{
            borderRadius: "0",
            marginTop: "0%",
            marginBottom: "2%",
            marginLeft: "1%",
            marginRight: "1%",
            width: "98%",
            flex: "2",
            fontSize:"20px"
          }}
          className="usermobile"
          label="Enter your full address"
          variant="outlined"
          value={GetLocationName}
        />
      </div>

      <div style={{ margin: '5%', height: '65%' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d924244.06270828!2d66.59496949133144!3d25.19214642882869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1621944367276!5m2!1sen!2s"
          style={{ width: "100%", height: "100%" }}
        ></iframe>
        <button className="findResBTN">Find Restaurant</button>
      </div>
    </>
  );
};


export default MapModal;

class SimpleMap extends React.Component {
  static defaultProps = {
    center: {lat: 24.80, lng: 67.02},
    zoom: 10,  };

  render() {
    return (
       <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent 
          lat={24.8059173} 
          lng={67.0268045} 
          text={'Sea view'} 
        />
      </GoogleMapReact>
      
    );
  }
}

