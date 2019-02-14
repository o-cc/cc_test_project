import globalTips from "./globalVal/globalTips"
import formatDate from "./tool/formatDate"
import oauth      from "./globalVal/oauth/oauth"
import userInfo   from "./globalVal/userInfo/userInfo"
import hotelInfo  from "./globalVal/hotelInfo/hotelInfo"

let httpUrl       = "http://127.0.0.1:8000/api/";
let httpServerUrl = {};
let accessToken   = {
  token: ""
};

httpServerUrl.login         = httpUrl + "authorizations/";
httpServerUrl.checkusername = httpUrl + "usernames/";
httpServerUrl.userRegister  = httpUrl + "users/";
httpServerUrl.checkuserInfo = httpUrl + "users/infos/";
httpServerUrl.getHotelInfo  = httpUrl + "hotels/";


let globalValue = {
  globalTips,
  formatDate: formatDate,
  oauth,
  httpServerUrl,
  accessToken,
  userInfo,
  hotelInfo

};

export default globalValue;
