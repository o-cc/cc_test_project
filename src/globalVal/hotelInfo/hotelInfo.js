let axios = require( "axios" );

let hotelInfo = undefined;

function setHotelInfo ( hotelinfo ) {

  hotelInfo = hotelinfo;
};


function getHotelInfoIncache () {
  return hotelInfo;

};
function getHotelInfo ( city, input, callback ) {

  axios.get( global.globalVal.httpServerUrl.getHotelInfo, {
    params: {
      city: city,
      input: input
    }
  })
    .then( res => {
      let data = res.data;

      callback( null, data );
      setHotelInfo( data );
    })
    .catch( err => {
      console.log( err );
      callback( err, null );
    })

};

export default {

  getHotelInfo,

  hotelInfoSingleOne: {

    getHotelInfoIncache,
    setHotelInfo
  }
}
