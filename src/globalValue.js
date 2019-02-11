import globalTips from "./globalVal/globalTips"
import formatDate from "./tool/formatDate"
import oauth from "./globalVal/oauth/oauth"

let httpUrl         = "http://127.0.0.1:8000/api/";
let httpServerUrl   = {};
let accessToken     = {
  token: ""
};


httpServerUrl.login         = httpUrl + "authorizations/";
httpServerUrl.checkusername = httpUrl + "usernames/";
httpServerUrl.userRegister  = httpUrl + "users/";

let globalValue = {
  globalTips   : globalTips,
  formatDate   : formatDate,
  oauth        : oauth,
  httpServerUrl: httpServerUrl,
  accessToken  : accessToken
};

export default globalValue;
