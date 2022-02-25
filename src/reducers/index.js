import cartNumber from "./cartNumber";
import restautrantInfo from "./restaurantInfo";
import { finalAddress } from "./deliveryPanel";
import subMenu from "./subMenu";
import cartPanel from "./cartPanel";
import addressModal from "./addressModal";
import personalDetails from "./personalDetails";
import shopLat from "./shopLat";
import shopLong from "./shopLong";
import dropOffLat from "./dropOffLat";
import dropOffLong from "./dropOffLong";
import cameraLat from "./cameraLat";
import cameraLong from "./cameraLong";
import dname from "./dname";
import dlat from "./dlat";
import dlong from "./dlong";
import deliveryMap from "./deliveryMap";
import windowWidth from "./windowWidth";
import mainPath from "./mainPath";
import getFinalAddress from "./getFinalAddress";
import getCurrentAddress from "./getCurrentLocation";
import chatIconStatus from "./chatIconStatus";
import chatNumber from "./chatNumber";
import currentOrderStatus from "./currentOrderStatus";
import { combineReducers } from "redux";
import headerPath from "./headerPath";
import finalOrderQueue from "./finalOrderQueue";

const allReducers = combineReducers({
  cartnumber: cartNumber,
  restinfo: restautrantInfo,
  finaladdress: finalAddress,
  submenu: subMenu,
  cartpanel: cartPanel,
  addressmodal: addressModal,
  personaldetails: personalDetails,
  shopLat: shopLat,
  shopLong: shopLong,
  dropOffLat: dropOffLat,
  dropOffLong: dropOffLong,
  cameraLat: cameraLat,
  cameraLong: cameraLong,
  dname: dname,
  dlat: dlat,
  dlong: dlong,
  deliverymap: deliveryMap,
  windowwidth: windowWidth,
  mainpath: mainPath,
  getFinalAddress: getFinalAddress,
  getCurrentAddress: getCurrentAddress,
  chatIconStatus: chatIconStatus,
  chatNumber: chatNumber,
  currentOrderStatus: currentOrderStatus,
  headerPath: headerPath,
  finalOrderQueue: finalOrderQueue,
});
export default allReducers;
