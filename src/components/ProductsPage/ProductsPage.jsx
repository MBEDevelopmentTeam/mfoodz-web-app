import "./ProductsPage.css";
import "./ProductsPageMobile.css";

import React, { useState } from "react";
import { Scrollbars } from "rc-scrollbars";
import ModalRest from "react-modal";
// import Accordion from "@material-ui/core/Accordion";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import Checkbox from "@material-ui/core/Checkbox";
// import ScrollMenu from "react-horizontal-scrolling-menu";
// import ScrollContainer from "react-indiana-drag-scroll";
import { useDispatch, useSelector } from "react-redux";
import {
  addtocart,
  restInfoDisplay,
  subMenu,
  openCartPanel,
  mainPathFalse,
  emptycart,
} from "../../actions";
import { useEffect } from "react";
import CartPanel from "../CartPanel/CartPanel";
import { GetFinancialInfo } from "../Deliverypanel/Deliverypanel";
import { getShopMenu, ShopSubMenu, GoogleKey } from "../AllApi";
import { updatedStore } from "../../index";
import $ from "jquery";
import { itemAddedToCart } from "../Notifications";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import SubMenuPanel from "./SubMenuPanel";

import foodPlate from "./Images/food-plate.png";
import restAddress from "./Images/restAddress.png";
import pandaBannerImage from "./Images/bannerImage_panda.jpg";
import defaultCard from "./Images/defaultCard.jpg";
import { retaurantHeaderImage } from "../RestaurantCard/RestaurantCard";

let ShopData = null;
var ShopName2 = "";
let MenuCategory = [];
let CatName = [];
let MenuRecord = [];
let ResID = 0;
let ShopFinancialsArray1 = [];
let NewCountryCode;

