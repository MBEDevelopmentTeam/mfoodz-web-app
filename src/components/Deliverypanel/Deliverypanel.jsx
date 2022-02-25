import "./Deliverypanel.css";

import { TextField, Button } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import React, { useState } from "react";
import master from "./master.png";
import paypal from "./paypal.png";
import visa from "./visa.png";
import {
  finalAddress,
  personalDetails,
  finalAddressFalse,
  finalAddressTrue,
  emptycart,
} from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { notifySuccess, notifyError } from "../Notifications";
import { TDAhead } from "../Website/TDAhead";
import { Link, Redirect } from "react-router-dom";
import {
  GetSavedAndRecentLocations,
  RemoveLocationOfCustomer,
  SaveLocations,
  GetCardInfoOfCustomer,
  SaveCardInfoOfCustomer,
  RemoveCustomerCard,
  confirmfoodorder,
  getallshopswithradius,
} from "../AllApi";
import { updatedStore } from "../..";
import { BorderTop } from "@material-ui/icons";

let OrderDetailJson = [];
let Data = [];

let OrderNoArray = [];
let TestArray = [];
let options = [];

let TB = 0;
let splitPer = 0;
let FinalBill = 0;
let StoredMenuRecord = [];
let FinancialInfo = [];

let LocationInfo = [];
let address = "Asf";
let Shoplat = 0;
let Shoplong = 0;

let CusId;
let shopid;
let SName;
let loading = true;
let CC = localStorage.getItem("CountryCode");
let NewCountryCode;
// let CC = "CA"

var gst = 0;
var Bill = 0;
var deliveryfee = 0;
splitPer = 0;

const encodeFormData = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

let CarIDselected1;
let Droplat1;
let Droplng1;
let PickUpAddress1;

export function OrderDetail(prop) {
  StoredMenuRecord = prop;
  return <>{(prop = StoredMenuRecord)}</>;
}

export function GetFinancialInfo(prop, prop2) {
  FinancialInfo = prop;
  LocationInfo = prop2;

  address = LocationInfo[0][0].Address;
  Shoplat = LocationInfo[0][0].Latitude;
  Shoplong = LocationInfo[0][0].Longitude;
  return <>{((prop = FinancialInfo), (prop2 = LocationInfo))}</>;
}

