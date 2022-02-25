import React from "react";
import "./MainPage.css";
import { Header } from "../Header/Header";

import { RestaurantsList } from "../RestaurantsList/RestaurantsList";
import { Container } from "../Container/Container";
import { CategoryPanel } from "../CategoryPanel/CategoryPanel";
import Modal from "../Modal/Modal";
import { ControlledCarousel } from "../Carousel/ControlledCarousel";
import { connect } from "react-redux";
import MapModal from "./MapModal";
import { updatedStore } from "../../index";
import {
  addtocart,
  restInfoDisplay,
  subMenu,
  openCartPanel,
  mainPathTrue,
  emptycart,
  headerPathTrue,
} from "../../actions";

import { useDispatch, useSelector } from "react-redux";
// import sliderImage from "../../img/slider.jpg";
// import { SearchPanel } from "../SearchPanel/SearchPanel";
// import { resolveConfigFile } from "prettier";
// import { Header } from "../Header/Header";
// import { HeaderPanel } from "../Header/HeaderPanel";
// import { ResturanShowOffer } from "../RestaurantSpOffers/ResturanShowOffer";
// import MainPageTopSilder from "../MainPageTopSilder/MainPageTopSlider";
// import { addressModalShow } from "../../actions";
// import FooterManePage from "./Footer";

let SearchValue = null;
let SearchHeader = null;
let SearchCountryCode = null;
let SearchLat = null;
let SearchLong = null;
let queryArray = [];
let CountryCode = localStorage.getItem("CountryCode");
var Lat = localStorage.getItem("lat", Lat);
var Long = localStorage.getItem("lng", Long);

if ((CountryCode = "PK")) {
  CountryCode = "92";
} else {
  CountryCode = "1";
}

export function Toolbar(props) {
  updatedStore.dispatch(addtocart());
  queryArray = props;
  // alert(queryArray)
  // console.log("props");
  // console.log(props);
  // alert("0");
  document.querySelectorAll('[aria-haspopup="listbox"]')[0].id = "FoodSearchId";
  return (
    <div>
      <ThemedButton theme={props.login} />
    </div>
  );
}

class ThemedButton extends React.Component {
  componentWillMount = () => {
    // alert("1");
  };

  render() {
    return (
      <RestaurantsList
        searchValue={this.props.theme}
        filterTags={this.filterTags}
        filterCategories={this.filterCategories}
      />
    );
  }
}

class MainPage extends React.PureComponent {
  constructor(props) {
    super(props);

    const Param = new URLSearchParams(this.props.location.search).get(
      "SearchedValue"
    );
    const Header = new URLSearchParams(this.props.location.search).get(
      "Header"
    );
    const CountryCode = new URLSearchParams(this.props.location.search).get(
      "CountryCode"
    );
    const Lat = new URLSearchParams(this.props.location.search).get("Lat");
    const Long = new URLSearchParams(this.props.location.search).get("Long");
    if (SearchValue == null) {
      SearchValue = Param;
      SearchHeader = Header;
      SearchCountryCode = CountryCode;
      SearchLat = Lat;
      SearchLong = Long;
    }
    // console(queryArray);

    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      searchValue: null,
      isModalOpen: false,
      searchHeader: null,
      ViewCarousel: true,
    };

    this.componentDidMount = this.componentDidMount.bind(this);

    // let mp = useSelector((state) => state.mainpath);
  }

  //this.componentDidMount = this.componentDidMount.bind(this);

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // alert("mainpage update ");
    }
  }

  componentDidMount = () => {
    const that = this;
    const tt = document.addEventListener("click", function() {
      if (window.location.pathname == "/main") {
        var IdOfInput = document.querySelectorAll(
          '[aria-haspopup="listbox"]'
        )[0].id;
      }
      if (IdOfInput == "FoodSearchId") {
        //alert(1);
        var Lat = localStorage.getItem("lat", Lat);
        var Long = localStorage.getItem("lng", Long);

        if (queryArray.length != 0 && SearchValue != queryArray.login) {
          var serchQuerry = queryArray.login;
          var headerID = queryArray.id;
          // SearchValue = serchQuerry;
          //  SearchHeader = headerID;

          //that.faltu();

          that.setState({ searchValue: serchQuerry });
          that.setState({ searchHeader: headerID });
          that.setState({ SearchLat: Lat });
          that.setState({ SearchLong: Long });
          document.querySelectorAll('[aria-haspopup="listbox"]')[0].id =
            "test!23";

          that.setState({ ViewCarousel: false });
          that.setState({ ViewCarousel: true });
          // console.log(this.state.searchHeader);
        }
      }
    });
  };

  toggleModal() {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  }

  addSearchInput = (value) => {
    // alert(value);
    this.setState({ searchValue: value });
  };

  filterTags = (restaurant) => {
    for (let i = 0; i < restaurant.tags.length; i++) {
      if (
        restaurant.tags[i].name
          .toLowerCase()
          .includes(this.state.searchValue.toLowerCase()) ||
        restaurant.tags[i].uuid
          .toLowerCase()
          .includes(this.state.searchValue.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  };

  filterCategories = (restaurant) => {
    for (let i = 0; i < restaurant.categories.length; i++) {
      if (
        restaurant.categories[i].name
          .toLowerCase()
          .includes(this.state.searchValue.toLowerCase()) ||
        restaurant.categories[i].uuid
          .toLowerCase()
          .includes(this.state.searchValue.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  };

  render() {
    // if (localStorage.getItem("UserStatus") === "true") {
    // alert("this check is runing from main page (redirecting to '/' page)");
    // alert(localStorage.getItem("UserStatus"));
    // }
    const { ViewCarousel } = this.state;
    // const dispatch = useDispatch();

    updatedStore.dispatch(mainPathTrue());
    updatedStore.dispatch(headerPathTrue());

    return (
      <>
        {this.props.store.headerPath ? <Header /> : null}

        <div className="main-page">
          {/* <h1>{this.props.store.cartnumber}</h1> */}
          {/* <Header /> */}
          {/* <MainPageTopSilder /> */}
          <Container>
            <CategoryPanel />

            {/* <button onClick={this.toggleModal}>Open modal dialog</button> */}

            {/* <div><h6 class="fj fk gj mm"> Popular Near You</h6></div> */}
            {/* <SearchPanel onInputChange={this.addSearchInput} />   */}
            {ViewCarousel ? (
              <ControlledCarousel
                SearchParam={this.state.searchValue}
                SearchHeader={this.state.searchHeader}
                SearchCountryCode={SearchCountryCode}
                SearchLat={SearchLat}
                SearchLong={SearchLong}
              />
            ) : null}
            <div>
              <Modal
                isOpen={this.state.isModalOpen}
                onClose={this.toggleModal}
              ></Modal>
            </div>

            {/* <FooterManePage/> */}
          </Container>

          <Modal
            isOpen={this.props.store.addressmodal}
            // isOpen={true}
          >
            <MapModal />
          </Modal>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    store: state,
  };
}
export default connect(
  mapStateToProps,
  null
)(MainPage);