const ProductsPage = (props) => {
  // localStorage.setItem("productsPageLastURL", window.location.href);
  const dispatch = useDispatch();

  dispatch(mainPathFalse());
  function checkWidth() {
    var windowSize = $(window).width();

    if (windowSize > 600) {
      dispatch(openCartPanel("300px"));
    } else if (windowSize < 600) {
      dispatch(openCartPanel("0px"));
    }
  }

  $(window).resize(checkWidth);
  const [MenuCategories, setMenuCategories] = useState([]);
  const [alert, setAlert] = React.useState({
    type: "error",
    text: "This is a alert message",
    show: false,
  });

  const ShopID = new URLSearchParams(props.location.search).get("shopId");
  // console.log(ShopID)
  // console.log(`ShopID`)
  ResID = ShopID;
  const ShopName = new URLSearchParams(props.location.search).get("StoreName");
  ShopName2 = ShopName;
  localStorage.setItem("ShopName", ShopName2);
  NewCountryCode = localStorage.getItem("NewCountryCode");

  if (NewCountryCode == 1) {
    NewCountryCode = "CDN";
  } else if (NewCountryCode == 92) {
    NewCountryCode = "PKR";
  } else {
  }
  //Clear CartPanel when ResID not Match
  if (MenuRecord.length > 0) {
    if (ResID != MenuRecord[0].ShopId) {
      MenuRecord = [];
      updatedStore.dispatch(emptycart());
    }
  }

  var RestaurantMenuURL = `${getShopMenu}?ShopId=${ShopID}`;

  useEffect(() => {
    // console.log(window.location.href);
    localStorage.setItem("shopid", ShopID);
    (async () => {
      const fetchRestaurantMenuDetails = await fetch(RestaurantMenuURL).catch(
        (err) => {
          console.log(err.message);
        }
      );
      const loadRestaurantMenuURLDetails = await fetchRestaurantMenuDetails.json();

      return fetch(`${RestaurantMenuURL}`)
        .then((ResMenuResponse) => ResMenuResponse.json())
        .then((Response) => {
          var RestaurantResponse = JSON.parse(Response.Result.Response);
          var RestaurantObject = JSON.parse(Response.Result.Data);
          //alert(JSON.stringify(RestaurantObject));

          const ShopMenuArray = [];
          const ShopLocationArray = [];
          const ShopFinancialsArray = [];
          const MenuCategoryArray = [];

          //Get ShopMenuDetails
          var ShopMenuDetails = RestaurantObject.ShopMenu[0];
          if (ShopMenuDetails != null) {
            ShopMenuArray.push(ShopMenuDetails);
            ShopData = ShopMenuDetails;
          }
          //alert(JSON.stringify(ShopData))

          //Get ShopMenu => ShopLocation
          var ShopLocationDetails = ShopMenuDetails.ShopLocation;
          if (ShopLocationDetails != null) {
            ShopLocationArray.push(ShopLocationDetails);
          }
          //console.log(ShopLocationDetails);

          //Get ShopMenu => ShopFinancials
          var ShopFinancialsDetails = ShopMenuDetails.ShopFinancials;
          if (ShopFinancialsDetails != null) {
            ShopFinancialsArray.push(ShopFinancialsDetails);

            ShopFinancialsArray1.push(ShopFinancialsDetails);
            // GetFinancialInfo(ShopFinancialsArray1);
          }

          GetFinancialInfo(ShopFinancialsArray1, ShopLocationArray);
          //alert(JSON.stringify(ShopFinancialsDetails));

          //Get ShopMenu => MenuCategory
          var MenuCategoryDetails = ShopMenuDetails.MenuCategory;
          MenuCategoryArray.push(MenuCategoryDetails);
          if (MenuCategoryDetails != null) {
            setMenuCategories(MenuCategoryDetails);
          }
          // alert(setMenuCategories(MenuCategoryDetails))
        })
        .catch((err) => {
          console.log(err.message);
        });
    })();
  }, []);

  const restinfo = useSelector((state) => state.restinfo);
  const submenu = useSelector((state) => state.submenu);
  const windowwidth = useSelector((state) => state.windowwidth);

  const slider = document.querySelector(".cat_list--innerBox");
  let isDown = false;
  let startX;
  let scrollLeft;

  if (slider) {
    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
      // console.log(walk);
    });
  }

  const [newmodal, setNewModal] = React.useState(true);
  return (
    <>
      {/* {window.console.log("products page")} */}
      <div className="products_page_container">
        {/* //  ################NEW-SUB_MENU-PANEL##################  */}

        {submenu ? <SubMenuPanel display={submenu} /> : null}

        {/* //  ################NEW-SUB_MENU-PANEL##################  */}

        <ModalRest
          style={
            !windowwidth
              ? // ********************** For Web View ***********************
                {
                  overlay: {
                    backgroundColor: "rgba(23, 23, 23, 0.394)",
                    zIndex: "10",
                  },

                  content: {
                    width: "40em",
                    height: "34em",
                    borderRadius: "15px",
                    position: "absolute",
                    left: "0",
                    right: "0",
                    top: "0",
                    bottom: "0",
                    margin: "auto",
                    padding: "0px",
                    border: "0px",
                  },
                }
              : // ********************** For Mobile View ***********************

                {
                  overlay: {
                    backgroundColor: "rgba(23, 23, 23, 0.394)",
                  },

                  content: {
                    width: "330px",
                    height: "515px",
                    borderRadius: "15px",
                    position: "absolute",
                    left: "0",
                    right: "0",
                    top: "0",
                    bottom: "0",
                    margin: "auto",
                    padding: "0px",
                    border: "0px",
                  },
                }
          }
          isOpen={restinfo}
          // isOpen={true}
        >
          <RestaurantInfo />
        </ModalRest>

        {/* <Modal                                          ************************** OLD SUBMENU PANEL ***********************************
          style={{
            overlay: {
              backgroundColor: "rgba(23, 23, 23, 0.394)",
            },

            content: {
              width: "600px",
              height: "500px",
              borderRadius: "15px",
              position: "absolute",
              left: "0",
              right: "0",
              top: "0",
              bottom: "0",
              margin: "auto",
            },
          }}
          isOpen={submenu}
        >
          <SubMenuPanel />
        </Modal> */}

        {/* //////////////////////////product page start from here///////////////////////// */}

        <img
          className="banner_image"
          src={pandaBannerImage}
          // src={retaurantHeaderImage}
          alt="PIZZA BANNER"
        />

        {/* pizza_banner */}

        <div className="restaurant_info">
          <div className="restaurant_info1">
            <h3
              style={{
                fontFamily: "Poppins-Regular",
                textTransform: "capitalize",
              }}
              className="rest_title_text"
              onClick={windowwidth ? () => dispatch(restInfoDisplay()) : null}
            >
              {ShopName}
            </h3>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="rest_info_box">
                <p style={{ color: "white" }} className="rest_box_text">
                  FOOD FEST DEALS
                </p>
              </div>

              <span className="reviewStarHead">
                &#9733;
                <span style={{ color: "black", fontSize: "13px" }}>5/5</span>
              </span>
            </div>

            <p
              className="rest_disc_text"
              style={{ fontFamily: "Poppins-Regular" }}
            >
              $$$ . Pizza own delivery . Ramadan Deals . Festive Deals
            </p>
          </div>

          <div className="restaurant_info2">
            <button
              onClick={() => dispatch(restInfoDisplay())}
              className="rest_btn"
            >
              Restaurant Information
            </button>
            {/* <button onClick={() => dispatch(subMenu())} className="rest_btn">
            SubMenu
          </button> */}
          </div>
        </div>
        {/* restaurant_info */}

        <div style={{ fontFamily: "Poppins-Regular" }} className="deal_title">
          <div className="deal_title1">
            <h4 style={{ margin: "0", fontWeight: "800" }}>FOOD FEST DEALS</h4>
          </div>

          <span className="deal_title2">
            <img style={{ height: "100%" }} src={foodPlate} />
          </span>
        </div>

        {/* deal_title */}

        <div className="cat_list">
          <div className="cat_list--innerBox">
            {typeof MenuCategories != "undefined" && MenuCategories != null
              ? MenuCategories.map((val) => {
                  return (
                    <>
                      <CatList CatName={val.Category} CatID={val.CategoryId} />
                    </>
                  );
                })
              : null}
          </div>
        </div>

        <FoodDishesPanel />

        <CartPanel ResID={ShopName} MenuRecord={MenuRecord} />
      </div>
    </>
    // products_page_container
  );
};