function Deliverypanel() {
  CusId = localStorage.getItem("UserId");
  shopid = localStorage.getItem("shopid");
  SName = localStorage.getItem("ShopName");
  NewCountryCode = localStorage.getItem("NewCountryCode");
  let customerAddressName = localStorage.getItem("TestLocationName");

  if (NewCountryCode == 1) {
    NewCountryCode = "CDN";
  } else if (NewCountryCode == 92) {
    NewCountryCode = "PKR";
  } else {
  }
  const deliveryAddress = useSelector((state) => state.finaladdress);
  const finalOrderQueue = useSelector((state) => state.finalOrderQueue);
  let pinLocation = JSON.parse(localStorage.getItem("PinLocation"));
  const [pinLoc, setCount] = useState(pinLocation);

  const dispatch = useDispatch();

  const [cashPayment, setCashPayment] = useState(true);
  const [creditPayment, setCreditPayment] = useState(false);
  const [locationStatus, setLocationStatus] = useState(false);
  const [finalOrderStatus, setfinalOrderStatus] = useState(false);
  const [CheckCardStatus, setCheckCardStatus] = useState(false);

  //Delivery Address
  const [RadioSaveLoc, setRadioSaveLoc] = useState(false);
  const [saveloc, setsaveloc] = useState([]);

  //Credit / Debit Card
  const [CardInfo, setCardInfo] = useState([]);
  const [CardName, setCardName] = useState([]);
  const [CardNumber, setCardNumber] = useState([]);
  const [MMYY, setMMYY] = useState([]);
  const [CVV, setCVV] = useState([]);

  const [CarIDselected, setCarIDselected] = useState();

  const [CheckCardInfo, setCheckCardInfo] = useState();

  const [DateToday, setDateToday] = useState();
  var SaveLocationURL = `${GetSavedAndRecentLocations}?CustomerId=${CusId}`;

  var CardInfoOfCustomerURL = `${GetCardInfoOfCustomer}?CustomerId=${CusId}`;
  let lat = null;
  let lng = null;

  useEffect(() => {
    shopid = localStorage.getItem("shopid");
    Bill = 0;
    gst = 0;
    FinalBill = 0;

    FinancialInfo.map((val) => {
      gst = val[0].GST;
      deliveryfee = val[0].DeliveryFee;
    });

    fn_GetCardInfoOfCustomer();
    fn_GetLocations();

    var d = new Date();

    var date = d.getUTCDate();
    var month = d.getUTCMonth() + 1; // Since getUTCMonth() returns month from 0-11 not 1-12
    var year = d.getUTCFullYear();

    var dateStr = date + "/" + month + "/" + year;

    setDateToday(dateStr);
    OrderDetailJson = [];
    StoredMenuRecord.map((val) => {
      OrderDetailJson.push({
        MenuId: val.MenuId,
        Name: val.Name,
        Quantity: val.Quantity,
        Price: val.Price,
      });
      Bill += val.Price * val.Quantity;

      if (gst == 0 || gst == undefined) {
        gst = 0;
      } else {
        splitPer = gst.split(".", 2)[0];
      }

      var per = parseFloat(splitPer); ///////////// GST /////////
      var parseDeliveryFee = parseFloat(deliveryfee);

      if (splitPer != 0) {
        TB = (per * Bill) / 100 + Bill;
        FinalBill = parseFloat(TB + parseDeliveryFee);
      } else {
        TB = Bill;

        FinalBill = parseFloat(TB + parseDeliveryFee);
      }
    });
  }, [LocationParams]);

  //Get Locations
  var LocationResponse = null;
  async function fn_GetLocations() {
    options = [];
    const fetchSelectedLoation = await fetch(SaveLocationURL);
    const LoadSelectedLoation = await fetchSelectedLoation.json();

    return fetch(`${SaveLocationURL}`)
      .then((res) => res.json())
      .then((Response) => {
        LocationResponse = JSON.parse(Response.Result.Response);
        const { Code } = LocationResponse[0];
        if (Code == "00") {
          var AllLoactionObject = JSON.parse(Response.Result.Data);

          const LocationArray = [];
          var LocationList = AllLoactionObject.LocationsList;

          if (LocationList != null) {
            LocationList.map((val) => {
              if (typeof val.LocationCoordinates != "undefined") {
                lat = val.LocationCoordinates.split(",")[0];
                lng = val.LocationCoordinates.split(",")[1];
              }

              if (val.TypeId == 1) {
                const singleRecord = {
                  LocationId: val.LocationId,
                  label: val.LocationPurpose,
                  lat,
                  lng,
                  CountryCode: val.CountryCode,
                  country: "",
                  state: "",
                  city: "",
                };

                options.push(singleRecord);
              }
            });
            setsaveloc(options);
            if (loading) {
              updatedStore.dispatch(finalAddressFalse());
              loading = false;
            }

            // dispatch(finalAddressFalse());
          }
        } else {
          if (loading) {
            updatedStore.dispatch(finalAddressTrue());
            loading = false;
          }
          const EmptyArray = [];
          setsaveloc(EmptyArray);
        }
      });
  }

  //Get Card Info Of Customer
  async function fn_GetCardInfoOfCustomer() {
    const fetchCardInfoOfCustomer = await fetch(CardInfoOfCustomerURL);
    const LoadCardInfoOfCustomer = await fetchCardInfoOfCustomer.json();

    return fetch(`${CardInfoOfCustomerURL}`)
      .then((res) => res.json())
      .then((Response) => {
        var CardInfoOfCustomerResponse = Response.Result;
        var AllCardInfoOfCustomerObject = Response.Result.cardList;
        TestArray = AllCardInfoOfCustomerObject;

        let cardcode = Response.Result.Code;

        if (TestArray.length > 0) {
          setCardInfo(AllCardInfoOfCustomerObject);
          setCheckCardInfo(true);
        } else if (TestArray.length == 0) {
          setCheckCardInfo(false);
        }
      });
  }

  function fn_SaveCardInfoOfCustomer() {
    const SaveCardInfo = {
      CustomerId: CusId,
      CardNumber: CardNumber,
      ExpiryDate: MMYY,
      CVV: CVV,
      CardType: "master",
      CardHolderName: CardName,
    };

    const body = encodeFormData(SaveCardInfo);

    fetch(`${SaveCardInfoOfCustomer}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    })
      .then((response) => response.json())
      .then(async (json) => {
        var responseJson = json.Result;
        var Code1 = responseJson.Code;
        var Message = responseJson.Message;
        if (Code1 == "00") {
          notifySuccess(Message);
        } else {
          notifyError(Message);
        }
      });
  }

  //Remove Location
  function fn_RemoveLocation(id) {
    fetch(`${RemoveLocationOfCustomer}?LocationId=` + id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then(async (json) => {
        var responseJson = json.Result;
        var Code1 = responseJson.Code;
        var Message = responseJson.Message;
        if (Code1 == "00") {
          notifySuccess(Message);
          fn_GetLocations();
        } else {
          notifyError(Message);
        }
      });
  }

  function onCardchange(gg) {
    setCarIDselected(gg);
    CarIDselected1 = gg;
  }
  //Get ShopID for Place Order
  async function multiRadioButton(DLat, DLng) {
    Droplat1 = DLat;
    Droplng1 = DLng;
    let CatList = [];
    let AllRestaurantsObject = [];
    let AllRestaurantsArray = [];
    let NewCountryCode = localStorage.getItem("NewCountryCode");
    var CatURL = `${getallshopswithradius}?Lat=${Droplat1}&Long=${Droplng1}&CountryCode=${NewCountryCode}&CustId=9202`;
    const fetchCategories = await fetch(CatURL);
    const loadCategories = await fetchCategories.json();

    return fetch(`${CatURL}`)
      .then((res) => res.json())
      .then((Response) => {
        var LocationResponse = JSON.parse(Response.Result.Response);
        var AllLoactionObject = JSON.parse(Response.Result.Data);
        var ResCode = LocationResponse[0].Code;

        if (ResCode == "00") {
          CatList = AllLoactionObject.Shops[0];
          AllRestaurantsObject = CatList.AllRestaurants;

          if (CatList != null && typeof CatList != "undefined") {
            if (typeof AllRestaurantsObject != "undefined") {
              AllRestaurantsObject.map((val) => {
                if (shopid == val.Id) {
                  setfinalOrderStatus(true);
                  // alert("location = true");
                  setLocationStatus(true);
                }
              });
            } else {
              notifyError("Restaurant is out of Range");
              setfinalOrderStatus(false);
              setLocationStatus(false);
            }
          } else {
            notifyError(LocationResponse[0].Message);
          }
        } else {
          notifyError(LocationResponse[0].Message);
        }
      });
  }
  //Remove Card Info Of Customer
  async function fn_RemoveCardInfoOfCustomer(id) {
    fetch(`${RemoveCustomerCard}?CardId=` + id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then(async (json) => {
        var responseJson = json.Result;
        var Code1 = responseJson.Code;
        var Message = responseJson.Message;
        if (Code1 == "00") {
          notifySuccess(Message);
          fn_GetCardInfoOfCustomer();
        } else {
          notifyError(Message);
        }
      });
  }

  function fn_chkPlaceOrder() {
    //Check Location and Card are selected or not
    if (finalOrderStatus && CheckCardStatus) {
      confirmOrderBtn();

      setfinalOrderStatus(false);
    }
    //Check Cash is selected or not
    else if (finalOrderStatus && cashPayment) {
      confirmOrderBtn();

      setfinalOrderStatus(false);
    } else {
      if (!cashPayment && !locationStatus) {
        notifyError("Please Select Location and Payment Method! ");
      } else if (!cashPayment) {
        notifyError("Please Select Payment Method!");
      } else if (!locationStatus) {
        notifyError("Please Select Correct Loaction!");
      }
    }
  }

  if (!finalOrderQueue) {
    return <Redirect to="/main" />;
    // window.location.href = "/main";
  }

  return (
    <div className="dcontainer">
      <div className="userpanel">
        <div className="deliverydetailes">
          {/* Delivery Details ****************************/}
          {/* 

          <div className="dbox1">
            <Numberbox number="0" />
            <Paneltitle panelname="Delivery Details" />
          </div> */}

          {/* CONTACTLESS DELIVERY RADIO PANEL *****************/}

          {/* <div
            className="dbox2"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div className="innerdbox2" style={{ flex: "10" }}>
              <h4>Contactless delivery</h4>
              <p>To Keep you safe, the rider will place your at door.</p>
            </div>

            <div style={{ flex: "1", marginTop: "12px", marginLeft: "20px" }}>
              <Switch
                color="primary"
                name="checkedB"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          </div> */}

          {/* DELIVERY TIME PANEL **************************/}

          {/* <div className="deliverytime">
            <h5 style={{ fontFamily: "Poppins-Bold", fontSize: "1rem" }}>
              Delivery Time
            </h5>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{ flex: "1", fontFamily: "Poppins-Bold" }}
                className="timeDrop1"
              >
                <select className="customDropDown">
                  <option value="">{DateToday}</option>
                </select>
              </div>

              <div
                style={{ flex: "1", fontFamily: "Poppins-Bold" }}
                className="timeDrop2"
              >
                <select className="customDropDown">
                  <option value="">ASAP</option>
                </select>
              </div>
            </div>
          </div> */}

          {/* -----Delivery Address Panel Start---- */}
          <div
            className="paymentpanel"
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "15px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Numberbox number="1" />
              <Paneltitle
                style={{ fontFamily: "Poppins-Bold" }}
                panelname="Delivery Address"
              />
              <input
                className="addlocationbtn"
                onClick={() => dispatch(finalAddress())}
                type="button"
                value={deliveryAddress ? "Back" : "Add Location"}
              />
            </div>
            {deliveryAddress ? (
              <DeliveryFeilds />
            ) : (
              saveloc.map((val) => {
                return (
                  <>
                    <div className="locationList">
                      <Radio
                        onChange={() => (
                          multiRadioButton(val.lat, val.lng),
                          setRadioSaveLoc(val.LocationId),
                          (PickUpAddress1 = val.label)
                        )}
                        color="primary"
                        checked={RadioSaveLoc === val.LocationId}
                        name="rdsavecard"
                        id={"chkDeliveryAddress_" + val.LocationId}
                        value={val.LocationId}
                        className="llist1"
                      />

                      <p className="llist2">{val.label}</p>

                      <MdDelete
                        className="llist3"
                        onClick={() => {
                          fn_RemoveLocation(val.LocationId);
                        }}
                      />
                    </div>

                    <br />
                  </>
                );
              })
            )}
          </div>
          {/* -----Delivery Address Panel End---- */}
        </div>

        <div
          className="paymentpanel"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Numberbox number="2" />
            <Paneltitle panelname="Payment" />

            {CC != "PK" ? (
              <input
                className="addlocationbtn"
                onClick={() => setCheckCardInfo(!CheckCardInfo)}
                type="button"
                value={!CheckCardInfo ? "Back" : "Add Card"}
              />
            ) : null}
          </div>

          <br />

          {CC != "PK" ? (
            <div
              style={{
                marginLeft: "25px",
                marginRight: "25px",
                padding: "15px",
                border: "0.5px solid",
                borderColor: "#cecece",
                height: "auto",
              }}
            >
              <div className="creditPanel">
                <Radio
                  onChange={() => (
                    setCreditPayment(true), setCashPayment(false)
                  )}
                  color="primary"
                  checked={creditPayment}
                />

                <h3 className="credittitle">Credit / Debit Card</h3>

                <div className="cardImages">
                  <img src={paypal} className="creditCards"></img>
                  <img src={master} className="creditCards"></img>
                  <img src={visa} className="creditCards"></img>
                </div>
              </div>

              <div>
                {creditPayment ? (
                  <>
                    <br />
                    {CheckCardInfo
                      ? CardInfo.map((val) => {
                          return (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <Radio
                                onChange={() => (
                                  onCardchange(val.CardId),
                                  setCheckCardStatus(true)
                                )}
                                color="primary"
                                checked={CarIDselected === val.CardId}
                                name="rdsaveloc"
                                value={val.CardId}
                              />
                              <MdDelete
                                onClick={() => {
                                  fn_RemoveCardInfoOfCustomer(val.CardId);
                                }}
                                style={{
                                  cursor: "pointer",
                                  width: "30px",
                                  height: "25px",
                                  marginRight: "3px",
                                  position: "relative",
                                  left: "400px",

                                  top: "20px",
                                  marginLeft: "-5px",
                                }}
                              />
                              <h4 style={{ fontFamily: "Poppins-Regular" }}>
                                {val.CardNumber}
                              </h4>
                            </div>
                          );
                        })
                      : null}

                    <br />
                    {!CheckCardInfo ? (
                      <>
                        <TextField
                          style={{
                            borderRadius: "0",
                            marginTop: "0%",
                            width: "100%",
                          }}
                          className="usermobile"
                          label="Name on Card"
                          variant="outlined"
                          value={CardName}
                          onChange={(e) => setCardName(e.target.value)}
                        />

                        <TextField
                          style={{
                            borderRadius: "0",
                            marginTop: "3%",
                            width: "100%",
                          }}
                          className="usermobile"
                          label="Card Number"
                          variant="outlined"
                          isRequired="true"
                          value={CardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                        />

                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <TextField
                            style={{
                              borderRadius: "0",
                              marginTop: "3%",
                              width: "100%",
                              flex: "1",
                              marginRight: "1%",
                            }}
                            className="usermobile"
                            label="MM / YY"
                            variant="outlined"
                            isRequired="true"
                            value={MMYY}
                            onChange={(e) => setMMYY(e.target.value)}
                          />

                          <TextField
                            style={{
                              borderRadius: "0",
                              marginTop: "3%",
                              width: "100%",
                              flex: "1",
                              marginLeft: "1%",
                            }}
                            className="usermobile"
                            label="CVV"
                            variant="outlined"
                            isRequired="true"
                            value={CVV}
                            onChange={(e) => setCVV(e.target.value)}
                          />
                        </div>

                        <FormControlLabel
                          id="Checked"
                          style={{ marginTop: "10px" }}
                          control={<Checkbox color="primary" />}
                          label="Save this card for your next payment."
                          onChange={() => fn_SaveCardInfoOfCustomer()}
                        />
                      </>
                    ) : null}
                  </>
                ) : null}
              </div>
            </div>
          ) : (
            // CASH PANEL

            <div
              style={{
                marginTop: "2%",
                marginLeft: "25px",
                marginRight: "25px",
                padding: "10px",
                border: "0.5px solid",
                borderColor: "#cecece",
                height: "auto",
              }}
            >
              <Radio
                onChange={() => (setCreditPayment(false), setCashPayment(true))}
                color="primary"
                checked={cashPayment}
                id="chkCash"
              />

              <h3
                style={{
                  fontFamily: "Poppins-Bold",
                  position: "relative",
                  bottom: "37px",
                  left: "39px",
                  fontSize: "28px",
                  fontWeight: "500",
                }}
              >
                Cash
              </h3>
              {cashPayment ? (
                <div
                  style={{
                    position: "relative",
                    bottom: "40px",
                    left: "10px",
                  }}
                >
                  <h4
                    style={{ fontFamily: "Poppins-Bold", fontSize: "1.3rem" }}
                  >
                    PAY BY CASH
                  </h4>
                  <p
                    style={{
                      color: "black",
                      fontFamily: "Poppins-Bold",
                      marginRight: "1em",
                    }}
                  >
                    Consider payment upon ordering for contactless delivery. You
                    can't pay by a card to the rider upon delivey
                  </p>
                </div>
              ) : null}
            </div>
          )}

          <div
            style={{
              marginTop: "50px",
              marginLeft: "25px",
              marginRight: "25px",
            }}
          >
            <Button
              onClick={() => fn_chkPlaceOrder()}
              style={
                (finalOrderStatus && CheckCardStatus) ||
                (cashPayment && locationStatus && finalOrderStatus)
                  ? {
                      backgroundColor: "rgb(242, 108, 42)",
                      borderRadius: "0px",
                      marginTop: "3%",
                      height: "55px",
                      fontSize: "15px",
                      width: "100%",
                      fontFamily: "Poppins-Bold",
                    }
                  : {
                      backgroundColor: "rgb(114, 114, 114)",
                      borderRadius: "0px",
                      marginTop: "3%",
                      height: "55px",
                      fontSize: "15px",
                      width: "100%",
                      fontFamily: "Poppins-Bold",
                      cursor: "default",
                    }
              }
              className="btnorderplace"
              variant="contained"
              color="secondary"
            >
              <span
                style={{
                  color: "white",
                  fontWeight: "600",
                  fontSize: "18px",
                }}
              >
                PLACE ORDER
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div className="receipt" style={{ boxShadow: "0 0 0" }}>
        <div
          className="rsection1"
          style={{ fontWeight: "600", marginBottom: "50px" }}
        >
          <p
            style={{
              fontFamily: "Poppins-Regular",
              textAlign: "center",
              color: "black",
            }}
          >
            Your order from
          </p>
          <h4
            style={{
              fontFamily: "Poppins-Regular",
              textAlign: "center",
              color: "#f16b2a",
              textTransform: "capitalize",
            }}
          >
            {SName}
          </h4>
        </div>

        <div className="rsection2Box" style={{ marginTop: "10px" }}>
          {typeof StoredMenuRecord != "undefined"
            ? StoredMenuRecord.map((val) => {
                return (
                  <OrderItemPanel
                    itemquatity={val.Quantity}
                    x
                    itemname={val.Name}
                    itemprice={val.Price * val.Quantity}
                  />
                );
              })
            : null}
        </div>

        <div>
          {/* <p
              style={{
                marginLeft: "5%",
                marginTop: "0%",
                color: "#ef7137",
                cursor: "pointer",
                fontFamily: "Poppins-Regular",
              }}
            >
              Festive Deals
            </p> */}
          <hr
            style={{
              width: "90%",
              marginLeft: "5%",
              marginRight: "5%",
              backgroundColor: "gray",
            }}
          ></hr>
        </div>

        <div className="rsection3">
          <div className="r3sub1">
            <p
              style={{
                marginLeft: "20px",
                color: "black",
                fontFamily: "Poppins-Regular",
              }}
            >
              Subtotal
            </p>
            <p
              style={{
                marginLeft: "20px",
                color: "black",
                fontFamily: "Poppins-Regular",
              }}
            >
              GST
            </p>
            <p
              style={{
                marginLeft: "20px",
                color: "black",
                fontFamily: "Poppins-Regular",
              }}
            >
              Delivery Fee
            </p>
            <p
              style={{
                marginLeft: "20px",
                color: "black",
                fontWeight: "bold",
                fontFamily: "Poppins-Regular",
              }}
            >
              TOTAL
            </p>
          </div>
          <div className="r3sub2">
            <p style={{ marginLeft: "20px", color: "black" }}>
              {NewCountryCode}. {Bill}
            </p>
            <p style={{ marginLeft: "20px", color: "black" }}>{gst}</p>
            <p style={{ marginLeft: "20px", color: "black" }}>
              {NewCountryCode}. {deliveryfee}
            </p>
            <p
              style={{
                marginLeft: "20px",
                color: "black",
                fontWeight: "bold",
                fontFamily: "Poppins-Regular",
              }}
            >
              {NewCountryCode}. {FinalBill}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deliverypanel;

export function Numberbox(props) {
  return (
    <div className="numberbox">
      <p
        style={{
          textAlign: "center",
          marginTop: "20%",
          marginLeft: "8%",
          fontFamily: "Poppins-Regular",
          color: "white",
          fontWeight: "500",
        }}
      >
        {props.number}
      </p>
    </div>
  );
}

export function Paneltitle(props) {
  return (
    <h1
      className="paneltitle"
      style={{ fontFamily: "Poppins-Regular", fontSize: "2rem" }}
    >
      {props.panelname}
    </h1>
  );
}

let LocationParams;

//Fetch GetSavedAndRecentLocationsForCustomer API
export function DeliveryFeilds() {
  const [selected, setSelected] = useState([]);
  const [LocationName, setLocationName] = useState("");
  const [LocationPurpose, setLocationPurpose] = useState("");
  const [Details, setDetails] = useState("");
  const dispatch = useDispatch();
  let options = [];

  function fn_SaveLocationForCustomer() {
    if (LocationPurpose != "") {
      var tt1 = localStorage.getItem("lat");
      var tt = localStorage.getItem("lng");
      LocationParams = {
        CustomerId: CusId,
        Latitude: tt1,
        Longitude: tt,
        LocationName: LocationPurpose,
        LocationPurpose: LocationPurpose,
        Detail: Details,
        CountryCode: localStorage.getItem("CountryCode"),
      };
      const body = encodeFormData(LocationParams);

      fetch(`${SaveLocations}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      })
        .then((response) => response.json())
        .then(async (json) => {
          var responseJson = json.Result;
          var Code1 = responseJson.Code;
          var Message = responseJson.Message;

          if (Code1 == "00") {
            notifySuccess(Message);
            dispatch(finalAddress()); /////this line is for reverting the map panel after the location is confirmed
          } else {
            notifyError(Message);
          }
        });
    } else {
      notifyError("Enter Location Purpose");
    }
  }
  return (
    <>
      <form>
        <div className="dbox3-2">
          <TDAhead />
        </div>

        <div className="dbox3-1">
          {/* <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d924244.06270828!2d66.59496949133144!3d25.19214642882869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1621944367276!5m2!1sen!2s"
            style={{ width: "90%", height: "100%", marginLeft: "20px" }}
            allowfullscreen=""
            loading="lazy"
          ></iframe> */}
        </div>
        <div className="dbox4">
          <TextField
            required
            className="floorfield"
            label="Location Purpose"
            variant="outlined"
            onChange={(e) => setLocationPurpose(e.target.value)}
          />

          <TextField
            style={{ borderRadius: "0", marginTop: "0%" }}
            className="riderfield"
            label="Detail (Optional)"
            variant="outlined"
            onChange={(e) => setDetails(e.target.value)}
          />
          <Button
            onClick={() => fn_SaveLocationForCustomer()}
            style={{
              backgroundColor: "rgb(242, 108, 42)",
              borderRadius: "0px",
              marginTop: "0%",
              height: "55px",
              width: "auto",
              fontSize: "15px",
            }}
            className="btnsubmit"
            variant="contained"
            color="secondary"
          >
            <span
              style={{ color: "white", fontWeight: "600", fontSize: "18px" }}
            >
              Submit
            </span>
          </Button>
        </div>
      </form>
    </>
  );
}

