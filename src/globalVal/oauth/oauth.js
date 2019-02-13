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
  } ).then( function ( res ) {
    //{"username":"huang","user_id":6,"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imh1YW5nIiwiZXhwIjoxNTQ4Mzk5MTM4LCJ1c2VyX2lkIjo2LCJlbWFpbCI6IiJ9.mzwhgxZTHbGcv2gpvt1ReZcIMaz1ORDW8PoyUjJFJm8"}
    let msg = res.data;
    if ( !msg.token ) {
      alert( "无法获取token验证" );
      return callback( false );
    }

    global.globalVal.accessToken.token = "JWT " + msg.token;
    return callback( true );

  } ).catch( function ( err ) {
    console.log( err );
    return callback( false );

  } )

};

function checkUserNameIsSingleOne( username, callback ) {

  axios.get( global.globalVal.httpServerUrl.checkusername + username + "/" )
    .then( function ( res ) {
      //{"count":0,"username":"huang"}
      if( typeof res.count !== "number" ) {

        return callback ( "无法验证用户名", null );
      }

      if( res.count ) {
        return callback ( "用户名已存在", null );
      }

      return callback( null, true );

    } )
    .catch( function ( err ) {
      return callback( "无法验证用户名", null );

    } )

  //
  //jq.ajax({
  //  url: "http://127.0.0.1:8000/api/usernames/huang/",
  //  method: "GET",
  //  'Content-Type': 'application/json',
  //  success ( res ) {
  //    console.log( res );
  //  },
  //  error ( err ) {
  //
  //    console.log( err );
  //  }
  //})
};


function userRegister ( username, password1, password2, callback ) {

  axios.post( global.globalVal.httpServerUrl.userRegister, qs.stringify({
    username: username,
    password1: password1,
    password2: password2
  }) )
    .then( function ( res ) {
      //{"id":6,"username":"huang", "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imh1YW5nIiwiZXhwIjoxNTQ4Mzk4ODkwLCJ1c2VyX2lkIjo2LCJlbWFpbCI6IiJ9.6l8L4TObFqnsMY5yMVFnYnqztrsMrurRhi9H9j6eA1s"}
      let data = res.data;
      if( !data.token ) {
        console.log("获取token验证失败");
        return callback( "无法获取必备验证", null );
      }

      global.globalVal.accessToken.token = "JWT " + data.token;

      return callback( null, true );


    })
    .catch( function ( err ) {
      console.log( err );
      return callback( "无法注册", null );

    })

};
export default {

  userLogin               : userLogin,
  checkUserNameIsSingleOne: checkUserNameIsSingleOne,
  userRegister            : userRegister
}

