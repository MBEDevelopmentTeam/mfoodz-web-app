import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./SearchPanel.css";
import {
  Button,
  ButtonToolbar,
  Modal,
  Popover,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import WrappedMap from "./Map";
import Autocomplete from "./Autocomplete";
import AsyncPaginationExample from "./AsyncPaginationExample";
import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { addressModalShow, addressModalHide } from "../../actions";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RiSearch2Line } from 'react-icons/ri';


var Lat = localStorage.getItem("lat", Lat);
var Long = localStorage.getItem("lng", Long);
var GetLocationName = localStorage.getItem("TestLocationName", GetLocationName);

export function SearchPanel(props) {
  const addressmodal = useSelector((state) => state.addressmodal);
  const dispatch = useDispatch();
  return (
    <>
      <div className="sp_location">
        <span

          className="addressIcon"
          onClick={() => dispatch(addressModalShow())}
        >
          <FaMapMarkerAlt />
        </span>
        <input
          id="mainaddress"
          type="text"
          className="sp_location_ph"
          placeholder="Enter your Location"
          value={GetLocationName}
        />
      </div>
      <div className="spacer">

      </div>
      <span>
        <i className="fa fa-search fa-lg bbgg"></i>
      </span>
      <div className="sp_search">
        <AsyncPaginationExample />
      </div>
    </>
  );
}
