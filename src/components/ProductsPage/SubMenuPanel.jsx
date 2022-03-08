import React from "react";
import "./SubMenuPanel.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { connect } from "react-redux";

import { updatedStore } from "../../index";

import { subMenu } from "../../actions";

import { ShopSubMenu } from "../AllApi";
import { baseMenuItems, subMenuObject, Selectitem } from "./ProductsPage";

// let CC = localStorage.getItem("CountryCode");
// console.log(CC);

function closeSubmenuPanel() {
  multipleItemArray = [];
  singleItemArray = [];
  radioBoxObject = {};
  updatedStore.dispatch(subMenu());
}

let multipleItemArray = [];

function handleCheckBox(
  parentName,
  submenuid,
  name,
  amount,
  isparent,
  MenuId,
  selectornumber
) {
  var checkBoxObject = {};
  if (multipleItemArray.length == 0) {
    checkBoxObject = {};
    checkBoxObject.itemID = submenuid;
    checkBoxObject.itemName = name;
    checkBoxObject.itemPrice = amount;
    checkBoxObject.itemIsParent = isparent;
    checkBoxObject.itemSelectorNumber = selectornumber;

    multipleItemArray.push(checkBoxObject);
    // alert(JSON.stringify(multipleItemArray));
  } else {
    checkBoxObject = {};
    var dontadd = 0;
    for (let a = 0; a < multipleItemArray.length; a++) {
      if (multipleItemArray[a].itemName == name) {
        // alert(name);
        multipleItemArray.splice(a, 1);
        dontadd = 1;
        break;
      }
    }
    if (dontadd == 0) {
      checkBoxObject = {};
      checkBoxObject.itemID = submenuid;
      checkBoxObject.itemName = name;
      checkBoxObject.itemPrice = amount;
      checkBoxObject.itemIsParent = isparent;
      checkBoxObject.itemSelectorNumber = selectornumber;
      multipleItemArray.push(checkBoxObject);
      // alert(JSON.stringify(multipleItemArray));
    }
  }
}

let singleItemArray = [];
var radioBoxObject = {};

function handleRadioBox(
  parentName,
  submenuid,
  name,
  amount,
  isparent,
  MenuId,
  selectornumber
) {
  let newEntry = 1;
  if (singleItemArray.length == 0) {
    // alert("brand new object");
    radioBoxObject[parentName] = {
      itemID: submenuid,
      itemName: name,
      itemPrice: amount,
      itemIsParent: isparent,
      itemSelectorNumber: selectornumber,
    };

    singleItemArray.push(radioBoxObject);

    // alert("1" + JSON.stringify(singleItemArray));
  } else {
    for (let [key, value] of Object.entries(radioBoxObject)) {
      if (key == parentName) {
        radioBoxObject[key] = {
          itemID: submenuid,
          itemName: name,
          itemPrice: amount,
          itemIsParent: isparent,
          itemSelectorNumber: selectornumber,
        };

        newEntry = 0;
        // alert("sameParent with different object");
        // alert("2" + JSON.stringify(singleItemArray));
        break;
      }
    }

    if (newEntry == 1) {
      // alert("different parent with new object");
      radioBoxObject[parentName] = {
        itemID: submenuid,
        itemName: name,
        itemPrice: amount,
        itemIsParent: isparent,
        itemSelectorNumber: selectornumber,
      };

      // alert("3" + JSON.stringify(singleItemArray));
    }
  }
}

function addSubMenuToCart() {
  let allSubmenuItems = [];

  if (multipleItemArray.length != 0) {
    // alert(JSON.stringify(multipleItemArray));
    allSubmenuItems = [...multipleItemArray];
    multipleItemArray = [];
  }

  if (singleItemArray.length != 0) {
    singleItemArray = [];
    for (let i in radioBoxObject) {
      singleItemArray.push({
        itemID: radioBoxObject[i].itemID,
        itemName: radioBoxObject[i].itemName,
        itemPrice: radioBoxObject[i].itemPrice,
        itemIsParent: radioBoxObject[i].itemIsParent,
        itemSelectorNumber: radioBoxObject[i].itemSelectorNumber,
      });
    }

    allSubmenuItems = [...singleItemArray];
    singleItemArray = [];
    radioBoxObject = {};
    // alert(JSON.stringify(singleItemArray));
    // alert(JSON.stringify(singleItemArray));
  }
  Selectitem(baseMenuItems, allSubmenuItems);

  // alert(JSON.stringify(allSubmenuItems));
  allSubmenuItems = null;
  updatedStore.dispatch(subMenu());
}

