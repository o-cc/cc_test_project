const axios = require( "axios" );

let userInfoIncache = {

  getUserInfo: getUserInfo,
  setUserInfo: setUserInfo

};

let userInfoObj = {};
function getUserInfo () {
   return userInfoObj;
};


function setUserInfo ( userInfo ) {
  userInfoObj = userInfo;
};


let userInfo = {
  userInfoIncache: userInfoIncache
};

userInfo.getUserInfo = function ( callback ) {

  axios.get( global.globalVal.httpServerUrl.checkuserInfo, {

    headers: {
      "Authorization": global.globalVal.accessToken.token
    }

  } )
    .then( res => {
      let msg = res.data;
      /*{
      //  "nickname": "huang",
      //  "mobile": "13155667788",
      //  "gender": 1,
      //  "user_pic": ""}
      */

      setUserInfo( msg );
      return callback( null, msg );

    } )
    .catch( err => {
      console.log( err );
      return callback( err, null );
    } )
};

/*
* param1 [ String ] 用户名
* param2 [ String ] 手机
* param3 [ String ] 性别
* param4 [ String ] 图片base64编码
* */
userInfo.putUserInfo = function ( username, phone, gender, userPic, callback ) {

  axios.put( global.globalVal.httpServerUrl.checkuserInfo, {

    data   : {
      "nickname": username,
      "mobile"  : phone,
      "gender"  : gender === "男" ? 1 : 0,
      "user_pic": userPic
    },
    headers: {
      "Authorization": global.globalVal.accessToken.token
    }
  } )
    .then( res => {
      let msg = res.data;
      //{"id":7,"nickname":"huang","user_pic":null,"gender":1,"mobile":"13155667788"}
      setUserInfo( msg );
      return callback( null, msg );

    } )
    .catch( err => {

      return callback( err, null );
    } )
};

export default userInfo;