export function DeliveryAddress(props) {
  const dispatch = useDispatch();

  return (
    <div
      className="finaladdress"
      style={{ display: "flex", flexDirection: "row", marginLeft: "2%" }}
    >
      <div style={{ flex: "1" }}>
        <h4 style={{ fontSize: "1.6em" }}>Street </h4>
        <p style={{ fontSize: "1em", color: "gray" }}>Clifton Beach </p>

        <h4 style={{ fontSize: "1.6em" }}>Floor</h4>
        <p style={{ fontSize: "1em", color: "gray" }}>
          2nd floor and side walk
        </p>

        <h4 style={{ fontSize: "1.6em" }}>Note for Rider </h4>
        <p style={{ fontSize: "1em", color: "gray" }}>
          Do not take too much time please
        </p>
      </div>

      <div style={{ marginLeft: "2%", marginTop: "34%", marginRight: "5%" }}>
        <Button
          onClick={() => dispatch(finalAddress())}
          style={{ borderColor: "#F26C2A", color: "#F26C2A" }}
          variant="outlined"
          color="primary"
          href="#outlined-buttons"
        >
          Edit
        </Button>
      </div>
    </div>
  );
}

// export function PersonalDetails(props) {
//   const dispatch = useDispatch();

//   return (
//     <div
//       className="finalPersonalDetails"
//       style={{ display: "flex", flexDirection: "row", marginLeft: "4%" }}
//     >
//       <div style={{ flex: "1" }}>
//         <h4 style={{ fontSize: "1.6em" }}>Full Name </h4>
//         <p style={{ fontSize: "1em", color: "gray" }}>Atif Hyder</p>

