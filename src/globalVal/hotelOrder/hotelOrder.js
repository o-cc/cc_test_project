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

/*用户获取所有的订单列表
* param1 [ Number ] 查询什么订单
*   status: {
    1  # 待入住
    2  # 已入住
    3  # 待评价
    4  # 已评价
    5  # 已取消
    }
* */
function getAllOrder ( status ) {

  return new Promise( (resolve, reject) => {

    axios.get( global.globalVal.httpServerUrl.getOrderAllInfo, {

      params : {
        status : status
      },
      headers: {
        "Authorization": window.localStorage.getItem( "token" ),
      }
    } )
      .then( res => {

        let data = res.data;
        return resolve( data );

      } )
      .catch( err => {
        if( !err.response.data.detail ) {
          return reject( "无法获取订单" );
        }

        return reject( err.response.data.detail );


      })

  } );
}

let orderInfoTemp = null;
function getOrderInfoTemp () {
 return orderInfoTemp;
}

function setOrderInfoTemp ( orderInfo ) {
  orderInfoTemp = orderInfo;
};


function postOrderEvalute ( data ) {

  return new Promise( ((resolve, reject) => {
    axios.post( global.globalVal.httpServerUrl.orderEvalute, data, {
      headers: {
        "Authorization": window.localStorage.getItem( "token" ),
      }
    })
      .then( res => {
        return resolve( res.data );
      })
      .catch( err => {
        if( !err.response.data.detail ) {

          return reject( "无法评价" );
        }
        return reject( err.response.data );
      })


  }))
}

export default {
  getOrderInfoByRoomId,
  postOrder,
  getAllOrder,
  getOrderInfoTemp,
  setOrderInfoTemp,

  postOrderEvalute
};