export default ProductsPage;

export function CatList(props) {
  return (
    <a
      className="cat_list_items"
      style={{ color: "black" }}
      href={"#" + props.CatID}
    >
      <p>{props.CatName}</p>
    </a>
  );
}

export function CategoryHead(props) {
  return (
    <div className="dish_head">
      <div className="dish_head1">
        <h4 id={props.catid}>{props.dish_title}</h4>

        <p>{props.dish_disc}</p>
      </div>
    </div>
    // dish_head
  );
}

export function CategoryItem(props) {
  const dispatch = useDispatch();
  let itemImage = props.dish_image;
  // console.log(itemImage)
  return (
    <div onClick={() => dispatch(addtocart())} className="dish_item">
      <div className="dish_item1">
        <h4 className="item_title"> {props.dish_title} </h4>

        <p className="item_disc"> {props.dish_disc} </p>

        <p className="item_price">
          {NewCountryCode}. {props.dish_Amount}
        </p>
      </div>

      <div className="dish_item2">
        {itemImage == null ? (
          <img
            style={{ border: "2px solid #a0a0a0" }}
            className="dishItemImage"
            src={defaultCard}
          ></img>
        ) : (
          <img className="dishItemImage" src={itemImage}></img>
        )}

        <button className="btnAddToMenu"> + </button>
      </div>
    </div>
    //  dish_item
  );
}

let MenuItemList = [];
let item = [];
let MenuItemId = 0;
let MenuItemName = "";
let MenuItemDes = "";
let MenuItemAmount = "";
let subMenuCount;

export let subMenuObject = {};

