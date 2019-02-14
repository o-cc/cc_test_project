let axios = require( "axios" );

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

    })
    .catch( err => {
      console.log( err );

      callback( err, null );
    })

};

export default {
  getHotelInfo,
}
