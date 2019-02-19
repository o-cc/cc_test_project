let axios = require( "axios" );
let qs    = require( 'qs' );
//let jq    = require( "jquery" );
/*
用户登录操作
* @param1 username [ String ] 用户名
* @param2 password [ String ] 密码
* */
function userLogin( username, password, callback ) {

  axios( {
    method : 'post',
    url    : global.globalVal.httpServerUrl.login,
    data   : JSON.stringify( {
      username: username,
      password: password
    } ),
    headers: {
      "Content-Type": 'application/json',
    }
  } )
    .then( function ( res ) {
    //{"username":"huang","user_id":6,"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imh1YW5nIiwiZXhwIjoxNTQ4Mzk5MTM4LCJ1c2VyX2lkIjo2LCJlbWFpbCI6IiJ9.mzwhgxZTHbGcv2gpvt1ReZcIMaz1ORDW8PoyUjJFJm8"}
    let msg = res.data;
    if ( !msg.token ) {
      return callback( "登录失败", null );
    }

    window.localStorage.setItem( "token",  "JWT " + msg.token );
    return callback( null, true );

  } )
    .catch( function ( err ) {
      if( !err.response.data.detail ) {
        return callback( "登录失败", null );
      }

      return callback( err.response.data.detail, null );

    } )

};

function checkUserNameIsSingleOne( username, callback ) {

  axios.get( global.globalVal.httpServerUrl.checkusername + username + "/" )
    .then( function ( res ) {
      //{"count":0,"username":"huang"}
      let data = res.data;
      if( typeof data.count !== "number" ) {

        return callback ( "无法验证用户名", null );
      }

      if( data.count ) {
        return callback ( "用户名已存在", null );
      }

      return callback( null, true );

    } )
    .catch( function ( err ) {

      if( !err.response.data.detail ) {
        return callback( "无法验证用户名", null );
      }

      return callback( err.response.data.detail, null );

    } )
};


function userRegister ( username, password, password2, callback ) {

  axios.post( global.globalVal.httpServerUrl.userRegister, {
    username: username,
    password: password,
    password2: password2
  } )
    .then( function ( res ) {
      //{"id":6,"username":"huang", "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imh1YW5nIiwiZXhwIjoxNTQ4Mzk4ODkwLCJ1c2VyX2lkIjo2LCJlbWFpbCI6IiJ9.6l8L4TObFqnsMY5yMVFnYnqztrsMrurRhi9H9j6eA1s"}
      let data = res.data;
      if( !data.token ) {
        console.log("获取token验证失败");
        return callback( "无法获取必备验证", null );
      }

      window.localStorage.setItem( "token",  "JWT " + data.token );
      return callback( null, true );


    })
    .catch( function ( err ) {

      if( !err.response.data.detail ) {
        return callback( "注册失败", null );
      }

      return callback( err.response.data.detail, null );

    })

};
export default {

  userLogin               : userLogin,
  checkUserNameIsSingleOne: checkUserNameIsSingleOne,
  userRegister            : userRegister
}