//         <h4 style={{ fontSize: "1.6em" }}>Email</h4>
//         <p style={{ fontSize: "1em", color: "gray" }}>atifhm297@gmail.com</p>

//         <h4 style={{ fontSize: "1.6em" }}>Mobile Number</h4>
//         <p style={{ fontSize: "1em", color: "gray" }}>0333XXXXXXXX</p>
//       </div>

//       <div style={{ marginLeft: "1%", marginTop: "32%", marginRight: "5%" }}>
//         <Button
//           onClick={() => dispatch(personalDetails())}
//           style={{ borderColor: "#F26C2A", color: "#F26C2A" }}
//           variant="outlined"
//           color="primary"
//           href="#outlined-buttons"
//         >
//           Edit
//         </Button>
//       </div>
//     </div>
//   );
// }

export const OrderItemPanel = (props) => {
  return (
    <div className="rsection2">
      <div className="r2sub1">
        <h4 style={{ marginLeft: "20px", marginTop: "8px" }}>
          {" "}
          {props.itemquatity}x{" "}
        </h4>
      </div>

      <div className="r2sub2">
        <p
          className="ordereditems"
          style={{
            marginLeft: "20px",
            color: "#f26c2a",
            fontSize: "20px",
            textTransform: "capitalize",
          }}
        >
          {props.itemname}
        </p>
      </div>

      <div className="r2sub3">
        <p>
          {NewCountryCode}. {props.itemprice}
        </p>
      </div>
    </div>
  );
};

