<template>
  <div class="order">
    <div class="banner_tab">
      <div class="banner_tab_btn" type="all" :class="{tab_active: firstTabBtn}" @click="clickFirstTabBtn">全部</div>
      <div class="banner_tab_btn" type="evaluate" :class="{tab_active: secondTabBtn}" @click="clickSecondTabBtn">待评价</div>
      <div class="banner_tab_btn" type="waitIn" :class="{tab_active: lastTabBtn}" @click="clickLastTabBtn">待入住</div>
    </div>

    <div class="order_info" v-if="orderInfo">
      <div @click="goOrderDetail(item)" style="padding-bottom: 0;" v-for="( item, key, index ) in showHotelInfo" :key="index">
        <div class="hotel_info_wrap">
          <div class="img" :style='{background: "url("+item.imgUrl+") no-repeat center center", backgroundSize: "100%"}'></div>
          <div class="hotel_info_txt">
            <p class="hotel_name">{{ formatHotelName( item.hotel_name ) }}</p>
            <p class="hotel_detail">{{ item.date }}</p>
            <p class="hotel_detail">{{ item.room_name}}</p>
            <p class="hotel_detail" style="height: 1rem;line-height: 1rem;">{{ item.total_amount }}</p>
          </div>
        </div>
        <div class="hotel_info_btns">
          <!-- 动态控制宽度 -->
          <p class="left_prompt" :style="{width: computerPromptWidth( item.btn1.hide, item.btn2.hide )}">{{ item.chineseStatus }}</p>
          <div class="order_info_btn"
               :class="{ hide: item.btn1.hide, flex: (!item.btn1.hide) }"
               @click.stop="eventClick(item.btn1.clickEvent, item)"
          >
            {{ item.btn1.text }}
          </div>
          <div class="order_info_btn order_info_btn_active"
            :class="{ hide: item.btn2.hide, flex: (!item.btn2.hide) }"
               @click.stop="eventClick(item.btn2.clickEvent, item)"

          >
            {{ item.btn2.text }}
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import { ButtonTab, ButtonTabItem, AlertModule } from 'vux'

  export default {
    name      : "order",
    components: {
      ButtonTab,
      ButtonTabItem,
      AlertModule
    },
    mounted() {
      let self = this;
      self.run();
    },
    data() {
      return {

        firstTabBtn : true,
        secondTabBtn: false,
        lastTabBtn  : false,

        orderInfo: true,

        //原始数据
        hotelInfoData: [
          {
            type: "evaluate",
            order_id: 2,
            hotel_name: "考拉四季阳光酒店 (中国站)",
            date: "8月9日-8月10日 共一晚",
            image: "./../../../static/imgs/Koala.jpg",
            room_name: "标准双人房",
            "total_amount": "200.00",
            status: "已预订",
            "status": 1,
            btn1: {
                  text: "删除",
                  hide: true,
                  clickEvent: ""
                },
                btn2: {
                  text: "去评价",
                  hide: false,
                  clickEvent: ""
                },
            start_time: "",
            end_time: "",
          },
          {
            type: "waitHotel",
            order_id: 1,
            hotel_name: "考拉四季阳光酒店 (中国站)",
            date: "8月9日-8月10日 共一晚",
            image: "./../../../static/imgs/Koala.jpg",
            room_name: "标准双人房",
            "total_amount": "200.00",
            status: "已预订",
            "status": 1,
            btn1: {
              text: "已评价",
              hide: false,
              clickEvent: ""
            },
            btn2: {
              text: "立即评价",
              hide: true,
              clickEvent: ""
            },
            start_time: "",
            end_time: "",

          }
        ],
        //显示数据
        showHotelInfo: [],

      }

    },

    methods: {
      eventClick( eventClick, item ) {
        let self = this;

        if ( eventClick === "cancelOrder" ) {
          self.cancelOrder( item );
        }

        if ( eventClick === "deleteOrder" ) {
          self.deleteOrder( item );

        }

        if ( eventClick === "goEvaluate" ) {
          self.goEvaluate( item );

        }

        if ( eventClick === "goHotelDetail" ) {
          self.goHotelDetail( item );

        }


      },
      run () {
        let self = this;
        //默认加载所有
        self.getOrderInfoByStatus();
      },

      getOrderInfoByStatus ( status ) {
        let self = this;

        global.globalVal.hotelOrder.getAllOrder( status )
          .then( res => {

            if( Object.prototype.toString.call( res ) !== "[object Array]" ){
              AlertModule.show( {
                title  : '提示',
                content: "获取数据错误"
              } );
              return;
            }

            let tempObj = res;
            console.log( tempObj );

            for( let i = 0; i < tempObj.length; i++ ) {

              for( let j in global.globalVal.globalTips.orderStatusTips ) {
                //j就是 1 2 3 4 5
                if( Number( tempObj[ i ][ "status" ] ) === Number( j ) ) {
                  //添加一个type
                  tempObj[ i ][ "type" ] = global.globalVal.globalTips.orderStatusTips[ j ];
                  tempObj[ i ][ "btn1" ] = global.globalVal.globalTips.orderStatusBtnsTips[ tempObj[ i ][ "status" ] ]["btn1"];
                  tempObj[ i ][ "btn2" ] = global.globalVal.globalTips.orderStatusBtnsTips[ tempObj[ i ][ "status" ] ]["btn2"];
                }
                //需要增加一个中文的提示
                tempObj[ i ][ "chineseStatus" ] = global.globalVal.globalTips.orderStatusChineseTips[ j ];

              }
              //这里需要处理btn1 btn2 简单写点过程化代码吧...

              let startTime = new Date( tempObj[ i ][ "start_time" ] );
              let endTime   = new Date( tempObj[ i ][ "end_time" ] );
              let nightNum  = ( startTime - endTime )/1000/60/60/24;

              let startTimeTemp = (startTime.getMonth() + 1) +"月" + startTime.getDate() + "日";
              let endTimeTemp   = (endTime.getMonth() + 1) +"月" + endTime.getDate() + "日";
              //"8月9日-8月10日 共一晚",
              tempObj[ i ][ "date" ] = startTimeTemp + "-" + endTimeTemp + " 共" + nightNum + "晚";

            }

            //console.log( tempObj );
            /*
            * [{
                "status": 1,
                "total_amount": "200.00",
                "image": "iphone.jpg",
                "hotel_name": "万达嘉华酒店",
                "room_name": "双人豪华房",
                start_time: "",
                end_time: "",

              },]
            * */
            //需要格式化成
            /*
            * [{
                type: "waitHotel",
                hotelName: "考拉四季阳光酒店 (中国站)",
                date: "8月9日-8月10日 共一晚",
                imgUrl: "./../../../static/imgs/Koala.jpg",
                typeRoom: "标准双人房",
                price: "$299",
                status: "已预订",
                btn1: {
                  text: "已评价",
                  hide: false
                },
                btn2: {
                  text: "立即评价",
                  hide: true
                }
              }]
            * */
            self.hotelInfoData = tempObj;
            //默认加载全部订单

            self.showHotelInfo = self.hotelInfoData;

          } )
          .catch( err => {
            AlertModule.show( {
              title  : '提示',
              content: err
            } );
          })



      },

      clickFirstTabBtn() {
        //console.log( "点击第一个" );
        let self = this;

        self.firstTabBtn  = true;
        self.secondTabBtn = false;
        self.lastTabBtn   = false;

      },

      clickSecondTabBtn() {
        let self = this;

        self.firstTabBtn  = false;
        self.secondTabBtn = true;
        self.lastTabBtn   = false;
        //待评价

        self.showHotelInfo = [];

        for( let i = 0; i < self.hotelInfoData.length; i++ ) {

          if( self.hotelInfoData[ i ][ "type" ] === global.globalVal.globalTips.favoriteButtonStatus.showEvaluateHotelInfo ) {
            self.showHotelInfo.push( self.hotelInfoData[ i ] );
          }

        }

      },

      clickLastTabBtn() {
        let self = this;
        self.firstTabBtn  = false;
        self.secondTabBtn = false;
        self.lastTabBtn   = true;


        self.showHotelInfo = [];

        for( let i = 0; i < self.hotelInfoData.length; i++ ) {

          if( self.hotelInfoData[ i ][ "type" ] === global.globalVal.globalTips.favoriteButtonStatus.showWaitHotelInfo ) {
            self.showHotelInfo.push( self.hotelInfoData[ i ] );
          }

        }


      },

      goHotelDetail ( Orderitem ) {
        console.log( '重新预定' );
        //重新预定应该跳转到酒店的详细页面  但是我只有订单, 只能去到首页了哦
        let self = this;
        self.$router.push( "/" );
      },

      deleteOrder ( Orderitem ) {
        console.log( '删除订单' );

        let self = this;
        //删除原始数据中的数据，但是后台并没有提供接口删除订单
        for ( let i = 0; i < self.showHotelInfo.length; i++ ) {

          if( Number( self.showHotelInfo[i][ "order_id" ] ) === Number( Orderitem[ "order_id" ] ) ) {
            //删除这个东西
            self.showHotelInfo.splice( i, 1 );
          }
        }
      },

      goEvaluate ( Orderitem ) {
        console.log( '去评价' );
        let self = this;
        self.$emit( "showHotel", "evaluate" );

      },

      cancelOrder ( Orderitem ) {
        console.log( "取消订单" );
        let self = this;
        for ( let i = 0; i < self.showHotelInfo.length; i++ ) {

          if( Number( self.showHotelInfo[i][ "order_id" ] ) === Number( Orderitem[ "order_id" ] ) ) {
            self.showHotelInfo.splice( i, 1 );
          }
        }

      },

      goOrderDetail ( item ) {
        let self = this;
        console.log( "点击了每个订单" );
        //self.$emit( "showHotel", "orderDetail" );
      },

      formatHotelName ( name ) {

        if( typeof name !== "string" ) {
          return name;
        }

        if( name.length > 10 ) {
          return name.slice( 0,10 ) + "...";
        }

        return name;

      },

      //这个函数动态控制左边文字提示的宽度
      computerPromptWidth ( btn1Status, btn2tatus ) {
        //false 说明都显示  true 说明都隐藏
        if( !btn1Status && !btn2tatus ) {
          //默认50%
            return "50%";
        }

        if( !btn1Status || !btn2tatus ) {
          //只有一个的时候 70%
            return "70%";
        }


      },

    },
  }
