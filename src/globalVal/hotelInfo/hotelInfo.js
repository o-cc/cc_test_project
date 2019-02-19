let axios = require( "axios" );

/*
* params1 city [string] 选择的城市
* params2 input [string] 搜索框内容
* params3 [ Function ] 回调函数
* */
function getHotelInfo( city, input, callback ) {

  axios.get( global.globalVal.httpServerUrl.getHotelInfo, {
    params: {
      city : "增城",
      input: ""
    }
  } )
    .then( res => {
      let data = res.data;
      setHotelInfo( data );
      return callback( null, data );
    } )
    .catch( err => {

      if( !err.response.data.detail ) {
        return callback( "获取酒店失败", null );
      }

      return callback( err.response.data.detail, null );
    } )

};

/*
* params1 [ Number ] 酒店ID
* params2 [ Function ] 回调函数
* */
function getHotelDetailInfoById( id, callback ) {
  axios.get( global.globalVal.httpServerUrl.getHotelInfo + id + "/" )
    .then( res => {

      let data = res.data;
      return callback( null, data );
    } )
    .catch( err => {

      if( !err.response.data.detail ) {
        return callback( "获取酒店信息失败", null );
      }

      return callback( err.response.data.detail, null );
    } )

};

/*
* params1 [ Number ] 酒店ID
* params2 [ Function ] 回调函数
* */
function postAddFavorite( hotelId, callback ) {

  axios.post( global.globalVal.httpServerUrl.favoriteHotel + hotelId + "/hotels/", {}, {
    headers: {
      "Authorization": window.localStorage.getItem( "token" ),
    }
  } )
    .then( function ( res ) {
      return callback( null, true );

    } )
    .catch( function ( err ) {

      if( !err.response.data.message ) {
          return callback( "无法添加收藏", null );
        }

        return callback( err.response.data.message, null );

    } )

};

/*
* params1 [ Function ] 回调函数
* */
function getFavoriteHotelIds( callback ) {

  axios.get( global.globalVal.httpServerUrl.AllfavoriteHotelId, {
    headers: {
      "Authorization": window.localStorage.getItem( "token" )
    }
  } )
    .then( function ( res ) {
      //{"collected_hotels_id": [ 1, 2 ]}
      let data = res.data;
      return callback( null, data );

    } )
    .catch( function ( err ) {

      if( !err.response.data.detail ) {
        return callback( "无法获取收藏", null );
      }

      return callback( err.response.data.detail, null );
    } )

};

/*
* params1 [ Number ] 酒店ID
* params2 [ Function ] 回调函数
* */
function postCancelFavorite( hotelId, callback ) {

  axios.delete( global.globalVal.httpServerUrl.favoriteHotel + hotelId + "/hotels/", {
    headers: {
      "Authorization": window.localStorage.getItem( "token" ),
    }
  } )
    .then( function ( res ) {
      return callback( null, true );

    } )
    .catch( function ( err ) {

      if( !err.response.data.detail ) {
        return callback( "无法取消收藏", null );
      }

      return callback( err.response.data.detail, null );
    } )

};



//=============分割线===================

let hotelInfo = undefined;

function setHotelInfo( hotelinfo ) {
  hotelInfo = hotelinfo;
};

function getHotelInfoIncache() {
  return hotelInfo;
};

let hotelPageVueObj = null;

function getHotelPageVueObj() {
  return hotelPageVueObj;
};

function setHotelPageVueObj( obj ) {
  hotelPageVueObj = obj;
};

//hotel的临时变量 可变的 这里保存hotelId 因为酒店详细页面导入了
const hotelTempInfo = {
  hotelId         : null,
  showHomePageComp: null,
  hotelRoomInfo   : null
};

//怎么觉得es6的写法有点丑陋？
export default {

  hotelInfoSingleOne: {
    getHotelInfoIncache,
    setHotelInfo,
    setHotelPageVueObj,
    getHotelPageVueObj,
    hotelTempInfo
  },

  getHotelInfo,
  getHotelDetailInfoById,
  postAddFavorite,
  postCancelFavorite,
  getFavoriteHotelIds

}
