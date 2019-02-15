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
      city: "增城",
      input: "万达"
    }
  })
    .then( res => {
      let data = res.data;

      callback( null, data );
      setHotelInfo( data );
    })
    .catch( err => {
      callback( err, null );
    })

};

let hotelPageVueObj = null;
function getHotelPageVueObj () {
  return hotelPageVueObj;

};

function setHotelPageVueObj ( obj ) {
  hotelPageVueObj = obj;

};

/*
* params1 [ Number ] 酒店ID
* params2 [ Function ] 回调函数
* */
function getHotelDetailInfoById ( id, callback ) {
  axios.get( global.globalVal.httpServerUrl.getHotelInfo + id +"/" )
    .then( res => {

      /*{
        "id": 1,  # 酒店id
        "name": "万达嘉华酒店",  # 酒店名称
        "image": "http://127.0.0.1/images/ix.jpg",  # 酒店图片
        "place": "广州市增城增城广场南",  # 酒店地址
        "types": [
        {
          "name": "速定",  # 酒店类型关键字
        "color": "red"  # 关键字识别颜色
        }
      ],
        "desc_detail": "<p>威风威风</p>\r\n\r\n<p><img src=\"http://127.0.0.1/images/2019/01/24/1.png\" style=\"height:764px; width:1293px\" /></p>",  # 酒店详细介绍
        "hotel_rooms": [  # 酒店房间列表
        {
          "id": 2,  # 房间id
        "name": "双人豪华房",  # 房间名称
        "price": "200.00",  # 房间价格
        "default_image_url": "http://127.0.0.1/images/iphone.jpg",  # 房间默认图片
        "types": [
        {
          "name": "七天可退",  # 房间类型关键字
        "color": "green"  # 关键字识别颜色
        }
      ]
      }
      ],
        "comments": [  # 评论列表
        {
          "star": 5,  # 评论星级
        "stay_time": "2019年01月",  # 入住时间
        "text": "nwwnvine",  # 评论内容
        "username": "huang",  # 用户名
        "user_pic": ""  # 用户头像
        }
      ]
      }*/

      let data = res.data;
      callback( null, data );
    })
    .catch( err => {
      callback( err, null );
    })

};


const hotelTempInfo = {
  hotelId: null
};

export default {

  getHotelInfo,

  hotelInfoSingleOne: {

    getHotelInfoIncache,
    setHotelInfo,
    setHotelPageVueObj,
    getHotelPageVueObj,
    hotelTempInfo
  },

  getHotelDetailInfoById



}
