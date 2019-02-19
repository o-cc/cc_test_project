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
        if( !err.response.data.detail ) {
          return reject( "获取列表失败" );

        }

        return reject( err.response.data.detail );
      } )
  } )
};


export default {
  getFavoriteHotelLists,

};
