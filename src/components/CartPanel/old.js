import "./CartPanel.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCartPanel, closeCartPanel } from "../../actions";
import { useCart } from "react-use-cart";

let Name = "";
let Quantity = 0;
let Price = 0;
let Menuid = null;
let TotalBIll = 0;


let OrderDetailJson = [];


const CartPanel = (props) => {
  var StoredMenuRecord = JSON.parse(localStorage.getItem("CartArray1")); //get them back
  var shopid = localStorage.getItem("shopid");
  var userdID = localStorage.getItem("UserId");
  var gst = localStorage.getItem("gst");
  var deliveryfee = localStorage.getItem("deliveryfee");
  var PickupLat = localStorage.getItem("lat");
  var PickupLong = localStorage.getItem("lng");

  // alert(userdID)

  StoredMenuRecord.map((val) => {
    Menuid = val.MenuId;
    Name = val.Name;
    Quantity = val.Quantity;
    Price = val.Price;
    TotalBIll = Quantity * Price;
  });

  StoredMenuRecord.map((val) => {
    //alert(JSON.stringify(val));
    OrderDetailJson.push({
      MenuId: val.MenuId,
      Name: val.Name,
      Quantity: val.Quantity,
      Price: val.Price,
    });
    //alert(JSON.stringify(OrderDetailJson))
  });

  const dispatch = useDispatch();
  const cartPanelWidth = useSelector((state) => state.cartpanel);

  return (
    <>
      <div
        // style={{ width: cartPanelWidth }}
        style={{ width: "300px" }}
        className="cartpanel"
        id="cartpanel01"
      >
        <div className="cart1">
          <a
            onClick={() => dispatch(closeCartPanel())}
            className="cartclosebtn"
          >
            {" "}
            &times;
          </a>
          {/* <p className='yourcart'>Your Cart</p> */}
        </div>















        <div className="cart2">
          <p
            style={{
              color: "black",
              fontWeight: "500",
              fontSize: "15px",
              paddingLeft: "3%",
            }}
          >
            Your Order
          </p>
          <p
            style={{
              color: "#f26c2a",
              fontWeight: "600",
              fontSize: "15px",
              paddingLeft: "3%",
            }}
          >
            Restaurant Name
          </p>

          <div
            className="checkouttotal"
            onClick={() => window.open(`/Deliverypanel?CusId=${userdID}&ShopId=${shopid}&OrderDetailJson=${OrderDetailJson}&PaymentTypeId=1&TotalBill=${TotalBIll}&GST=${gst}&DeliveryFee=${deliveryfee}&PickupLat=${PickupLat}&PickupLong=${PickupLong}&DropoffLat=24.8059173&DropoffLong=67.0268045&PickupAddr=korangi&DropoffAddr=johar`, "_blank")}
          >
            <h4
              style={{ color: "white", fontWeight: "600" }}
              className="checkout1"
            >
              Checkout
            </h4>
            <h4
              style={{ color: "white", fontWeight: "600" }}
              className="checkout2"
            >
              {TotalBIll}
            </h4>
          </div>
        </div>




        <div className="cart3">
          <ul className="orderbox">
            <li
              style={{
                paddingTop: "12px",
                paddingLeft: "2px",
                flex: "1",
                color: "black",
              }}
            >
              {Quantity} &times;
            </li>
            <ul
              style={{
                padding: "2px",
                flex: "6",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <li style={{ flex: "2" }}> {Name} </li>
              {/* <li style={{ fontSize: '10px', flex: '1', color: 'black' }}>Over Hard . Brown Bread</li> */}
              <li style={{ flex: "1", color: "#f26c2a", cursor: "pointer" }}>
                Remove
              </li>
            </ul>
            <li
              style={{
                paddingTop: "12px",
                paddingLeft: "2px",
                fontSize: "10px",
                flex: "1",
                color: "black",
                fontWeight: "550",
              }}
            >
              {TotalBIll}
            </li>
          </ul>
        </div>



















      </div>
    </>
  );
};
export default CartPanel;
