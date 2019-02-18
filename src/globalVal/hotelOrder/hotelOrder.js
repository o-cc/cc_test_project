let axios = require( "axios" );

function getOrderInfoByRoomId ( roomId ) {
  let pre = new Promise( function ( resolve, reject ) {

    axios.get( global.globalVal.httpServerUrl.gethotelInfo + roomId + "/rooms/",
      {
        headers: {
          "Authorization": window.localStorage.getItem( "token" ),
        }
      } )
      .then( res => {
        /*
        * {
          "name": "双人豪华房",  # 房间名称
          "price": "200.00",  # 单价
          "default_image_url": "http://127.0.0.1/images/iphone.jpg",  # 房间默认图片
          "insurance": "0.00",  # 住宿意外险
          "hotel_name": "万达嘉华酒店",  # 酒店名称
          "types": [  # 房间类型识别键列表
            {
              "name": "七天可退",  # 房间类型识别键名
              "color": "green"  # 房间类型识别键颜色
            }
          ]
        }
        * */
        let data = res.data;
        return resolve( data );

      })
      .catch( err => {
        return reject( err );
      })


  });

  return pre;

};


function postOrder () {

  return new Promise( (resolve, reject) => {

    axios.post( global.globalVal.httpServerUrl.getHotelInfo, {
      "name"      : "huang",
      "count"     : 2,
      "start_time": "2018-12-1",
      "number"    : 5,
      "end_time"  : "2018-12-2",
      "room_id"   : 2,
      "mobile"    : "13155667788",
      "stayInfos" : [
        { "name": "欧珍惜", "IDNum": "440825199808033656" },
        { "name": "wfwe", "IDNum": "440825199808033656" }
      ]
    }, {
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
        return reject( err );

      })

  } )

};

export default {
  getOrderInfoByRoomId,
  postOrder
};
