import React, { useEffect, useState } from "react";
// import { Loader } from "../Loader/Loader";
import { FoodOrderHistory } from "../AllApi";
import "./OrderHistory.css";

let CustId = localStorage.getItem("UserId");

export function ActiveOrdersComponent(props) {
  const [ActiveOrdersData, setActiveOrdersData] = useState([]);
  var OrderHistoryURL = `${FoodOrderHistory}?CustId=${CustId}&Category=1`;

  useEffect(() => {
    if (localStorage.getItem("UserStatus") === "true") {
      (async () => {
        const FetchOrdersHisory = await fetch(OrderHistoryURL);
        const LoadOrdersHisory = await FetchOrdersHisory.json();

        return fetch(`${OrderHistoryURL}`)
          .then((OrderHistory) => OrderHistory.json())
          .then((Response) => {
            var OrderResponse = JSON.parse(Response.Result.Response);
            var OrderHistoryRecord = JSON.parse(Response.Result.Data);
            const OrdersHistoryArray = [];
            const ActiveOrderArray = []; //All Orders List

            var OrderObject = OrderHistoryRecord.Orders[0];
            OrdersHistoryArray.push(OrderObject); //Active Order List
            var ActiveOrderList = OrderObject.ActiveOrders;
            // console.log(ActiveOrderList);
            ActiveOrderArray.push(ActiveOrderList);
            setActiveOrdersData(ActiveOrderList);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })();
    }
  });

  return (
    <>
      {typeof ActiveOrdersData != undefined && ActiveOrdersData.length > 0 ? (
        ActiveOrdersData.map((ActiveOrders) => {
          return (
            <div className="orderBoxPanel">
              <div className="orderBox1">
                <p style={{ color: "black" }}>{ActiveOrders.StoreName}</p>
                <ul id="ulActiveOrders">
                  <li>
                    Delivered by
                    <span
                      style={{
                        fontWeight: "700",
                        fontSize: "13px",
                        textTransform: "capitalize",
                      }}
                    >
                      {" " + ActiveOrders.StoreName}
                    </span>
                  </li>
                  <li>{ActiveOrders.OrderDate}</li>
                  <li>{ActiveOrders.OrderNo}</li>
                  {typeof ActiveOrders.OrderDetail != "undefined" &&
                  ActiveOrders.OrderDetail.length > 0
                    ? ActiveOrders.OrderDetail.map((val) => {
                        return (
                          <>
                            <li>{val.Items}</li>
                          </>
                        );
                      })
                    : null}
                </ul>
              </div>

              <div className="orderBox2">
                <p style={{ fontSize: "16px", fontWeight: "300" }}>
                  {ActiveOrders.Currency} {ActiveOrders.TotalBill}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <>
          {/* <Loader /> */}

          {ActiveOrdersData.length > 0 ? (
            <h4 style={{ color: "gray" }}>Loading...</h4>
          ) : (
            <p style={{ fontSize: "16px" }}>You have no active orders.</p>
          )}
        </>
      )}
    </>
  );
}

export function PastOrdersComponent(props) {
  const [PastOrdersData, setPastOrdersData] = useState([]);
  var OrderHistoryURL = `${FoodOrderHistory}?CustId=${CustId}&Category=2`;
  useEffect(() => {
    (async () => {
      const FetchPastOrdersHisory = await fetch(OrderHistoryURL);
      const LoadPastOrdersHisory = await FetchPastOrdersHisory.json();
      return fetch(`${OrderHistoryURL}`)
        .then((PastOrderHistory) => PastOrderHistory.json())
        .then((Response) => {
          var PastOrderResponse = JSON.parse(Response.Result.Response);
          var PastOrderHistoryRecord = JSON.parse(Response.Result.Data);
          const PastOrdersHistoryArray = [];
          const PastOrderArray = []; //All Orders List

          var PastOrderObject = PastOrderHistoryRecord.Orders[0];
          PastOrdersHistoryArray.push(PastOrderObject); //Active Past Order List

          var PastOrderList = PastOrderObject.PastOrders;
          PastOrderArray.push(PastOrderList);
          setPastOrdersData(PastOrderList);
        })
        .catch((err) => {
          console.log(err.message);
        });
    })();
  }, []);
  return (
    <>
      {typeof PastOrdersData != "undefined" && PastOrdersData.length > 0 ? (
        PastOrdersData.map((PastOrders) => {
          return (
            <div className="orderBoxPanel">
              <div className="orderBox1">
                <p>{PastOrders.StoreName}</p>
                <ul id="ulActiveOrders">
                  <li>
                    Delivered by
                    <span
                      style={{
                        fontWeight: "700",
                        fontSize: "13px",
                        textTransform: "capitalize",
                      }}
                    >
                      {" " + PastOrders.StoreName}
                    </span>
                  </li>
                  <li>{PastOrders.OrderDate}</li>
                  <li>{PastOrders.OrderNo}</li>
                  {typeof PastOrders.OrderDetail != "undefined" &&
                  PastOrders.OrderDetail.length > 0
                    ? PastOrders.OrderDetail.map((val) => {
                        return (
                          <>
                            <li>{val.Items}</li>
                          </>
                        );
                      })
                    : null}
                </ul>
              </div>
              <div className="orderBox2">
                <p style={{ fontSize: "16px", fontWeight: "300" }}>
                  {PastOrders.Currency} {PastOrders.TotalBill}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <p style={{ fontSize: "16px" }}>You have no past orders.</p>
        // <Loader />
      )}
    </>
  );
}

function OrderHistory() {
  return (
    <div className="mainframe">
      <div className="activeorders">
        <p style={{ color: "#F26C2A" }}> Active Orders </p>

        <ActiveOrdersComponent />
      </div>

      <div className="pastorders">
        <p style={{ color: "#F26C2A" }}> Past Orders </p>

        <PastOrdersComponent />
      </div>
    </div>
  );
}

export default OrderHistory;
