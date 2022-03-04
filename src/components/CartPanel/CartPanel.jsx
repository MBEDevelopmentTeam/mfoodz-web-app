import "./CartPanel.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addtocart,
  deletefromcart,
  emptycart,
  openCartPanel,
  finalOrderQueueFalse,
  finalAddressTrue,
  finalOrderQueueTrue,
} from "../../actions";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Scrollbars } from "rc-scrollbars";
import { Link } from "react-router-dom";
import { CartIcon } from "../Header/Header";
import { OrderDetail } from "../Deliverypanel/Deliverypanel";
import { updatedStore } from "../../index";

let Name = "";
let Quantity = 0;
let Price = 0;
let Menuid = null;
let TotalBIll = 0;
let Count = 0;
let OrderDetailJson = [];
let DisplayOrderList = [];
let shopid = 0;
let NewCountryCode;

function useForceUpdate() {
  const [value, setValue] = useState(0);
  // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

const CartPanel = (props) => {
  const [disable, setDisable] = useState(true);

  let dispatch = useDispatch();
  const forceUpdate = useForceUpdate();

  var StoredMenuRecord = null;
  StoredMenuRecord = props.MenuRecord; //get them back

  OrderDetail(StoredMenuRecord);
  var userdID = localStorage.getItem("UserId");
  var gst = localStorage.getItem("gst");
  var deliveryfee = localStorage.getItem("deliveryfee");
  var PickupLat = localStorage.getItem("lat");
  var PickupLong = localStorage.getItem("lng");
  var SName = props.ResID;
  var Count = 0;
  NewCountryCode = localStorage.getItem("NewCountryCode");

  if (NewCountryCode == 1) {
    NewCountryCode = "CDN";
  } else if (NewCountryCode == 92) {
    NewCountryCode = "PKR";
  } else {
  }
  DisplayOrderList = StoredMenuRecord;
  if (StoredMenuRecord != null) {
    TotalBIll = 0;
    StoredMenuRecord.map((val) => {
      Menuid = val.MenuId;
      Name = val.Name;
      Quantity = val.Quantity;
      Price = val.Price;
      TotalBIll = TotalBIll + Quantity * Price;
    });
  } else {
    TotalBIll = 0;

    dispatch(emptycart());
  }

  useEffect(() => {
    if (TotalBIll == 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [TotalBIll]);

  const cartPanelWidth = useSelector((state) => state.cartpanel);

  const windowwidth = useSelector((state) => state.windowwidth);

  const cartNumber = useSelector((state) => state.cartnumber);

  function updateOrderQueue() {
    updatedStore.dispatch(finalOrderQueueTrue());
    // console.log("finalOrderQueueTrue");
  }
  let subPrice = 0;
  return (
    <>
      <div
        style={{ width: cartPanelWidth }}
        className="cartpanel"
        id="cartpanel01"
      >
        <div className="cartPanel_innerBox">
          <div className="cart1">
            <div className="cart1_inner1">
              <a
                onClick={() => dispatch(openCartPanel("0px"))}
                className="cartclosebtn"
              >
                &times;
              </a>
            </div>

            <div className="cart1_inner2">
              {/* {cartNumber > 0 ? <CartIcon /> : null} */}
            </div>
          </div>

          <div className="cart2">
            <p
              style={{
                color: "black",
                fontSize: "25px",
                paddingLeft: "3%",
                textAlign: "center",
                fontFamily: "Poppins-Regular",
              }}
            >
              Your cart
            </p>
            <p
              style={{
                fontSize: "13px",
                textAlign: "center",
                color: "black",
                fontFamily: "Poppins-Regular",
              }}
            >
              Start Adding Items to Your Cart
            </p>
            <p
              style={{
                textAlign: "center",
                color: "#f26c2a",
                fontSize: "20px",
                paddingLeft: "3%",
                fontFamily: "Poppins-Regular",
                textTransform: "capitalize",
              }}
            >
              {SName}
            </p>
          </div>

          <div className="cart3">
            <Scrollbars style={{ height: 200 }}>
              {DisplayOrderList != null
                ? DisplayOrderList.map((val) => (
                    <>
                      {window.console.log("val.submenu", val.submenu)}
                      <ul style={{}} className="orderBox">
                        <ul className="orderBox_inner1">
                          <li
                            style={{
                              flex: "3",
                              textTransform: "capitalize",
                              fontSize: "18px",
                              color: "black",
                              marginLeft: "10px",
                              fontFamily: "Poppins-Regular",
                            }}
                          >
                            {val.Name}
                          </li>

                          {val.submenu != undefined ? (
                            <ul className="subMenu__listItems">
                              {val.submenu.map((list) => {
                                return (
                                  <span className="subMenu__listItems-childs">
                                    <li className="listItems-childOne">
                                      {"+" + " " + list.itemName}
                                    </li>
                                    {/* <li className="listItems-childTwo">{list.itemPrice}</li> */}
                                  </span>
                                );
                              })}
                            </ul>
                          ) : null}
                        </ul>

                        <ul className="orderBox_inner2">
                          <li
                            style={{ marginBottom: "10px" }}
                            className="itemTotalPriceLink"
                          >
                            {NewCountryCode}. {val.Quantity * val.Price}
                          </li>

                          <ul className="addRemoveItembtn">
                            <li
                              className="addRemoveItembtn_one"
                              onClick={() => {
                                fn_RemoveItem(val);
                                forceUpdate();
                                dispatch(deletefromcart());
                              }}
                            >
                              {val.Quantity <= 1 ? (
                                <RiDeleteBin6Line />
                              ) : (
                                <li className="addRemoveItembtn_one">
                                  &#8722;
                                </li>
                              )}
                            </li>

                            <li className="addRemoveItembtn_two">
                              {val.Quantity}
                            </li>

                            <li
                              className="addRemoveItembtn_three"
                              onClick={() => {
                                fn_AddItem(val);
                                forceUpdate();
                                dispatch(addtocart());
                              }}
                            >
                              &#x2B;
                            </li>
                          </ul>
                        </ul>
                      </ul>
                    </>
                  ))
                : null}
            </Scrollbars>
            {/* {(submenuitemprices = 0)} */}
            <Link
              to={
                TotalBIll > 0
                  ? localStorage.getItem("UserStatus") === "true"
                    ? `/Deliverypanel`
                    : `/login`
                  : null
              }
            >
              <button
                className="buttona"
                onClick={() => {
                  updateOrderQueue();
                }}
                type="button"
                disabled={disable}
                data-testid="cart-summary-checkout-button"
                data-vendor-code="s2lw"
              >
                Checkout - {NewCountryCode}. {TotalBIll}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

function fn_RemoveItem(id) {
  let MinusBill = 0;
  let Mid = id.MenuId;
  var find = DisplayOrderList.findIndex((x) => x.MenuId == Mid);
  var findQuantity = 0;

  if (find >= 0) {
    findQuantity = DisplayOrderList[find].Quantity;
    var TotalCount = findQuantity - 1;
    TotalBIll = MinusBill;
    DisplayOrderList[find].Quantity = TotalCount;

    if (DisplayOrderList[find].Quantity == 0) {
      DisplayOrderList.splice(find, 1);
    }
  }
}

function fn_AddItem(id) {
  let Mid = id.MenuId;
  var find = DisplayOrderList.findIndex((x) => x.MenuId == Mid);
  var findQuantity = 0;

  if (find >= 0) {
    findQuantity = DisplayOrderList[find].Quantity;
    var TotalCount = findQuantity + 1;
    DisplayOrderList[find].Quantity = TotalCount;

    if (DisplayOrderList[find].Quantity == 0) {
      DisplayOrderList.splice(find, 1);
    }
  }
}

export default CartPanel;
