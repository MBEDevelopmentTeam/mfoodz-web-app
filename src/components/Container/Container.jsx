import React from "react";
import { Contact } from "../Website/contact";
import "./Container.css";

export function Container(props) {
  return <div className="container-fluid" id='MainPageContainer'>
    {props.children}
    </div>;
}
 