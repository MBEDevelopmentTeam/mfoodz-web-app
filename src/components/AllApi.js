let GoogleKey = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBoggmNYAGO4585YCVDhYsQOrr_YLl_pYs`;

const LiveAPI = "https://api.m-foodz.com";

const Developement = "http://172.16.100.199:8083";
const QA = "http://172.16.100.151:8003";

let GetRideTypesApi = `  ${QA}/api/MRide/GetRideTypes`;
let GetEstimatedRideAmountApi = `  ${QA}/api/MRide/GetEstimatedRideAmount?RideTypeId=`;
let ConfirmRideApi = `  ${QA}/api/MRide/CustomerRequestingRide`;
let CouponValidationApi = `  ${QA}/api/MRide/CouponValidation?CustomerId=`;
let CustomerLoginApi = `  ${QA}/api/MRide/CustomerLogin`;
let CustomerSignupApi = `  ${QA}/api/MRide/CustomerSignup`;
let changeOtpFlagApi = `  ${QA}/api/MRide/VerifyVerificationStatus`;
let GetRideHistory = `  ${QA}/api/MRide/GetRideHistory`;
let SaveLocations = `  ${QA}/api/MRide/SaveLocationForCustomer`;
let GetProfile = `  ${QA}/api/MRide/GetCustomerProfile?CustomerId=`;
let EditProfile = `  ${QA}/api/MRide/EditCustomerProfile`;
let ChangePass = `  ${QA}/api/MRide/ChangePasswordForCustomer?CustomerId=`;
let RideStatus = `  ${QA}/api/MRide/CustomerGettingRideStatusAndDetail`;
let LocateNearestDrivers = `  ${QA}/api/MRide/LocateNearestDrivers`;
let GetSavedAndRecentLocations = `  ${QA}/api/MRide/GetSavedAndRecentLocationsForCustomer`;
let LogOutApi = `  ${QA}/api/MRide/Logout`;
let GetRideHistoryDetail = `  ${QA}/api/MRide/GetRideHistoryDetail`;
let EditCustomerProfile = `  ${QA}/api/MRide/EditCustomerProfile`;
let GetHelpForCustomer = `  ${QA}/api/MRide/GetHelpForCustomer`;
let WalletBalance = `  ${QA}/api/MRide/WalletBalance`;
let WalletHistory = `  ${QA}/api/MRide/WalletTransactionHistory`;
let CustomerRatingDriver = `  ${QA}/api/MRide/CustomerRatingDriver`;
let CancelRideFromCustomer = `  ${QA}/api/MRide/CancelRideFromCustomer`;
let DeliveryTypes = `  ${QA}/api/MRide/GetDeliveryTypes`;
let FPassApi = `  ${QA}/api/MRide/ForgotPwdForCustomer`;
let GetDriverLocations = `  ${QA}/api/MRide/GetDriverLocation`;
let GetSubRideTypes = `  ${QA}/api/MRide/GetSubRideTypes`;
let EmergencyAlertOfCustomer = `  ${QA}/api/MRide/EmergencyAlertOfCustomer`;
let SaveCardInfoOfCustomer = `  ${QA}/api/MRide/SaveCardInfoOfCustomer`;
let GetCardInfoOfCustomer = `  ${QA}/api/MRide/GetCardInfoOfCustomer`;
let RemoveCustomerCard = `  ${QA}/api/MRide/RemoveCustomerCard`;
let RemoveLocationOfCustomer = `  ${QA}/api/MRide/RemoveLocationOfCustomer`;
let GetRideTypesForDashboard = `  ${QA}/api/MRide/GetRideTypesForDashboard`;
let OTPVerification = `  ${QA}/api/MRide/OTPVerificationOfCustomer`;
let PwdVerificationOfCustomer = `  ${QA}/api/MRide/PwdVerificationOfCustomer`;
let GetCountries = `  ${QA}/api/MRide/GetCountries`;
let ReferralIdVerificationForCustomer = `  ${QA}/api/MRide/ReferralIdVerificationForCustomer`;
let TipAmountCustomer = `  ${QA}/api/MRide/CustomerRatingDriverAndTip`;
let SendReferralCode = `  ${QA}/api/MRide/SendReferralCode`;
let TermsAndConditionapi = `  ${QA}/api/MRide/GetTermsAndConditions`;
let savedlocationsfromdb = `  ${QA}/api/MRide/SaveSearchedLocation`;
let presavedlocationfromourdb = `  ${QA}/api/MRide/SearchLocation`;
// Foods
let GetCategory = `  ${QA}/api/MRide/GetCategory`;
let GetAllShop = `  ${QA}/api/Mride/GetAllShop`;
let HeadersBanners = `  ${QA}/api/MRide/HeadersBanners?DeviceID=1`;
let getShopMenu = `  ${QA}/api/MFoodz/GetShopMenu`;
let getallshopswithradius = `  ${QA}/api/MFoodz/GetAllShopsWithCategoriesByRadius`;
let ShopsSearchedfromDB = `  ${QA}/api/MFoodz/SearchMFoodz`;
let GetSearchedShops = `  ${QA}/api/MFoodz/GetSearchedShops`;
let ShopSubMenu = `  ${QA}/api/MFoodz/GetShopSubMenu`;
let FoodOrderHistory = `  ${QA}/api/MFoodz/GetOrderHistoryForCust`;
let FoodDashBoard = `  ${QA}/api/MFoodz/GetAllShopsWithCategoriesByRadius`;
let confirmfoodorder = `  ${QA}/api/MFoodz/CustomerOrderingMFoodz`;
let GetFoodOrderHistoryforCustomer = `  ${QA}/api/MFoodz/GetOrderHistoryForCust`;
let GettingOrderStatus = `  ${QA}/api/MFoodz/CustGettingOrderStatus`;
let GetShopDetailsandReviews = `  ${QA}/api/MFoodz/GetShopDetailAndReviews`;
let postOrderDetailsandReviews = `  ${QA}/api/MFoodz/CustRatingMFoodzOrder`;
let GetFavShops = `  ${QA}/api/MFoodz/GetFavouriteShops`;
let GetMissedCallNumber = `  ${QA}/api/MRide/GetMissedCallNumber`;
// let AddFavShops = `  ${QA}/api/MFoodz/AddShopToFavourite`;
let AddRemoveFavShops = `  ${QA}/api/MFoodz/AddRemoveShopToFavourite`;
const GetCancelReasons = `  ${QA}/api/MRide/GetCancelReasons? ${QA}TypeId=2&ReasonType=2`;
const InsertCancelReason = `  ${QA}/api/MRide/InsertCancelReason`;
const CancelOrderFromCust = `  ${QA}/api/MFoodz/CancelOrderFromCust`;
const GetNoServicePageData = `  ${QA}/api/MFoodz/GetNoServicePageData`;

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
