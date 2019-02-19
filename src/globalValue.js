import globalTips from "./globalVal/globalTips"
import formatDate from "./tool/formatDate"
import oauth      from "./globalVal/oauth/oauth"
import userInfo   from "./globalVal/userInfo/userInfo"
import hotelInfo  from "./globalVal/hotelInfo/hotelInfo"
import searchPage from "./globalVal/searchPage/searchPage"
import hotelOrder from "./globalVal/hotelOrder/hotelOrder"

let httpUrl       = "http://127.0.0.1:8000/api/";
let httpServerUrl = {};
let accessToken   = {
  token: window.localStorage.token
};

httpServerUrl.login                = httpUrl + "authorizations/";
httpServerUrl.checkusername        = httpUrl + "usernames/";
httpServerUrl.userRegister         = httpUrl + "users/";
httpServerUrl.checkuserInfo        = httpUrl + "users/infos/";
httpServerUrl.getHotelInfo         = httpUrl + "hotels/";
httpServerUrl.favoriteHotel        = httpUrl + "collects/";
httpServerUrl.AllfavoriteHotelId   = httpUrl + "collects/hotels/";
httpServerUrl.AllfavoriteHotel     = httpUrl + "collects/";
httpServerUrl.getOrderInfo         = httpUrl + "orders/";

let globalValue = {
  globalTips,
  formatDate,
  oauth,
  httpServerUrl,
  accessToken,
  userInfo,
  hotelInfo,
  searchPage,
  hotelOrder

};

export default globalValue;
