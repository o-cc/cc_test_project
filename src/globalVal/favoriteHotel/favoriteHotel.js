let axios = require( "axios" );

/*
* 获取用户收藏的列表
* */
function getFavoriteHotelLists () {

  return new Promise( (resolve, reject) => {
    axios.get( global.globalVal.httpServerUrl.AllfavoriteHotel, {
      headers: {
        "Authorization": window.localStorage.getItem( "token" )
      }
    } )
      .then( res => {

            let data = res.data;
            return resolve( data );
      } )
      .catch( err => {
          return reject( err );
      } )
  } )
};


export default {
  getFavoriteHotelLists,

};