class SubMenuPanel extends React.PureComponent {
  constructor() {
    super();

    this.state = {
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

      // console.log(this.state.subMenuItems); //////this console is for category of names submenu items
    } catch (err) {
      console.log(err);
    }
  };

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
              closeSubmenuPanel();
            }}
            className="subMenu__closeBTN"
          >
            &#10006;
          </button>

          <div className="subMenu__mainPanel">
            <div className="subMenu__headerImage">
              <img
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                    title={value.Name}
                    description={value.Description}
                    menuID={value.MenuId}
                    submenuID={value.SubMenuId}
                  />
                );
              })}
            </div>

            <div className="subMenu__panel-two">
              <button
                className="subMenu__addToCart"
                onClick={() => {
                  addSubMenuToCart();
                }}
              >
                Add to Cart
              </button>
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
      listItems: 100,
      submenulist: [],
      selectorType: null,
      selectorNumber: null,
    };
  }

  async getSubMenuLists(menuid, submenuid) {
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
        // selectorType: SubMenuTitleList.ShopSubMenu[0].SelectorType,
        selectorNumber: SubMenuTitleList.ShopSubMenu[0].SelectorNumber,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    this.getSubMenuLists(this.props.menuID, this.props.submenuID);
    // console.log("this is menu item list!");
    return (
      <>
        <div className="item-list__Box">
          <div className="item-list__title">
            <p>{this.props.title}</p>
            {/* <h6>
              {this.state.selectorNumber < 1
                ? "Optional"
                : " (" + this.state.selectorNumber + ") " + "Required"}
            </h6> */}
          </div>

          <div className="item-list__options">
            <ul className="listPanel">
              <SubMenuList
                submenuSublist={this.state.submenulist}
                // selectorType={this.state.selectorType}
                selectorNumber={this.state.selectorNumber}
                parentName={this.props.title}
                listItemLimit={this.state.listItems}
              />
            </ul>

            {this.state.submenulist.length > this.state.listItems ? (
              <span
                className="list__view-more"
                onClick={() => {
                  this.setState({
                    listItems: 100,
                  });
                }}
              >
                View More
              </span>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

class SubMenuList extends React.PureComponent {
  constructor() {
    super();

    this.state = {};
  }

  firstSelect = 0;
  render() {
    // var allRadios = document.querySelectorAll(
    //   `input[name="${this.props.parentName}"]`
    // );
    let options = this.props.submenuSublist;

    let selectorNumber = this.props.selectorNumber;

    // console.log(options); // this console is for list of list of category item in submneu

    return (
      <>
        {options.splice(0, this.props.listItemLimit).map((subItem, index) => {
          // window.console.log("index");
          // window.console.log(index);

          if (this.firstSelect == 0) {
            if (index === 0) {
              handleRadioBox(
                this.props.parentName,
                subItem.SubMenuId,
                subItem.Name,
                subItem.Amount,
                subItem.IsParent,
                subItem.MenuId,
                selectorNumber
              );
              this.firstSelect = 1;
              // allRadios[index].checked = true;
              // let radio0 = document.querySelector(".option__radio");
              // radio0.checked = true;
            }
          }

          return (
            <>
              <li
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px auto",
                }}
              >
                {/* RADIO BOX CONDITION STARTS FROM HERE */}

                {selectorNumber <= 1 ? (
                  <>
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
                        name={this.props.parentName}
                        onClick={() => {
                          handleRadioBox(
                            this.props.parentName,
                            subItem.SubMenuId,
                            subItem.Name,
                            subItem.Amount,
                            subItem.IsParent,
                            subItem.MenuId,
                            selectorNumber
                          );
                        }}
                      />
                    </span>

                    <div className="subItem_details">
                      <label className="option__name">{subItem.Name}</label>
                      <label className="option__name">
                        {subMenuObject.currencyType + "." + subItem.Amount}
                      </label>
                    </div>
                  </>
                ) : null}

                {/* CHECKBOX CONDITION STARTS FROM HERE */}

                {selectorNumber > 1 ? (
                  <>
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
                        id={subItem.Name}
                        value={subItem.Name}
                        onClick={() => {
                          handleCheckBox(
                            this.props.parentName,
                            subItem.SubMenuId,
                            subItem.Name,
                            subItem.Amount,
                            subItem.IsParent,
                            subItem.MenuId,
                            selectorNumber
                          );
                        }}
                      />
                    </span>

                    <div className="subItem_details">
                      <label className="option__name">{subItem.Name}</label>
                      <label className="option__name">
                        {subMenuObject.currencyType + "." + subItem.Amount}
                      </label>
                    </div>
                  </>
                ) : null}
              </li>
            </>
          );



          
        })}
      </>
    );
  }
}
