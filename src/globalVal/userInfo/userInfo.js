const axios = require( "axios" );

let userInfoIncache = {

  getUserInfo: getUserInfo,
  setUserInfo: setUserInfo

};

let userInfoObj = {};

function getUserInfo() {
  return userInfoObj;
};

function setUserInfo( userInfo ) {
  userInfoObj = userInfo;
};

let userInfo = {
  userInfoIncache: userInfoIncache
};

userInfo.getUserInfo = function ( callback ) {

  axios.get( global.globalVal.httpServerUrl.checkuserInfo, {

    headers: {
      "Authorization": window.localStorage.getItem( "token" )
    }

  } )
    .then( res => {
      let msg = res.data;
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
userInfo.putUserInfo = function ( username, phone, userPic, gender, callback ) {

  //这里由于后台验证是multipart/form-data原因需要使用form表单的方式提交，但是我偏不！
  var data = new FormData();

  if ( userPic ) {
    data.append( "user_pic", userPic );
  }

  if ( gender ) {
    data.append( "gender", gender === "男" ? 1 : 0 );
  }

  if ( phone ) {
    data.append( "mobile", phone );
  }

  if ( username ) {
    data.append( "nickname", username );
  }

  axios.put( global.globalVal.httpServerUrl.checkuserInfo, data, {
      headers: {
        "Authorization": window.localStorage.getItem( "token" ),
      }
    }
  )
    .then( res => {
      let msg = res.data;
      //{"id":7,"nickname":"huang","user_pic":null,"gender":1,"mobile":"13155667788"}
      return callback( null, msg );

    } )
    .catch( err => {

      return callback( err, null );
    } )
};

export default userInfo;