export function FoodDishesPanel() {
  const dispatch = useDispatch();
  const [menuHead, setmenuHead] = useState([]);

  // /* FUNCTION WITH SUBMENU OPTIONS */ ##########################################################################################################

  async function fn_AddItem(restData) {
    // alert(JSON.stringify(restData));

    subMenuCount = restData.SubMenuItemCount;
    // console.log(restData);
    // console.log("restData");

    if (subMenuCount == null || subMenuCount == 0) {
      Selectitem(restData);
      // itemAddedToCart();

      // Selectitem(restData);
      // alert(subMenuCount);
      // MenuItemList.push(restData);
    } else {
      baseMenuItems = restData;

      subMenuObject = {
        restName: restData.Name,
        restImage: restData.ImageHeader,
        currencyType: NewCountryCode,
        menuItemId: restData.MenuId,
        submenuId: restData.SubMenuId,
      };

      dispatch(subMenu());
      // alert(subMenuCount);
      // itemAddedToCart();
    }
  }

  // /* FUNCTION WITH SUBMENU OPTIONS */ ################################################################################################################

  // /* FUNCTION "WITHOUT" SUBMENU OPTIONS */ ############################################################################################################

  // async function fn_AddItem(restData) {
  //   subMenuCount = restData.SubMenuItemCount;

  //   Selectitem(restData);
  //   itemAddedToCart();
  // }

  // /* FUNCTION "WITHOUT" SUBMENU OPTIONS */ ############################################################################################################

  useEffect(() => {
    if (ShopData != null) {
      var MenuItemArray = ShopData.MenuCategory;
      //alert(JSON.stringify(MenuItemArray));
      if (MenuItemArray != null) {
        setmenuHead(MenuItemArray);
      }
    }
  });

  if (ShopData != null) {
    var MenuItemArray = ShopData.MenuCategory;
    MenuCategory.push(MenuItemArray);
    if (MenuItemArray != null) {
      MenuItemArray.map((val) => {
        //MenuItemList.push(val);
        CatName = val.Category;
        if (typeof val.MenuItem != "undefined" || val.MenuItem != null) {
          MenuItemId = val.MenuItem[0].MenuId;
          MenuItemName = val.MenuItem[0].Name;
          MenuItemDes = val.MenuItem[0].Description;
          MenuItemAmount = val.MenuItem[0].BaseAmount;
          item = val;
        }
      });
    }
  }
  return (
    <>
      {typeof menuHead != "undefined" && menuHead.length > 0
        ? menuHead.map((val) => {
            return (
              <div className="dish_panel_main">
                <div className="dish_panel_innerBox">
                  <div className="dish_panel-1">
                    <CategoryHead
                      dish_title={val.Category}
                      dish_disc={MenuItemDes}
                      catid={val.CategoryId}
                      catHeadImage={val.CategoryIcon}
                    />
                  </div>

                  <div className="dish_panel-2">
                    {typeof val.MenuItem != "undefined" || val.MenuItem != null
                      ? val.MenuItem.map((rest) => {
                          return (
                            <>
                              <div onClick={() => fn_AddItem(rest)}>
                                <CategoryItem
                                  dish_title={rest.Name}
                                  dish_disc={rest.Description}
                                  dish_Amount={rest.BaseAmount}
                                  dish_image={rest.ImageHeader}
                                />
                              </div>
                            </>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
            );
          })
        : null}
      {/* dish_panal_main */}
    </>
    // food_dishes_panel
  );
}

export const RestaurantInfo = (props) => {
  const dispatch = useDispatch();
  const [modal3, setModal3] = useState(true);

  let address = "";
  let shoplat = "";
  let shoplong = "";
  let gst = 0;
  let deliveryfee = 0;
  let minimumcashlimit = 0;

  if (ShopData != null) {
    address = ShopData.ShopLocation[0].Address;
    shoplat = ShopData.ShopLocation[0].Latitude;
    shoplong = ShopData.ShopLocation[0].Longitude;

    if (ShopData.ShopFinancials != null) {
      minimumcashlimit = ShopData.ShopFinancials[0].MinimumCashLimit;
      gst = ShopData.ShopFinancials[0].GST;
      //alert(JSON.stringify(gst))
      // alert('tt'+gst);
      deliveryfee = ShopData.ShopFinancials[0].DeliveryFee;
      if (gst.length > 0 && deliveryfee.length > 0) {
        localStorage.setItem("gst", gst);
        localStorage.setItem("deliveryfee", deliveryfee);
      }
    }
  }

  return (
    <>
      <div className="restInfo_ModalMain">
        <div className="restModal-1">
          <button
            className="restInfoCloseBtn"
            onClick={() => dispatch(restInfoDisplay())}
          >
            &#x2715;
          </button>

          <img className="restInfo_headerImage" src={pandaBannerImage}></img>

          <div className="restModal-1_inner1">
            <div className="restModal-1_inner1-section-1">
              <h3 style={{ textTransform: "capitalize" }}>{ShopName2}</h3>
            </div>

            <div className="restModal-1_inner1-section-2">
              <p>Pizza . Ramazan Deals . Festive Deals and Much More.</p>
            </div>

            <div className="restModal-1_inner1-section-3">
              <p>Open 12:00pm - 11:59pm</p>
            </div>

            <div className="restModal-1_inner1-section-4">
              <a
                id={modal3 ? "aboutButtonHovered" : "aboutButton"}
                onClick={() => setModal3(true)}
              >
                About
              </a>
              <a
                id={!modal3 ? "reviewsButtonHovered" : "reviewsButton"}
                onClick={() => setModal3(false)}
              >
                Reviews
              </a>
            </div>
          </div>
        </div>

        <div className="restModal-2">
          <div className="restModal-2_inner1">
            {modal3 ? (
              <div className="restModal_aboutSection">
                <div className="aboutSection-1">
                  <div
                    style={{
                      flex: "1",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <h6
                      style={{
                        fontWeight: "800",
                        fontSize: "15px",
                        color: "black",
                      }}
                    >
                      Shop Financials
                    </h6>

                    <p style={{ fontSize: "12px", textAlign: "start" }}>
                      <span style={{ fontWeight: "800" }}> GST:</span> {gst}
                      <br />
                      <span style={{ fontWeight: "800" }}>Delivery Fee:</span>
                      {NewCountryCode} {deliveryfee}
                    </p>
                  </div>

                  <div
                    style={{
                      flex: "1",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <h6
                      style={{
                        fontWeight: "800",
                        fontSize: "15px",
                        color: "black",
                      }}
                    >
                      Address
                    </h6>

                    <p
                      style={{
                        wordBreak: "break-word",
                        fontSize: "10px",
                        textAlign: "start",
                      }}
                    >
                      {address}
                    </p>
                  </div>
                </div>

                <div className="aboutSection-2">
                  <div style={{ width: "300px", height: "250px" }}>
                    <MapWithRestaurantMaker
                      googleMapURL={GoogleKey}
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `100%` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                      shoplat={shoplat}
                      shoplong={shoplong}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="reviews_panel">
                <h4> 4 Reviews</h4>

                <Scrollbars className="reviewScroll">
                  <Review
                    ratings="1/5"
                    personName="Atif Hyder"
                    reviewTime="16/05/2021"
                    reviewDetails="Lorem ipsum, dolor sit amet consectet."
                  />
                  <Review
                    ratings="2/5"
                    personName="Shuja Haider"
                    reviewTime="16/05/2021"
                    reviewDetails="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
                  />
                  <Review
                    ratings="4/5"
                    personName="Maisam Raza"
                    reviewTime="16/05/2021"
                    reviewDetails="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit veritatis placeat."
                  />
                  <Review
                    ratings="1/5"
                    personName="Ali Khanzada"
                    reviewTime="16/05/2021"
                    reviewDetails="Lorem ipsum, dolor sit."
                  />
                </Scrollbars>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const Review = (props) => {
  return (
    <div className="reviews">
      <span className="reviewStar">
        &#9733;
        <span style={{ color: "black", fontSize: "15px", fontWeight: "300" }}>
          (
        </span>
        <span style={{ color: "black", fontSize: "15px", fontWeight: "300" }}>
          {props.ratings})
        </span>
      </span>

      <h6>{props.personName}</h6>

      <p>{props.reviewTime}</p>

      <p style={{ color: "gray" }}>{props.reviewDetails}</p>
    </div>
  );
};

export let baseMenuItems;

export function Selectitem(item, subMenuList) {
  let amount;
  let SubMenuPrice;
  if (MenuRecord.length >= 1) {
    if (ResID != MenuRecord[0].ShopId) {
      MenuRecord = [];
    }
  }

  if (subMenuList != undefined) {
    SubMenuPrice = 0;
    subMenuList.map((val) => {
      SubMenuPrice = SubMenuPrice + val.itemPrice;
    });
  }

  // alert(JSON.stringify(subMenuList))
  let id = item.MenuId;
  let Name = item.Name;
  if (subMenuList != undefined) {
    amount = item.BaseAmount + SubMenuPrice;
  } else {
    amount = item.BaseAmount;
  }
  let count = 0;
  var find = MenuRecord.filter((x) => x.MenuId == id);
  var findQuantity = 0;

  let QuantityAdded = false;
  if (find.length > 0 && typeof subMenuList == "undefined") {
    const FindedIndex = MenuRecord.findIndex((x) => x.MenuId == find[0].MenuId);
    findQuantity = MenuRecord[FindedIndex].Quantity;
    MenuRecord[FindedIndex] = {
      MenuId: id,
      Name: Name,
      Quantity: MenuRecord[FindedIndex].Quantity + 1,
      Price: amount,
      ShopId: ResID,
      submenu: subMenuList,
    };
    localStorage.setItem("CartArray1", JSON.stringify(MenuRecord)); //store
  } else if (find.length > 0 && typeof subMenuList != "undefined") {
    const SubMenuIdArray = subMenuList.map((val) => val.itemID);
    find.map((val) => {
      let same = true;
      val.submenu.map(({ itemID }, index) => {
        if (!SubMenuIdArray.includes(itemID)) {
          same = false;
        }
        if (val.submenu.length == index + 1) {
          if (same) {
            const FindedIndex = MenuRecord.findIndex(
              (x) => x.MenuId == val.MenuId
            );
            MenuRecord[FindedIndex].Quantity =
              MenuRecord[FindedIndex].Quantity + 1;
            QuantityAdded = true;
            localStorage.setItem("CartArray1", JSON.stringify(MenuRecord)); //store
          } else {
            if (!QuantityAdded) {
              MenuRecord.push({
                MenuId: id,
                Name: Name,
                Quantity: 1,
                Price: amount,
                ShopId: ResID,
                submenu: subMenuList,
              });
              localStorage.setItem("CartArray1", JSON.stringify(MenuRecord)); //store
            }
          }
        }
      });
    });
  } else {
    MenuRecord.push({
      MenuId: id,
      Name: Name,
      Quantity: 1,
      Price: amount,
      ShopId: ResID,
      submenu: subMenuList,
    });
  }

  localStorage.setItem("CartArray1", JSON.stringify(MenuRecord)); //store
}

export const MapWithRestaurantMaker = withScriptjs(
  withGoogleMap((props) => (
    <>
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{
          lat: parseFloat(props.shoplat),
          lng: parseFloat(props.shoplong),
        }}
        center={{
          lat: parseFloat(props.shoplat),
          lng: parseFloat(props.shoplong),
        }}
        options={{
          disableDefaultUI: true,
          scrollwheel: true,
          draggable: false,
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
      </GoogleMap>
    </>
  ))
);

// export const SubMenuPanel = () => {
//   const dispatch = useDispatch();

//   const [Submenu, setSubmenu] = useState([]);

//   MenuItemList.map((val) => {
//     MenuItemId = val.MenuId;
//     submenuid = val.SubMenuId;
//   });

//   var SubMenuURL = `${ShopSubMenu}?MenuId=${MenuItemId}&SubMenuId=${submenuid}`;

//   useEffect(() => {
//     //alert(JSON.stringify(MenuItemList));
//     (async () => {
//       const fetchSubMenuDetails = await fetch(SubMenuURL);
//       const LoadSubMenuDetails = await fetchSubMenuDetails.json();

//       return fetch(`${SubMenuURL}`)
//         .then((res) => res.json())
//         .then((Response) => {
//           var SubMenuResponse = JSON.parse(Response.Result.Response);
//           var SubMenuObject = JSON.parse(Response.Result.Data);

//           var SubShopMenuArray = [];
//           var SubMenuArray = [];

//           //Get ShopSubMenu
//           var SubMenuList = SubMenuObject.ShopSubMenu[0];
//           if (SubMenuList != null) {
//             SubShopMenuArray.push(SubMenuList);
//             // console.log(SubMenuList)
//           }

//           //Get SubMenu
//           var SubMenuListDetails = SubMenuList.SubMenu;
//           if (SubMenuListDetails != null) {
//             setSubmenu(SubMenuListDetails);
//           }

//           //Get SelectorType
//           //Code
//         })
//         .catch((err) => {
//           console.log(err.message);
//         });
//     })();
//   }, []);

//   return (
//     <div className="subMenuPanel">
//       <Scrollbars>
//         <button
//           style={{ float: "right" }}
//           onClick={() => dispatch(subMenu(), (MenuItemList = []))}
//           style={{ color: "#f26c2a" }}
//         >
//           &#x2715;
//         </button>

//         <div className="submenu1">
//           <div
//             style={{
//               flex: "1",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               paddingLeft: "20px",
//               paddingRight: "20px",
//             }}
//           >
//             {typeof MenuItemList != "undefined" && MenuItemList.length > 0
//               ? MenuItemList.map((val) => {
//                   return (
//                     <>
//                       <h3 style={{ color: "#f26c2a", fontWeight: "700" }}>
//                         {val.Name}
//                       </h3>
//                       <p
//                         style={{
//                           color: "black",
//                           fontSize: "1rem",
//                           color: "gray",
//                         }}
//                       >
//                         {val.Description}
//                       </p>
//                       <p
//                         style={{
//                           color: "black",
//                           fontSize: "1rem",
//                           color: "gray",
//                         }}
//                       >
//                         Rs.{val.BaseAmount}
//                       </p>
//                     </>
//                   );
//                 })
//               : null}
//           </div>

//           <div
//             style={{
//               flex: "1",
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "center",
//             }}
//           >
//             <img
//               style={{ width: "200px", height: "200px", borderRadius: "50%" }}
//               src={dishItemImage}
//             ></img>
//           </div>
//         </div>

//         <div className="submenu2">
//           {typeof Submenu != "undefined" && Submenu.length > 0
//             ? Submenu.map((val) => {
//                 return (
//                   <>
//                     <SubMenuOptions Name={val.Name} Price={val.Amount} />
//                   </>
//                 );
//               })
//             : null}
//         </div>

//         <div className="submenu3">
//           <div className="addToCartButton">
//             <button
//               style={{
//                 backgroundColor: "#f26c2a",
//                 width: "150px",
//                 height: "45px",
//                 borderRadius: "15px",
//                 color: "white",
//                 fontWeight: "400",
//               }}
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </Scrollbars>
//     </div>
//   );
// };

// export const SubMenuOptions = (props) => {
//   return (
//     <Accordion>
//       <AccordionSummary
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls="panel1a-content"
//         id="panel1a-header"
//       >
//         <Typography>
//           <p style={{ color: "black" }}>{props.Name}</p>
//           <p style={{ color: "gray", fontSize: "12px" }}>Rs.{props.Price}</p>
//         </Typography>
//       </AccordionSummary>
//       <AccordionDetails>
//         <Typography>
//           <Checkbox
//             defaultChecked
//             color="primary"
//             inputProps={{ "aria-label": "secondary checkbox" }}
//           />
//         </Typography>
//       </AccordionDetails>
//     </Accordion>
//   );
// };
