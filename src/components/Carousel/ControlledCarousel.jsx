import React, { lazy, Suspense, useEffect, useState } from "react";
import { RestaurantCard } from "../RestaurantCard/RestaurantCard";
import "./Carousel.css";
import { Loader } from "../Loader/Loader";
// import { Contact } from "../Website/contact";
import Footer from "../WelcomePage/Footer/Footer";
import Carousel from "react-elastic-carousel";
import { getallshopswithradius, GetSearchedShops } from "../AllApi";
import { VerticleButton as ScrollUpButton } from "react-scroll-up-button";
import DataNotFound from "../DataNotFound/DataNotFound";
import { useDispatch, useSelector } from "react-redux";
// import { PanelHeading } from "./PanelHeading";
// import { Fragment } from "react";
// import RestaurantClass from "../ProductsPage/RestaurantClass";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { dataNotFound } from "../dataNotFound/dataNotFound";
// import { setControlledCarousel } from "../SearchPanel/AsyncPaginationExample";
// import { useHistory } from "react-router-dom";

let Array1 = [];
let ArrayRes = 0;
let ShopsArray = [];
let CatList = [];
let ShopObject = [];
let AllRestaurantsObject = [];
let queryArray = [];

var CatURL;

export function ControlledCarousel(props) {
  const [RestaurantsData, setRestaurantsData] = useState([]);
  const [CategoriesData, setCategoriesData] = useState([]);
  const [AllRestaurantsData, setAllRestaurantsData] = useState([]);
  const [SearchRestaurantsData, setSearchRestaurantsData] = useState([]);
  const [showMessage, setshowMessage] = useState("");
  const [restaurantNotFound, setRestaurantNotFound] = useState();

  var Lat = localStorage.getItem("lat", Lat);
  var Long = localStorage.getItem("lng", Long);
  let CustId = localStorage.getItem("UserId");
  let NewCountryCode = localStorage.getItem("NewCountryCode");
  CustId = JSON.parse(CustId);

  //Fetch All Categories Carousel & All Restaurants List - Start
  const cartnumber1 = useSelector((state) => state.cartnumber);
  useEffect(() => {
    (async () => {
      if (!props.SearchParam) {
        if (CustId == null) {
          CustId = 0;
        }
        //alert("Div 1")
        CatURL = `${getallshopswithradius}?Lat=${Lat}&Long=${Long}&CountryCode=${NewCountryCode}&CustId=${CustId}`;
        //console.log(CatURL)
        //alert(8)
        try {
          const fetchCategories = await fetch(CatURL);
          const loadCategories = await fetchCategories.json();
          Array1 = loadCategories.Result.Data;
          ArrayRes = loadCategories.Result.Response;
          var Res = JSON.parse(ArrayRes);
          var ResMsg = Res[0].Message;
          var ResCode = Res[0].Code;
        } catch (err) {}

        const CatArray = [];
        const ShopArray = [];
        let AllRestaurantsArray = [];

        //All Shops Record
        if (ResCode == "00") {
          if (Array1 != null && typeof Array1 != "undefined") {
            // alert(JSON.stringify(Array1));
            CatList = JSON.parse(Array1).Shops[0];
            ShopObject = CatList.RestaurantsWithCategory;
            AllRestaurantsObject = CatList.AllRestaurants;

            if (CatList != null && typeof CatList != "undefined") {
              // alert(JSON.stringify(CatList))
              if (
                typeof ShopObject != "undefined" ||
                typeof AllRestaurantsObject != "undefined" // this condition in required for DataNotFound
              ) {
                if (ShopObject != null) {
                  ShopArray.push(ShopObject);
                  setCategoriesData(ShopObject);
                } else if (AllRestaurantsObject != null) {
                  AllRestaurantsArray.push(AllRestaurantsObject);
                  setAllRestaurantsData(AllRestaurantsObject);
                }
              } else {
                setRestaurantNotFound(true);

                //Code
                // window.location.href = "/dataNotFound";
                console.log("CC 1");
              }
            } else {
              // console.log('CC 2')
              //Code
            }
          } else {
            window.location.href = "/dataNotFound";
            // console.log('CC 3')
          }
        } else {
          window.location.href = "/dataNotFound";
          // console.log('CC 4')
        }
      } else {
        queryArray = props.query;
        // console.log('CC 5')

        CatURL = `${GetSearchedShops}?SearchedValue=${props.SearchParam}&Header=${props.SearchHeader}&CountryCode=${NewCountryCode}&Lat=${Lat}&Long=${Long}`;

        const fetchCategories = await fetch(CatURL);
        const loadCategories = await fetchCategories.json();
        Array1 = loadCategories.Result.Data;
        console.log(Array1);
        console.log("Array1");
        ArrayRes = loadCategories.Result.Response;
        var Res = JSON.parse(ArrayRes);
        var ResCode = Res[0].Code;
        var ResMessage = Res[0].Message;

        let AllRestaurantsArray = [];

        //All Shops Record
        if (ResCode == "00") {
          //alert(ResCode)
          if (Array1 != null) {
            CatList = JSON.parse(Array1).Shops;
            if (typeof CatList != "undefined") {
              AllRestaurantsArray.push(CatList);
              setSearchRestaurantsData(CatList);
            }
          } else {
            // alert("Main Array Empty");
          }
        } else {
          setshowMessage(ResMessage);
          // window.location.href = "/dataNotFound";
        }
      }
    })();
  }, [CatURL]);
  //Fetch All Categories Carousel & All Restaurants List - End

  // function onRestaurantClick() {}

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 300, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 500, itemsToShow: 3 },
    { width: 786, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 },
  ];

  if (restaurantNotFound) {
    window.scrollTo(0, document.body.scrollHeight);
    return (
      <>
        <DataNotFound />
      </>
    );
  } else {
    // console.log("CC NEW");
  }

  return (
    <>
      {/* <h1>{cartnumber1}</h1> */}
      {/* <ScrollUpButton
        AnimationDuration={500}
      /> */}
      <div
        className="container-fluid"
        id="categories"
        style={{ maxWidth: "100%" }}
      >
        <div className="newcategories" style={{ marginTop: "-120px" }}>
          {/* CATEGORIES PANEL*/}
          {typeof CategoriesData != "undefined" && CategoriesData.length > 0
            ? CategoriesData.map((category) => {
                return (
                  <>
                    <div
                      style={{ textAlign: "left" }}
                      className="col-md-8 col-md-offset-2 section-title"
                    >
                      <h1
                        style={{
                          textAlign: "center",
                          fontFamily: "Poppins-Regular",
                          marginLeft: "53%",
                          fontWeight: "800",
                        }}
                      >
                        {category.Category}
                      </h1>
                    </div>
                    <div className="col-md-12 AllRestaurant">
                      <Carousel
                        // itemsToShow={4}
                        breakPoints={breakPoints}
                        showArrows={true}
                      >
                        {category.Shops.length > 0 ? (
                          category.Shops.map((rest) => {
                            return (
                              <>
                                <RestaurantCard
                                  key={rest.Id}
                                  Id={rest.Id}
                                  ShopImage={rest.ShopImage}
                                  name={rest.StoreName}
                                  // onRestaurantClick={onRestaurantClick}
                                  price={rest.DeliveryFee}
                                  deliveryTime={rest.EstimatedDeliveryTime}
                                  Offer={rest.OfferName}
                                  Currency={rest.Currency}
                                  className="RestaurantCardBox"
                                />
                              </>
                            );
                          })
                        ) : (
                          <Loader />
                        )}
                      </Carousel>
                    </div>
                  </>
                );
              })
            : null}
        </div>
      </div>

      <div className="container-fluid">
        {/* All Restaurants Start */}
        <div className="row">
          <div className="col-md-12" style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: "Poppins-Regular", marginBottom: "65px" }}>
              All Restaurants
            </h2>
          </div>
        </div>

        <div className="row justify-content-md-center">
          <div className="col-md-12" id="AllRestaurantContainer">
            {AllRestaurantsData.map((rest) => {
              return (
                <>
                  <RestaurantCard
                    key={rest.Id}
                    Id={rest.Id}
                    ShopImage={rest.ShopImage}
                    name={rest.StoreName}
                    // onRestaurantClick={onRestaurantClick}
                    price={rest.DeliveryFee}
                    deliveryTime={rest.EstimatedDeliveryTime}
                    Offer={rest.OfferName}
                    Currency={rest.Currency}
                    className="RestaurantCardBox"
                  />
                </>
              );
            })}
          </div>
        </div>
        {/* All Restaurants End */}

        {/* SearchRestaurantsData Start */}
        <div className="row justify-content-md-center">
          {" "}
          <div className="col-md-12" id="AllRestaurantContainer">
            {SearchRestaurantsData.length > 0
              ? SearchRestaurantsData.map((rest) => {
                  return (
                    <>
                      <RestaurantCard
                        key={rest.Id}
                        Id={rest.Id}
                        ShopImage={rest.ShopImage}
                        name={rest.StoreName}
                        // onRestaurantClick={onRestaurantClick}
                        price={rest.DeliveryFee}
                        deliveryTime={rest.EstimatedDeliveryTime}
                        Offer={rest.OfferName}
                        Currency={rest.Currency}
                        className="RestaurantCardBox"
                      />
                    </>
                  );
                })
              : showMessage}
          </div>
        </div>
        {/* SearchRestaurantsData End */}
      </div>
      <br />
      <br />

      <div
        style={{ fontFamily: "Poppins-Regular" }}
        className="container-fluid"
        id="MainContainerDetails"
      >
        <div className="row justify-content-md-center">
          <div className="col-md-12" id="divMainPageDetail">
            <h3 style={{}}>
              Food Delivery in Your City From Only The Best Restaurants
            </h3>
            <p style={{ fontFamily: "Poppins-Regular" }}>
              For those who like good food, exciting new options are now
              available in Karachi. Whether you live in Karachi, or are simply
              enjoying a holiday in the area, culinary delights aplenty are now
              just a simple online order away. The Karachi food delivery service
              has enjoyed a culinary renaissance in recent years, with a
              blossoming of new restaurants and take away eateries on almost
              every street; in fact, there are now literally hundreds of
              restaurants in Karachi, and foodpanda.com is the fastest, easiest
              and most reliable way of locating and ordering from the outlet of
              your choice. And whether you're in the mood for some comfortably
              familiar flavours, or fancy sampling some excitingly exotic dish,
              the meal of your choice is now just a few button clicks away,
              delivered fresh and piping hot to your door.
            </p>

            <h3 style={{}}>Why food delivery from M-Foodz?</h3>
            <p>
              Our team of experts have paid a visit to every restaurant you’ll
              find here, and checked they’re up to our strict standards - only
              Karachi's most beloved spots are here to order from. Quickly place
              and pay for your order online, and find your food delivered
              straight to your door in no time at all.
            </p>

            <h3 style={{}}>Discover the Best Restaurants in Your City</h3>
            <ul id="listMainPage" style={{}}>
              <li>
                - Do you fancy fine, high quality food from an upscale, refined
                eatery?
              </li>
              <li>
                - Then you'll love the Mediterranean, Italian fusion cuisine
                available at Okra restaurant, or Cafe Aylanto.
              </li>
              <li>
                - Maybe you're in the mood for a hearty, beach-style barbecue?
                Kolachi restaurant or BBQ Tonight are ready and willing to
                oblige.
              </li>
              <li>
                - Or perhaps you feel that spice is nice? Saffron or Dumpukht
                are two of the hottest Indian takeaways in town.
              </li>
              <li>
                - And then there is the ultimate in social food, the pizza.
              </li>
              <li>
                - Swap slices of this perennial crowd-pleaser with an order from
                Pompei Italian Restaurant Karachi, or 14th Street Pizza.
              </li>
            </ul>

            <h3 style={{}}>Food for your friends or the office?</h3>
            <p>
              Let us do the hard part of entertaining and bring the food right
              to you and your friends. Alternatively if you need to organize
              some catering for your co-workers, are working late, or want to
              treat the team, you can conveniently order straight to your
              office.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