let FinalShopLat = 0;
let FinalShopLong = 0;
// let dispatch = useDispatch();

function confirmOrderBtn() {
  if (CarIDselected1 == undefined) {
    CarIDselected1 = 0;
  }

  if (deliveryfee == null) {
    deliveryfee = 0;
  }

  if (FinalBill == 0) {
    notifyError("Details not found");
  } else {
    const Params = {
      CustId: CusId,
      OrderDetailJson: JSON.stringify({ OrderDetailJson: OrderDetailJson }),
      ShopId: shopid,
      PaymentTypeId: 1,
      TotalBill: FinalBill,
      GST: splitPer,
      DeliveryFee: deliveryfee,

      PickupLat: Shoplat,
      PickupLong: Shoplong,
      DropoffLat: Droplat1,
      DropoffLong: Droplng1,
      PickupAddr: PickUpAddress1,
      DropoffAddr: address,
      CardId: CarIDselected1,
    };

    FinalShopLat = Params.PickupLat;
    FinalShopLong = Params.PickupLong;

    const body = encodeFormData(Params);

    fetch(`${confirmfoodorder}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    })
      .then((response) => response.json())
      .then(async (json) => {
        var responseJson = json.Result;
        let Respons = JSON.parse(responseJson.Response);
        var Code1 = Respons[0].Code;
        var Message = Respons[0].Message;

        if (Code1 == "00") {
          Data = JSON.parse(responseJson.Data);
          notifySuccess(Message);

          // setTimeout(() => updatedStore.dispatch(emptycart()), 2000);
          localStorage.removeItem("CartArray1");

          OrderDetailJson = [];
          var ordernodetails = Data.OrderDetail[0];
          OrderNoArray.push(ordernodetails);
          let orderID = 0;
          OrderNoArray.map((val) => {
            orderID = val.OrderId;
            localStorage.setItem("OrderId", val.OrderId);
          });

          setTimeout(() => {
            updatedStore.dispatch(emptycart());
            window.location.href = `/OrderTracking/${orderID}/${FinalShopLat}/${FinalShopLong}/${Droplat1}/${Droplng1}`;
          }, 3000);
        } else {
          notifyError(Message);
        }

        // var ordernodetails = Data.OrderDetail[0];
        // OrderNoArray.push(ordernodetails);

        // OrderNoArray.map((val) => {

        //   localStorage.setItem("OrderId", val.OrderId);
        // });
      });
  }
}
