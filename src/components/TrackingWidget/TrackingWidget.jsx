import React, { useState, useEffect } from "react";
import "./TrackingWidget.css";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";
import forkandknife from "./forkandknife.png";
import { Link } from "react-router-dom";
import { GetFoodOrderHistoryforCustomer } from "../AllApi";
import ScrollContainer from "react-indiana-drag-scroll";
import { currentOrderStatusFalse, currentOrderStatusTrue } from "../../actions";
import { updatedStore } from "../..";
import $ from "jquery";

let origin = window.location.pathname;
let mainPageStyle = true ? origin == "/" : false;
// mainPageStyle = true ? $(window).width() > 600 : false;
// let mainPageStyle = false;

const TrackingWidget = () => {
  let cusID = localStorage.getItem("UserId");
  cusID = JSON.parse(cusID);
  const [activeorders, setActiveOrders] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("UserStatus") === "true") {
      if (cusID == null) {
        cusID = 0;
      }
      var url = `${GetFoodOrderHistoryforCustomer}?CustId=${cusID}&Category=1`;
      if (cusID != null || undefined) {
        (async () => {
          const response = await fetch(url);
          // alert(JSON.stringify(response))

          if (response != "null") {
            try {
              const jresponse = await response.json();
              var finalData = await JSON.parse(jresponse.Result.Data);
            } catch (jresponse) {}

            if (finalData != null) {
              const orderid = finalData.Orders[0];

              if (orderid != null) {
                if (
                  finalData.Orders[0].ActiveOrders != null &&
                  finalData.Orders[0].ActiveOrders != "undefined"
                ) {
                  setActiveOrders(finalData.Orders[0].ActiveOrders);

                  updatedStore.dispatch(currentOrderStatusTrue());
                } else {
                  updatedStore.dispatch(currentOrderStatusFalse());
                }
              }
            }
          }
        })().catch((error) => {
          // console.log(error);
        });
      }
    }
  }, [activeorders.OrderNo]);

  return (
    <ScrollContainer
      horizontal={true}
      style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}
    >
      {/* <div className="scrollbox" style={{ display: 'flex', flexDirection: 'row', padding: '10px', fontFamily: "Poppins-Regular" }}> */}

      {activeorders.length > 0
        ? activeorders.map((val) => {
            return (
              <WidgetBox
                key={val.OrderNo}
                foodstatus={
                  "Prepareing your food. Your rider will pick it up once it's ready."
                }
                itemname={val.StoreName}
                orderNumber={val.OrderNo}
                deliverytime={"30-40 MIN "}
                restid={val.OrderId}
                shoplat={val.PickupLat}
                shoplong={val.PickupLong}
                droplat={val.DropoffLat}
                droplong={val.DropoffLong}
              />
            );
          })
        : null}

      {/* </div > */}
    </ScrollContainer>
  );
};

export default TrackingWidget;

const WidgetBox = (props) => {
  return (
    <Link
      to={`/OrderTracking/${props.restid}/${props.shoplat}/${props.shoplong}/${props.droplat}/${props.droplong}`}
    >
      <div
        key={props.key}
        className="twidget"
        style={
          mainPageStyle
            ? {
                width: "240px",
                height: "140px",
                marginBottom: "40px",
              }
            : null
        }
      >
        <div
          style={
            mainPageStyle
              ? {
                  display: "block",
                }
              : null
          }
          className="restname"
        >
          <p style={{ fontWeight: "600", color: "black", fontSize: "11px" }}>
            {props.foodstatus}
          </p>
        </div>

        <BarLoader css={override1} color={"#f26c2a"} speedMultiplier={0.5} />

        <div className=" orderitem">
          <img
            style={{
              width: "15px",
              height: "25px",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
            src={forkandknife}
          />

          <p
            style={{
              height: "25px",
              flex: "9",
              color: "#f26c2a",
              fontWeight: "600",
              fontSize: "12px",
              paddingTop: "3px",
              paddingLeft: "5px",
            }}
          >
            Order No:
            <span style={{ color: "black" }}> {props.orderNumber}</span>
          </p>

          <span
            className="est-time"
            style={
              mainPageStyle
                ? {
                    width: "50px",
                    height: "56px",
                    paddingTop: "6px",
                    paddingLeft: "2px",
                    textAlign: "center",
                    bottom: "0",
                  }
                : null
            }
          >
            <p style={{ color: "white" }}> {props.deliverytime} </p>{" "}
          </span>
        </div>
      </div>
    </Link>
  );
};

const override1 = css`
  flex: none;
  width: 100%;
  position: relative;
  bottom: 0px;
  background-color: white;
`;
