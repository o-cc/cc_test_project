let axios = require( "axios" );

function getOrderInfoByRoomId ( roomId ) {
  let pre = new Promise( function ( resolve, reject ) {

    axios.get( global.globalVal.httpServerUrl.getOrderInfo + roomId + "/rooms/",
      {
        headers: {
          "Authorization": window.localStorage.getItem( "token" ),
        }
      } )
      .then( res => {
        let data = res.data;
        return resolve( data );

      })
      .catch( err => {
        if( !err.response.data.detail ) {
          return reject( "无法提交订单" );
        }

        return reject( err.response.data.detail );

      })


  });

  return pre;

};


function postOrder ( data ) {

  return new Promise( (resolve, reject) => {

    axios.post( global.globalVal.httpServerUrl.getOrderInfo, data, {
      headers: {
        "Authorization": window.localStorage.getItem( "token" ),
      }
    })
      .then( res => {
        let data = res.data;
        //{ "order_id": "201822312323421312" }
        return resolve( data );

    })
      .catch( err => {
        if( !err.response.data.detail ) {
          return reject( "订单交易失败" );
        }

        return reject( err.response.data.detail );

      })

  } )

};

export default {
  getOrderInfoByRoomId,
  postOrder
};
