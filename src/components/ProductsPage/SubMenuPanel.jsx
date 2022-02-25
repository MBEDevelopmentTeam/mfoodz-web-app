import React from "react";
import "./SubMenuPanel.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { connect } from "react-redux";

import { updatedStore } from "../../index";

import { subMenu } from "../../actions";

import { ShopSubMenu } from "../AllApi";
import { subMenuObject } from "./ProductsPage";

class SubMenuPanel extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      // open: false,
      // drinks: [
      //   "pepsi",
      //   "dew",
      //   "fanta",
      //   "sting",
      //   "coke",
      //   "mirinda",
      //   "barbican",
      //   "malt",
      //   "pakola",
      // ],
      // meats: ["roasted", "not roasted", "spicy", "backed", "chilli one"],
      subMenuItems: [],
    };
  }

  getSubMenuItems = async (MENUID, SUBMENUID) => {
    var SubMenuURL = `${ShopSubMenu}?MenuId=${MENUID}&SubMenuId=${SUBMENUID}`;

    let submenudata;
    let SubMenuTitleList;
    try {
      let response = await fetch(SubMenuURL);

      let responseParse = await response.json();

      submenudata = JSON.parse(JSON.stringify(responseParse.Result.Data));

      SubMenuTitleList = JSON.parse(submenudata);

      // subMenuItems = SubMenuTitleList.ShopSubMenu[0].SubMenu;

      this.setState({
        subMenuItems: SubMenuTitleList.ShopSubMenu[0].SubMenu,
      });

      // console.log(this.state.subMenuItems);
    } catch (err) {
      console.log(err);
    }
  };

  // componentDidMount() {
  //   // alert("mount");
  // }

  render() {
    this.getSubMenuItems(subMenuObject.menuItemId, subMenuObject.submenuId);
    return (
      <>
        {/* <button
          className="button"
          onClick={() => {
            this.setState({ open: true });
          }}
        >
          SubMenu Panel
        </button> */}

        <Modal
          open={this.props.display}
          // open={true}
        >
          <button
            onClick={() => {
              // this.setState({ open: false });
              updatedStore.dispatch(subMenu());
            }}
            className="subMenu__closeBTN"
          >
            &#10006;
          </button>

          <div className="subMenu__mainPanel">
            <div className="subMenu__headerImage">
              <img
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                // src={require("./Images/bannerImage_panda.jpg")}
                src={subMenuObject.restImage}
              />
            </div>

            <div className="subMenu__panel-one">
              <div className="submenu__restaurantName">
                <p>{subMenuObject.restName}</p>
              </div>

              {this.state.subMenuItems.map((value) => {
                return (
                  <MenuItemList
                    tilte={value.Name}
                    menuID={value.MenuId}
                    submenuID={value.SubMenuId}
                    selectionType={1}
                    // options={this.state.meats}
                  />
                );
              })}
            </div>

            <div className="subMenu__panel-two">
              <button className="subMenu__addToCart">Add to Cart</button>
            </div>
          </div>
        </Modal>
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
)(SubMenuPanel);

class MenuItemList extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      listItems: 5,
      submenulist: [],
    };
  }

  async getSubMenuLists(menuid, submenuid) {
    // console.log("id's");
    // console.log(menuid);
    // console.log(submenuid);
    var SubMenuURL = `${ShopSubMenu}?MenuId=${menuid}&SubMenuId=${submenuid}`;

    let submenudata;
    let SubMenuTitleList;
    try {
      let response = await fetch(SubMenuURL);

      let responseParse = await response.json();

      submenudata = JSON.parse(JSON.stringify(responseParse.Result.Data));

      SubMenuTitleList = JSON.parse(submenudata);

      // subMenuItems = SubMenuTitleList.ShopSubMenu[0].SubMenu;

      this.setState({
        submenulist: SubMenuTitleList.ShopSubMenu[0].SubMenu,
      });

      // console.log("submenulists");
      console.log(this.state.submenulist);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    this.getSubMenuLists(this.props.menuID, this.props.submenuID);
    return (
      <>
        <div className="item-list__Box">
          <div className="item-list__title">
            <p>{this.props.tilte}</p>
          </div>

          <div className="item-list__options">
            <ul className="listPanel">
              {this.state.submenulist.map((list) => {
                return <SubMenuList title={"list.Name"} />;
              })}
            </ul>

            <span className="list__view-more">
              <i class="fas fa-angle-down"></i>
              View More
            </span>
          </div>
        </div>
      </>
    );
  }
}

//selectionType
//title

class SubMenuList extends React.PureComponent {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <>
        <li
          style={{
            display: "grid",
            gridTemplateColumns: "40px auto",
          }}
        >
          {this.props.selectionType == 1 ? (
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                className="option__radio"
                type="radio"
                name={this.props.title}
              />
            </span>
          ) : null}

          {this.props.selectionType == 2 ? (
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                className="option__radio"
                type="checkbox"
                name={this.props.title}
              />
            </span>
          ) : null}

          {/* <label className="option__name">{item}</label> */}
        </li>
      </>
    );
  }
}
