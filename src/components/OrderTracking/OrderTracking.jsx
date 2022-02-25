import "./OrderTracking.css";

import React, { useState, useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";
import messageicon from "./messageicon.png";
import { useParams } from "react-router-dom";
import { Scrollbars } from "rc-scrollbars";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import {
  chatIconStatus,
  chatNumberADD,
  chatNumberNULL,
  headerPathFalse,
  headerPathTrue,
  emptycart,
  finalOrderQueueFalse,
} from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import custAddress from "./custAddress.png";
import restAddress from "./restAddress.png";
import riderLocation from "./riderLocation.jpg";
// import { getDistance, getPreciseDistance } from "geolib";
import {
  GetFoodOrderHistoryforCustomer,
  GettingOrderStatus,
  GoogleKey,
} from "../AllApi";
import logo from "../../img/MLogo.png";

import ChatPopUp from "../Chat_PopUp/ChatPopUp";
import { updatedStore } from "../../index";
function OrderTracking(props) {
  const dispatch = useDispatch();

  dispatch(headerPathFalse());
  dispatch(finalOrderQueueFalse());
  const params = useParams();
  const cusID = localStorage.getItem("UserId");
  const orderID = params.id;
  const shoplat = params.shoplat;
  const shoplong = params.shoplong;
  const droplat = params.droplat;
  const droplong = params.droplong;

  const orderActiveURL = `${GetFoodOrderHistoryforCustomer}?CustId=${cusID}&Category=1`;

  const orderHistoryURL = `${GetFoodOrderHistoryforCustomer}?CustId=${cusID}&Category=2`;

  const driverStatusURL = `${GettingOrderStatus}?OrderId=${orderID}`;

  let arrstoreName = null;

  const [orderStatus, setOrderStatus] = useState();
  const [storeName, setStoreName] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [driverLat, setDriverLat] = useState();
  const [driverLong, setDriverLong] = useState();
  const [OrderStatusName, setOrderStatusName] = useState("");
  const [cameraLat, setCameraLat] = useState();
  const [cameraLong, setCameraLong] = useState();
  const [OrderNo, setOrderNo] = useState("");
  // const [chatStatus, setChatStatus] = useState(true);
  // const [markerPosition, setmarkerPosition] = useState("");
  const chatStatusIcon = useSelector((state) => state.chatIconStatus);
  const chatNumber = useSelector((state) => state.chatNumber);
  // console.log(chatNumber);
  let Aorderid = [];
  function runApi() {
    (async () => {
      // ActiveOrdersAPI
      const aresponse = await fetch(orderActiveURL);
      const ajresponse = await aresponse.json();
      var ActiveOrdersFinalData = await JSON.parse(ajresponse.Result.Data);
      Aorderid = ActiveOrdersFinalData.Orders[0].ActiveOrders;

      // HistoryOrdersAPI
      const hresponse = await fetch(orderHistoryURL);
      const hjresponse = await hresponse.json();
      var HistoryOrdersFinalData = await JSON.parse(hjresponse.Result.Data);
      const Horderid = HistoryOrdersFinalData.Orders[0].PastOrders;

      const driverResponse = await fetch(driverStatusURL);
      const newDriverResponse = await driverResponse.json();
      let driverData = await JSON.parse(newDriverResponse.Result.Data);

      let driverID = driverData.OrderStatus[0].DriverDetail[0].Id;
      let rideID = driverData.OrderStatus[0].DriverDetail[0].RideID;

      localStorage.setItem("driverID", driverID);
      localStorage.setItem("rideID", rideID);

      if (Aorderid != undefined) {
        for (let i = 0; i < Aorderid.length; i++) {
          if (Aorderid[i].OrderId == orderID) {
            arrstoreName = Aorderid[i].StoreName;

            setStoreName(Aorderid[i].StoreName);
            setOrderNo(Aorderid[i].OrderNo);

            var OrderStatusName = Aorderid[i].OrderStatus;
            setOrderStatusName(OrderStatusName);

            var oid = Aorderid[i].OrderStatusId;
            setOrderStatus(oid);
            setOrderItems(Aorderid[i].OrderDetail);
          }
        }
      } else {
        for (let i = 0; i < Horderid.length; i++) {
          if (Horderid[i].OrderId == orderID) {
            arrstoreName = Horderid[i].StoreName;

            setStoreName(Horderid[i].StoreName);
            setOrderNo(Horderid[i].OrderNo);

            var OrderStatusName = Horderid[i].OrderStatus;
            setOrderStatusName(OrderStatusName);

            var oid = Horderid[i].OrderStatusId;
            setOrderStatus(oid);
            setOrderItems(Horderid[i].OrderDetail);
          }
        }
      }

      setTimeout(() => {
        setCameraLat((parseFloat(shoplat) + parseFloat(droplat)) / 2);
        setCameraLong((parseFloat(shoplong) + parseFloat(droplong)) / 2);
        // console.log(cameraLat);
      }, 3000);

      setDriverLat(driverData.OrderStatus[0].DriverDetail[0].Latitude);
      setDriverLong(driverData.OrderStatus[0].DriverDetail[0].Longitude);
      setOrderStatusName(driverData.OrderStatus[0].Status);
    })();
  }

  // CheckSocketConnection();
  // connectUser();

  useEffect(() => {
    runApi();
    if (cusID != null || undefined) {
      setInterval(() => {
        runApi();
      }, 2500);
    }
  }, [cameraLong]);

  if (OrderStatusName === "Complete") {
    setTimeout(() => {
      window.location.href = "/main";
    }, 5000);
  }
  return (
    <>
      <ChatPopUp />

      <div className="mapcontainer" style={{ width: "100%", height: "360px" }}>
        <MapWithAMarker
          googleMapURL={GoogleKey}
          loadingElement={<div style={{ height: `200%` }} />}
          containerElement={<div style={{ height: `230px` }} />}
          mapElement={<div style={{ height: `140%` }} />}
          shoplat={shoplat}
          shoplong={shoplong}
          droplat={droplat}
          droplong={droplong}
          driverlat={driverLat}
          driverlong={driverLong}
          cameralat={cameraLat}
          cameralong={cameraLong}
        />
      </div>

      <div className="orderTracking__displayPanel">
        <div className="trackingPanelFrame">
          <div className="trackPanel1">
            <div className="finalOrderList">
              <p className="orderDetailsTag">Order Details</p>
              <p className="storename">
                Your order from:
                <strong style={{ color: "#F26C2A" }}>{` ${storeName}`}</strong>
              </p>

              <Scrollbars>
                {orderItems.map((item) => {
                  return (
                    <ul className="listul" key={item.OrderId}>
                      <li className="listli1">{`${item.Quantity}`}&times;</li>

                      <li className="listli2">{item.Name}</li>
                    </ul>
                  );
                })}
              </Scrollbars>
            </div>
          </div>

          <div className="trackPanel2">
            <div className="trackPanel2-1">
              <span>
                <OrderStatusBox OrderStatusName={OrderStatusName} />
                <p>Order-No: {OrderNo}</p>
              </span>
              <span>
                {orderStatus == 3 ? (
                  <span style={{ position: "absolute", top: "0", right: "0" }}>
                    {chatStatusIcon == false ? (
                      <>
                        {chatNumber > 0 ? (
                          <div className="chatNumber">{chatNumber}</div>
                        ) : null}
                      </>
                    ) : null}

                    <span
                      className="messageIcon"
                      onClick={() => (
                        dispatch(chatIconStatus()), dispatch(chatNumberNULL())
                      )}
                    >
                      <img
                        style={{
                          width: "50px",
                          marginTop: "3px",
                        }}
                        src={messageicon}
                      />
                    </span>
                  </span>
                ) : null}
              </span>
            </div>

            {/********************** chat support panel is below ***********************/}

            <div className="trackPanel2-2">
              <h2 className="NS" style={{ fontWeight: "600" }}>
                NEED SUPPORT?
              </h2>

              <h3 className="QRO">
                Questions regarding your order?
                <br /> Reach out to us.
              </h3>

              <button className="btnContact"> (+1)855556-7433</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default OrderTracking;

const override = css`
  position: relative;
  width: 192px;
  left: 64px;
  background-color: white;
`;

export const OrderStatusBox = (props) => {
  return (
    <>
      <p
        style={{
          margin: "0px",
          flex: "1",
          textAlign: "center",
          fontSize: "17px",
          color: "#f26c2a",
        }}
      >
        Your Order's Status
        <br />
        <p
          style={{
            margin: "0px",
            fontSize: "18px",
            color: "black",
            textTransform: "uppercase",
          }}
        >
          {props.OrderStatusName}
        </p>
      </p>
      <BarLoader
        className="barloader"
        css={override}
        color={"#f26c2a"}
        speedMultiplier={0.5}
      />
    </>
  );
};

const waterStyle = [
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#4BB4F5",
      },
    ],
  },
];

export const MapWithAMarker = withScriptjs(
  withGoogleMap((props) => (
    <>
      <GoogleMap
        defaultZoom={12}
        defaultCenter={
          typeof props.cameralat != "undefined"
            ? { lat: props.cameralat, lng: props.cameralong }
            : null
        }
        center={
          typeof props.cameralat != "undefined"
            ? { lat: props.cameralat, lng: props.cameralong }
            : null
        }
        options={{
          disableDefaultUI: true,
          scrollwheel: true,
          // draggable: false,
        }}
      >
        <Marker
          position={{
            lat: parseFloat(props.shoplat),
            lng: parseFloat(props.shoplong),
          }}
          icon={{
            url: restAddress,
          }}
        />

        <Marker
          position={{
            lat: parseFloat(props.droplat),
            lng: parseFloat(props.droplong),
          }}
          icon={{
            url: custAddress,
          }}
        />

        <Marker
          position={{
            lat: parseFloat(props.driverlat),
            lng: parseFloat(props.driverlong),
          }}
          icon={{
            url: riderLocation,
          }}
        />
      </GoogleMap>
    </>
  ))
);