</script>

<style scoped lang="less">

  .order {
    width: 100%;
    min-height: 90%;

    .banner_tab {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: .3rem auto;
      font-size: .4rem;

      .banner_tab_btn {
        width: 25%;
        height: 100%;

        line-height: 1rem;
        color: #8b8a99;
        border-radius: 5px;
      }

      .tab_active {
        background-color: #f5b400;
        color: #fff;
      }

    }

    .order_info {
      width: 100%;
      min-height: 90%;

      div {
        width: 95%;
        background-color: #fff;
        margin: 0 auto 0.3rem;
        padding: .2rem 0;

        .hotel_info_wrap {
          width: 95%;
          display: flex;
          margin: 0 auto;
          border-bottom: 1px solid #f6f6f6;

          .img {
            width: 40%;
            background: url("./../../../static/imgs/Koala.jpg") no-repeat center center;
            background-size: 100%;

          }

          .hotel_info_txt {
            width: 60%;
            height: 100%;

            p {
              height: .8rem;
              margin: 0 auto;
              font-size: .2rem;
              text-align: left;
              padding-left: .3rem;

            }

            .hotel_name {
              font-size: 0.45rem;
              font-weight: 600;
              color: #272636;
            }

            .hotel_detail {
              height: .5rem;
              line-height: .5rem;
              color: #a0a1a6;
            }
          }


        }

        .hotel_info_btns {
          width: 90%;
          display: flex;
          justify-content: space-between;
          padding-bottom: 0;

            .left_prompt {
              font-size: .3rem;
              color: #ceced9;
              text-align: left;
              line-height: 1rem;
              margin: 0;
              width: 50%;
            }

            .order_info_btn {
              font-size: .4rem;
              height: .5rem;
              display: flex;
              width: 20%;
              justify-content: center;
              align-items: center;
              background-color: #f8f8f8;
              border-radius: 5px;
            }

            .hide {
              display: none;
            }

            .flex {
              display: flex;
            }

            .order_info_btn_active {
              width: 25%;
              color: #fff;
              background-color: #f5b400;
            }

        }



      }
    }
  }
</style>
