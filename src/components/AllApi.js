let GoogleKey = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBoggmNYAGO4585YCVDhYsQOrr_YLl_pYs`;

const LiveAPI = "https://api.m-foodz.com";

const Developement = "http://172.16.100.199:8083";
const QA = "http://172.16.100.151:8003";

let GetRideTypesApi = `  ${LiveAPI}/api/MRide/GetRideTypes`;
let GetEstimatedRideAmountApi = `  ${LiveAPI}/api/MRide/GetEstimatedRideAmount?RideTypeId=`;
let ConfirmRideApi = `  ${LiveAPI}/api/MRide/CustomerRequestingRide`;
let CouponValidationApi = `  ${LiveAPI}/api/MRide/CouponValidation?CustomerId=`;
let CustomerLoginApi = `  ${LiveAPI}/api/MRide/CustomerLogin`;
let CustomerSignupApi = `  ${LiveAPI}/api/MRide/CustomerSignup`;
let changeOtpFlagApi = `  ${LiveAPI}/api/MRide/VerifyVerificationStatus`;
let GetRideHistory = `  ${LiveAPI}/api/MRide/GetRideHistory`;
let SaveLocations = `  ${LiveAPI}/api/MRide/SaveLocationForCustomer`;
let GetProfile = `  ${LiveAPI}/api/MRide/GetCustomerProfile?CustomerId=`;
let EditProfile = `  ${LiveAPI}/api/MRide/EditCustomerProfile`;
let ChangePass = `  ${LiveAPI}/api/MRide/ChangePasswordForCustomer?CustomerId=`;
let RideStatus = `  ${LiveAPI}/api/MRide/CustomerGettingRideStatusAndDetail`;
let LocateNearestDrivers = `  ${LiveAPI}/api/MRide/LocateNearestDrivers`;
let GetSavedAndRecentLocations = `  ${LiveAPI}/api/MRide/GetSavedAndRecentLocationsForCustomer`;
let LogOutApi = `  ${LiveAPI}/api/MRide/Logout`;
let GetRideHistoryDetail = `  ${LiveAPI}/api/MRide/GetRideHistoryDetail`;
let EditCustomerProfile = `  ${LiveAPI}/api/MRide/EditCustomerProfile`;
let GetHelpForCustomer = `  ${LiveAPI}/api/MRide/GetHelpForCustomer`;
let WalletBalance = `  ${LiveAPI}/api/MRide/WalletBalance`;
let WalletHistory = `  ${LiveAPI}/api/MRide/WalletTransactionHistory`;
let CustomerRatingDriver = `  ${LiveAPI}/api/MRide/CustomerRatingDriver`;
let CancelRideFromCustomer = `  ${LiveAPI}/api/MRide/CancelRideFromCustomer`;
let DeliveryTypes = `  ${LiveAPI}/api/MRide/GetDeliveryTypes`;
let FPassApi = `  ${LiveAPI}/api/MRide/ForgotPwdForCustomer`;
let GetDriverLocations = `  ${LiveAPI}/api/MRide/GetDriverLocation`;
let GetSubRideTypes = `  ${LiveAPI}/api/MRide/GetSubRideTypes`;
let EmergencyAlertOfCustomer = `  ${LiveAPI}/api/MRide/EmergencyAlertOfCustomer`;
let SaveCardInfoOfCustomer = `  ${LiveAPI}/api/MRide/SaveCardInfoOfCustomer`;
let GetCardInfoOfCustomer = `  ${LiveAPI}/api/MRide/GetCardInfoOfCustomer`;
let RemoveCustomerCard = `  ${LiveAPI}/api/MRide/RemoveCustomerCard`;
let RemoveLocationOfCustomer = `  ${LiveAPI}/api/MRide/RemoveLocationOfCustomer`;
let GetRideTypesForDashboard = `  ${LiveAPI}/api/MRide/GetRideTypesForDashboard`;
let OTPVerification = `  ${LiveAPI}/api/MRide/OTPVerificationOfCustomer`;
let PwdVerificationOfCustomer = `  ${LiveAPI}/api/MRide/PwdVerificationOfCustomer`;
let GetCountries = `  ${LiveAPI}/api/MRide/GetCountries`;
let ReferralIdVerificationForCustomer = `  ${LiveAPI}/api/MRide/ReferralIdVerificationForCustomer`;
let TipAmountCustomer = `  ${LiveAPI}/api/MRide/CustomerRatingDriverAndTip`;
let SendReferralCode = `  ${LiveAPI}/api/MRide/SendReferralCode`;
let TermsAndConditionapi = `  ${LiveAPI}/api/MRide/GetTermsAndConditions`;
let savedlocationsfromdb = `  ${LiveAPI}/api/MRide/SaveSearchedLocation`;
let presavedlocationfromourdb = `  ${LiveAPI}/api/MRide/SearchLocation`;
// Foods
let GetCategory = `  ${LiveAPI}/api/MRide/GetCategory`;
let GetAllShop = `  ${LiveAPI}/api/Mride/GetAllShop`;
let HeadersBanners = `  ${LiveAPI}/api/MRide/HeadersBanners?DeviceID=1`;
let getShopMenu = `  ${LiveAPI}/api/MFoodz/GetShopMenu`;
let getallshopswithradius = `  ${LiveAPI}/api/MFoodz/GetAllShopsWithCategoriesByRadius`;
let ShopsSearchedfromDB = `  ${LiveAPI}/api/MFoodz/SearchMFoodz`;
let GetSearchedShops = `  ${LiveAPI}/api/MFoodz/GetSearchedShops`;
let ShopSubMenu = `  ${LiveAPI}/api/MFoodz/GetShopSubMenu`;
let FoodOrderHistory = `  ${LiveAPI}/api/MFoodz/GetOrderHistoryForCust`;
let FoodDashBoard = `  ${LiveAPI}/api/MFoodz/GetAllShopsWithCategoriesByRadius`;
let confirmfoodorder = `  ${LiveAPI}/api/MFoodz/CustomerOrderingMFoodz`;
let GetFoodOrderHistoryforCustomer = `  ${LiveAPI}/api/MFoodz/GetOrderHistoryForCust`;
let GettingOrderStatus = `  ${LiveAPI}/api/MFoodz/CustGettingOrderStatus`;
let GetShopDetailsandReviews = `  ${LiveAPI}/api/MFoodz/GetShopDetailAndReviews`;
let postOrderDetailsandReviews = `  ${LiveAPI}/api/MFoodz/CustRatingMFoodzOrder`;
let GetFavShops = `  ${LiveAPI}/api/MFoodz/GetFavouriteShops`;
let GetMissedCallNumber = `  ${LiveAPI}/api/MRide/GetMissedCallNumber`;
// let AddFavShops = `  ${LiveAPI}/api/MFoodz/AddShopToFavourite`;
let AddRemoveFavShops = `  ${LiveAPI}/api/MFoodz/AddRemoveShopToFavourite`;
const GetCancelReasons = `  ${LiveAPI}/api/MRide/GetCancelReasons? ${LiveAPI}TypeId=2&ReasonType=2`;
const InsertCancelReason = `  ${LiveAPI}/api/MRide/InsertCancelReason`;
const CancelOrderFromCust = `  ${LiveAPI}/api/MFoodz/CancelOrderFromCust`;
const GetNoServicePageData = `  ${LiveAPI}/api/MFoodz/GetNoServicePageData`;

const encodeFormData = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export {
  GoogleKey,
  GetRideTypesApi,
  GetEstimatedRideAmountApi,
  ConfirmRideApi,
  CouponValidationApi,
  CustomerLoginApi,
  CustomerSignupApi,
  changeOtpFlagApi,
  GetRideHistory,
  SaveLocations,
  GetProfile,
  EditProfile,
  ChangePass,
  RideStatus,
  LocateNearestDrivers,
  GetSavedAndRecentLocations,
  LogOutApi,
  GetRideHistoryDetail,
  EditCustomerProfile,
  GetHelpForCustomer,
  WalletBalance,
  WalletHistory,
  CustomerRatingDriver,
  CancelRideFromCustomer,
  DeliveryTypes,
  FPassApi,
  GetDriverLocations,
  GetSubRideTypes,
  EmergencyAlertOfCustomer,
  SaveCardInfoOfCustomer,
  GetCardInfoOfCustomer,
  RemoveCustomerCard,
  RemoveLocationOfCustomer,
  GetRideTypesForDashboard,
  OTPVerification,
  PwdVerificationOfCustomer,
  TermsAndConditionapi,
  GetCategory,
  GetFavShops,
  AddRemoveFavShops,
  GetMissedCallNumber,
  GetAllShop,
  GetShopDetailsandReviews,
  postOrderDetailsandReviews,
  confirmfoodorder,
  HeadersBanners,
  getShopMenu,
  getallshopswithradius,
  ShopsSearchedfromDB,
  //   getShopsbyHeaderAPI,
  ShopSubMenu,
  GettingOrderStatus,
  GetFoodOrderHistoryforCustomer,
  FoodOrderHistory,
  GetCountries,
  ReferralIdVerificationForCustomer,
  SendReferralCode,
  TipAmountCustomer,
  savedlocationsfromdb,
  presavedlocationfromourdb,
  FoodDashBoard,
  GetSearchedShops,
  GetCancelReasons,
  InsertCancelReason,
  CancelOrderFromCust,
  GetNoServicePageData,
  fetch_url_encoded,
};

export default encodeFormData;

const fetch_url_encoded = function(API, params) {
  let BODY = encodeFormData(params);
  var promise = new Promise(function(resolve, reject) {
    fetch(API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: BODY,
    })
      .then((res) => res.json())
      .then((json) => {
        let { Result } = json;
        // console.log(Result);
        // console.log(`Result Coded`);
        resolve(Result);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return promise;
};
