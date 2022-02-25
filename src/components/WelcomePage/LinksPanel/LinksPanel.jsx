import React from "react";
import "./LinksPanel.css";
import mfLOGO from "./m-foodz.png";

let FrequentlySearched = [
  "Bubble Tea Delivery",
  "Chinese food delivery",
  "Fast Food Delivery",
  "GrabFood Promo",
  "Halal Food Delivery",
  "Japanese delivery",
  "Korean Food Delivery",
  "Pizza Delivery",
];
let PopularCuisines = [
  "Burger king delivery",
  "KFC Delivery",
  "Long John Silver Delivery",
  "Mcdonalds Delivery",
  "Pastamania Delivery",
  "Dominos Pizza Delivery",
  "Pizza Hut Delivery",
  "Subway Delivery",
];
let AboutGrab = ["About MBE", "About MFoodz", "Blog"];
let Support = ["Help", "FAQs", "Be a MFoodz Merchant", "Drive With MRide"];

class LinksPanel extends React.Component {
  componentDidMount() {
    // console.log("Links Panel in mounted 1st time");
  }

  render() {
    // console.log("Links Panel");
    return (
      <>
        <div className="LP__mainFrame">
          <div className="LP__innerBox">
            <div className="innerBox__header">
              <img className="mlogo" src={mfLOGO} />
            </div>
            <div className="innerBox__linksPanel">
              <LinkComp
                header={"Frequently Searched"}
                list={FrequentlySearched}
              />
              <LinkComp header={"Popular Cuisines"} list={PopularCuisines} />
              <LinkComp header={"About Grab"} list={AboutGrab} />
              <LinkComp header={"Support"} list={Support} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LinksPanel;

class LinkComp extends React.Component {
  render() {
    return (
      <div className="linkFrame">
        <p className="linkHeader">{this.props.header}</p>

        {this.props.list.map((i, index) => {
          return (
            <a key={index} className="linkName">
              {i}
            </a>
          );
        })}
      </div>
    );
  }
}
