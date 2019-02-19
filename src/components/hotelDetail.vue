<template>
  <div class="hotel_detail_info">
    <div class="top_icon">
      <Arrow direction="left" @click.native="goBack"></Arrow>
      <p @click="clickFavorite" class="favorite" :style="{backgroundImage: favoriteImg}"></p>
    </div>

    <div class="top_img">
      <div class="swiper-container" style="height: 100%;">
        <div class="swiper-wrapper">
          <img class="swiper-slide" :src="hotelInfo.image" alt="">
          <!--<img class="swiper-slide" src="./../../static/imgs/Chrysanthemum.jpg" alt="">-->
          <!--<img class="swiper-slide" src="./../../static/imgs/Penguins.jpg" alt="">-->

        </div>

        <div class="swiper-pagination"></div>
      </div>

    </div>

    <div class="hotel_all_detail">
      <div class="hotel_center">
        <!--地址介绍-->
        <div class="hotel_info">

          <div class="hotel_item">
            <!--<p class="price">{{ hotelInfo.price }}</p>-->

            <div class="hotel_introduce">
              <p class="hotel_name">{{ hotelInfo.name }}</p>
              <p class="hotel_tag">
                 <span style="background: #fff1cc;color:#f7b500;" v-for="(type, index) in hotelInfo.types"
                       v-bind:style="{color: type.color,background: colorRgb( type.color?type.color:'#000000' ) }">{{ type.name }}</span>
              </p>
              <p class="hotel_address">
                <!--<span style="color: #f9c558;">{{ item.score }}分</span>-->
                <!--<span class="circle"></span>-->
                <!--<span>{{ item.evaluate }}条评价</span>-->
                <!--<span class="circle"></span>    -->
                <span>{{ hotelInfo.place }}</span>
              </p>

            </div>
          </div>

        </div>
        <!-- 房间介绍 -->
        <div class="hotel_all_room">
          <div @click="roomClick(room, index)" :class="{room_border: index === roomBorder}" class="hotel_room"
               v-for="( room, index ) in hotelInfo.hotel_rooms"
               :key="room.id">
            <div :style="{backgroundImage: 'url('+ room.default_image_url +')' }" class="room_img"></div>
            <div class="room_name">
              <p>{{ room.name }}</p>
              <p class="roo_desc" v-html="room.desc"></p>
              <p class="room_price">
                <span v-if="room.types.length<1"></span>
                <span style="background: #fff1cc;color:#f7b500;" v-for="(type, index) in room.types"
                      v-bind:style="{color: type.color,background: colorRgb( type.color?type.color:'#000000' ) }">{{ type.name }}</span>
                <span style="background: #fff1cc;color:#f7b500;font-size: 0.4rem;">{{ room.price }}</span>
              </p>
            </div>
          </div>
        </div>
        <!--评论-->
        <div class="discuss">
          <div class="discuss_title">
            近期热评
          </div>

          <div class="discuss_item" v-if="showDefailDiscuss(index)" v-for="(item, index) in hotelInfo.comments">

            <div class="discuss_head_img">
              <div class="head_img" :style="{backgroundImage: item.user_pic}"></div>
            </div>
            <div class="discuss_item_info">
              <div class="item_name">
                <div>{{ item.username }}</div>
                <div class="item_time">{{item.stay_time}}</div>
              </div>
              <div class="item_detail_info">
                <div class="user_discuss">
                  {{ item.text }}
                </div>
                <div class="user_start">
                  <p v-for="star in item.star"></p>
                  <p class="star_by_empty" v-for="star in (item.star<5)?(5-item.star):0"></p>

                </div>
              </div>
            </div>
          </div>
          <div class="show_all_discuss" v-if="allDiscuss" @click="showAllDiscuss">
            <div>
              全部{{ hotelInfo.comments.length }}条评论
            </div>

          </div>

        </div>

        <div class="search_center">
          <div class="discuss_title">
            入离日期
          </div>
          <div class="date_picker">
            <group>
              <calendar title="title" v-model="dateTimeValue" :display-format="formatDate"
                        @on-change="dateChange" :start-date="startDate"></calendar>
            </group>
          </div>

          <div class="date_txt">
            <p class="first_date">
              <span>{{ firstDateObj.date }}</span>
              <span style="color:#bfbec6;padding-left: .1rem;font-size: 0.3rem">{{ firstDateObj.weekDay}}</span>

            </p>
            <p class="cent_p">
              {{totalDay}}
            </p>
            <p class="last_date">
              <span> {{ lastDateObj.date }}</span>
              <span style="color:#bfbec6;padding-left: .1rem;font-size: 0.3rem">{{lastDateObj.weekDay}}</span>
            </p>
          </div>

        </div>

        <div class="room_device">
          <div class="discuss_title">
            配套设施
          </div>

          <div class="room_device_items">
            <div class="device_item">
              <div class="item_icon">
                <img src="./../../static/imgs/wifi.png" class="icon_img" alt="">

              </div>
              <p>wifi</p>
            </div>

            <div class="device_item">
              <div class="item_icon">
                <img src="./../../static/imgs/电视.png" class="icon_img" alt="">
              </div>
              <p>电视</p>
            </div>

            <div class="device_item">
              <div class="item_icon">
                <img src="./../../static/imgs/空调.png" class="icon_img" alt="">

              </div>
              <p>空调</p>
            </div>
            <div class="device_item">
              <div class="item_icon">
                <img src="./../../static/imgs/冰箱.png" class="icon_img" alt="">
              </div>
              <p>冰箱</p>
            </div>
            <div class="device_item">
              <div class="item_icon">
                <img src="./../../static/imgs/42+.png" class="icon_img" alt="">

              </div>
              <p>全部</p>
            </div>
          </div>
        </div>


        <div class="room_device">
          <div class="discuss_title">
            入住须知
          </div>

          <div class="entry_tips">
            <div class="item_tips">
              <p style="font-size: 0.1rem;">入住时间</p>
              <p style="color: #838493;font-size: 0.3rem;">14:00以后</p>

            </div>
            <div class="item_tips">
              <p style="font-size: 0.1rem;">退房时间</p>
              <p style="color: #838493;font-size: 0.3rem;">12:00以后</p>

            </div>
            <div class="item_tips">
              <p style="font-size: 0.1rem;">最少入住</p>
              <p style="color: #838493;font-size: 0.3rem;">1天</p>

            </div>
            <div class="item_tips">
              <p style="font-size: 0.1rem;">接待时间</p>
              <p style="color: #838493;font-size: 0.3rem;">00:00-24:00</p>

            </div>
            <div class="item_tips">
              <p style="font-size: 0.1rem;">线下押金</p>
              <p style="color: #838493;font-size: 0.3rem;">￥300</p>

            </div>
            <div class="item_tips">
              <p style="font-size: 0.1rem;">其他</p>
              <p style="color: #838493;font-size: 0.3rem;">15项</p>

            </div>
          </div>
        </div>

      </div>

      <div class="book_btn" @click="goOrder">
        <i></i>
        <p>立即预订</p>
      </div>
    </div>

  </div>


</template>

<script>
  import Arrow from "./childComponents/topArrow"
  import Swiper from "swiper"

  import { Confirm, AlertModule, Flexbox, FlexboxItem, PopupPicker, Calendar, Group, Search } from 'vux'

  export default {
    name      : "hotelDetail",
    components: {
      Arrow,
      Flexbox,
      FlexboxItem,
      PopupPicker,
      Calendar,
      Group,
      Search,
      AlertModule,
      Confirm
    },

    mounted() {
      this.run();
    },

    data() {
      return {
        hotelInfo      : {
          "id"         : 1,
          "name"       : "万达嘉华酒店",
          "image"      : "http://127.0.0.1/images/timg.jpg",
          "place"      : "广州市增城增城广场南",
          "types"      : [
            {
              "name" : "速定",
              "color": "red"
            },
            {
              "name" : "七天可退",
              "color": "green"
            },
            {
              "name" : "超干净",
              "color": null
            }
          ],
          "desc_detail": "<p>威风威风</p>",
          "hotel_rooms": [
            {
              "id"               : 2,
              "name"             : "双人豪华房",
              "price"            : "200.00",
              "default_image_url": "./../../static/imgs/Koala.jpg",
              "types"            : [
                {
                  "name" : "七天可退",
                  "color": "#ffff00"
                },
                {
                  "name" : "七天可退",
                  "color": "#ffff00"
                }
              ]
            },
            {
              "id"               : 3,
              "name"             : "单人房",
              "price"            : "150.00",
              "default_image_url": "http://127.0.0.1/images/iphone_Wx92j0r.jpg",
              "types"            : [
                {
                  "name" : "七天可退",
                  "color": "green"
                }
              ]
            }
          ],
          "comments"   : [
            {
              "star"     : 5,
              "stay_time": "2019年01月",
              "text"     : "我知道我的未来不是梦我认真的过每一分钟 我的未来不是噩梦 我的新跟着希望在动 跟着希望在动",
              "username" : "huang",
              "user_pic" : "http://127.0.0.1/images/timg.jpg"
            },
            {
              "star"     : 5,
              "stay_time": "2019年01月",
              "text"     : "我知道我的未来不是梦我认真的过每一分钟 我的未来不是噩梦 我的新跟着希望在动 跟着希望在动",
              "username" : "huang",
              "user_pic" : "http://127.0.0.1/images/timg.jpg"
            },
            {
              "star"     : 5,
              "stay_time": "2019年01月",
              "text"     : "我知道我的未来不是梦我认真的过每一分钟 我的未来不是噩梦 我的新跟着希望在动 跟着希望在动",
              "username" : "huang",
              "user_pic" : "http://127.0.0.1/images/timg.jpg"
            },
            {
              "star"     : 5,
              "stay_time": "2019年01月",
              "text"     : "我知道我的未来不是梦我认真的过每一分钟 我的未来不是噩梦 我的新跟着希望在动 跟着希望在动",
              "username" : "huang",
              "user_pic" : "http://127.0.0.1/images/timg.jpg"
            },
            {
              "star"     : 5,
              "stay_time": "2019年01月",
              "text"     : "我知道我的未来不是梦我认真的过每一分钟 我的未来不是噩梦 我的新跟着希望在动 跟着希望在动",
              "username" : "huang",
              "user_pic" : "http://127.0.0.1/images/timg.jpg"
            }
          ]
        },
        dateTimeValue  : [],
        firstDateObj   : {
          date   : "",
          weekDay: "请选择日期"
        },
        lastDateObj    : {
          date   : "",
          weekDay: "请选择日期"
        },
        totalDay       : "请选择",
        headerImg      : "",
        hotelId        : "",
        redHeat        : false,
        favoriteImg    : "url(./../../../static/imgs/心.png)",
        roomBorder     : null,
        allDiscuss     : true,
        startDate      : "",
        //默认显示几条评论
        showDiscussItem: 3,

        choseRoomInfo  : null
      }

    },

    methods: {

      run() {
        let self = this;
        self._initSwiper();
        self.hotelId = global.globalVal.hotelInfo.hotelInfoSingleOne.hotelTempInfo.hotelId;
        if ( !self.hotelId ) {
          AlertModule.show( {
            title  : '提示',
            content: "没有该酒店",
            onHide : function () {
              self.$router.push( '/homepage' );
            }
          } );
          return;
        }

        //获取首页选择的日期
        let date       = new Date();
        let month      = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        self.startDate = date.getFullYear() + "-" + month + "-" + date.getDate();

        let dateTimeValue  = global.globalVal.hotelInfo.hotelInfoSingleOne.hotelTempInfo.dateTimeValue;
        self.dateTimeValue = dateTimeValue ? dateTimeValue : self.dateTimeValue;

        //这里其实应该用promise.all比较合理才对.. 暂时先这样
        global.globalVal.hotelInfo.getFavoriteHotelIds( function ( err, res ) {
          if ( err ) {
            AlertModule.show( {
              title  : '提示',
              content: err
            } );
            return;
          }

          global.globalVal.hotelInfo.getHotelDetailInfoById( self.hotelId, function ( err, res ) {

            if ( err ) {
              AlertModule.show( {
                title  : '提示',
                content: err
              } );
              return;
            }

            self.hotelInfo = res;
            global.globalVal.hotelInfo.hotelInfoSingleOne.hotelTempInfo.hotelDetailInfo = res;
            self.allDiscuss = res[ "comments" ].length > 3 ? 1 : 0;

          } );

          //res是获取到已收藏的酒店的id数组
          //{"collected_hotels_id": [1, 2]}
          let hotelIds = res[ "collected_hotels_id" ];

          if ( hotelIds.length < 1 ) {
            //未收藏
            return;
          }

          for ( let i = 0; i < hotelIds.length; i++ ) {
            //如果类型不一致呢??
            if ( self.hotelId === hotelIds[ i ] ) {
              //显示红心
              self.redHeat     = true;
              self.favoriteImg = "url(./../../../static/imgs/红心.png)";
            }
          }

        } );

      },

      goBack () {
        window.history.length > 1 ? this.$router.go( -1 ) : this.$router.push( '/homePage' );
      },

      clickFavorite( el ) {
        //验证有没有登录
        let self = this;
        if ( !window.localStorage.getItem( "token" ) ) {
          AlertModule.show( {
            title  : '提示',
            content: "请登录后再收藏"
          } );

          return;
        }

        if ( !self.redHeat ) {
          self.$vux.confirm.show( {
            title  : '提示',
            content: '是否确认添加收藏',
            onConfirm() {
              //红心变化
              global.globalVal.hotelInfo.postAddFavorite( self.hotelId, function ( err, tf ) {
                if ( err ) {
                  AlertModule.show( {
                    title  : '提示',
                    content: err
                  } );
                  return;
                }

                AlertModule.show( {
                  title  : '提示',
                  content: "添加成功!",
                  onHide() {
                    self.redHeat     = true;
                    self.favoriteImg = "url(./../../../static/imgs/红心.png)";
                  }
                } );
              } )
            }
          } );
        }

        if ( self.redHeat ) {
          self.$vux.confirm.show( {
            title  : '提示',
            content: '是否取消收藏',
            onConfirm() {
              //红心变化
              global.globalVal.hotelInfo.postCancelFavorite( self.hotelId, function ( err, tf ) {

                if ( err ) {
                  AlertModule.show( {
                    title  : '提示',
                    content: err
                  } );
                  return;
                }

                AlertModule.show( {
                  title  : '提示',
                  content: "取消收藏!",
                  onHide() {
                    self.redHeat     = false;
                    self.favoriteImg = "url(./../../../static/imgs/心.png)";
                  }
                } );
              } );
            }
          } );
        }
      },

      _initSwiper() {
        let self = this;

        var swiper = new Swiper( ".swiper-container", {
          speed            : 1000,
          autoplay         : {
            disableOnInteraction: false,

          },
          loop             : true,
          setWrapperSize   : true,
          heihgt           : "100%",
          uniqueNavElements: false,

          pagination: {
            el               : '.swiper-pagination',
            clickable        : true,
            bulletClass      : 'bullet_item',
            bulletActiveClass: "bullet_item_active"
          },
        } );
      },

      formatDate() {
        return this.dateTimeValue.length + "晚";
      },

      dateChange() {
        let self = this;
        this.dateTimeValue.sort( ( a, b ) => {
          let val1 = new Date( a );
          let val2 = new Date( b );

          return val1 - val2;
        } );
        //排序好之后 第一个日期和最后一个显示出来，

        let firstDate             = new Date( self.dateTimeValue[ 0 ] );
        let firstDateWeekDate     = "周" + global.globalVal.formatDate.formatDateObj.WeekNumTransformToChineseNum( firstDate.getDay() );
        self.firstDateObj.weekDay = firstDateWeekDate;
        //格式化日期
        self.firstDateObj.date    = (firstDate.getMonth() + 1) + "月" + (firstDate.getDate()) + "日";

        let lastDate             = new Date( self.dateTimeValue[ self.dateTimeValue.length - 1 ] );
        let lastDateWeekDate     = "周" + global.globalVal.formatDate.formatDateObj.WeekNumTransformToChineseNum( lastDate.getDay() );
        self.lastDateObj.weekDay = lastDateWeekDate;
        //格式化日期
        self.lastDateObj.date    = (lastDate.getMonth() + 1) + "月" + (lastDate.getDate()) + "日";
        self.totalDay            = self.formatDate();

        global.globalVal.hotelInfo.hotelInfoSingleOne.hotelTempInfo.dateTimeValue = self.dateTimeValue;

      },

      roomClick( roomInfo, index ) {
        let self        = this;
        self.roomBorder = index;
        //需要获取到房间id
        self.choseRoomInfo = roomInfo;

      },

      showAllDiscuss() {
        let self             = this;
        self.allDiscuss      = false;
        self.showDiscussItem = self.hotelInfo.comments.length;
      },

      showDefailDiscuss( index ) {
        //显示前三
        let self = this;
        if ( index < self.showDiscussItem ) {
          return true;
        } else {
          return false;
        }
      },

      goOrder() {
        let self = this;

        if( window.localStorage.getItem( "token" ) ) {
          AlertModule.show( {
            title  : '提示',
            content: "请先登录",
            onHide () {
              self.$router.push( '/login' );
            }
          } );

          return;
        }

        if ( self.dateTimeValue.length < 1 ) {
          AlertModule.show( {
            title  : '提示',
            content: "请选择入离日期",
          } );
          return;
        }
        //判断是否选择了房间
        if( !self.choseRoomInfo ) {
          AlertModule.show( {
            title  : '提示',
            content: "请选择房间"
          } );
          return;
        }
        global.globalVal.hotelInfo.hotelInfoSingleOne.hotelTempInfo.hotelRoomInfo    = self.choseRoomInfo;
        global.globalVal.hotelInfo.hotelInfoSingleOne.hotelTempInfo.showHomePageComp = "orderDetail";
        self.$router.push( '/homepage' );
        //让homePage 显示order组件
      },

      colorRgb( color ) {
        return global.globalVal.formatDate.colorRgb( color );
      },
    }
  }
</script>
<style scoped>
  /*解决房间介绍后台发送html代码导致样式冲突的问题
  >>> 可以实现穿透
  */
  .roo_desc >>> p {
    margin: 0;
    padding: 0;
  }
</style>
<style scoped lang="scss">

  .hotel_detail_info {
    width: 100%;
    min-height: 100%;
    /*background-color: #f90;*/
    position: relative;

    .top_icon {
      position: absolute;
      top: 2%;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      height: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 2;

      .favorite {
        position: absolute;
        right: 0%;
        bottom: 0%;
        width: .6rem;
        height: .8rem;
        margin: 0;
        background: url("./../../static/imgs/心.png") no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
        filter: drop-shadow(0px 0px 20px rgb(255, 20, 20)); //阴影实现:filter: drop-shadow(x偏移, y偏移, 模糊大小, 色值);
        animation: test 1s linear infinite;
      }
    }

    .top_img {
      width: 100%;
      height: 6rem;
      z-index: -1;

    }

    .hotel_all_detail {
      width: 100%;
      margin: 0 auto;
      background-color: #fff;
      letter-spacing: 2px;
      position: relative;

      .hotel_center {
        width: 90%;
        height: 100%;
        margin: 0 auto;

        .hotel_info {
          width: 95%;
          margin: 0 auto;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          overflow: auto;

          .hotel_item {
            width: 100%;

            .price {
              position: absolute;
              top: -5%;
              left: 8%;
              padding: .2rem .3rem;
              background: rgba(0, 0, 0, .7);
              color: #eee;
              border-radius: .5rem;
              z-index: 1;
            }

            .hotel_introduce {
              text-align: left;
              letter-spacing: 1px;

              p {
              }

              .hotel_name {
                font-size: 0.45rem;
                font-weight: 600;
                color: #272636;
              }

              .hotel_address {
                font-size: .3rem;
                color: #909092;
                .circle {
                  position: relative;
                  width: 3px;
                  height: 3px;
                  display: inline-block;
                }
                .circle::after {
                  content: " ";
                  display: inline-block;
                  height: 3px;
                  width: 3px;
                  background-color: #a9a1a1;
                  border-radius: 60%;
                  position: absolute;
                  top: -3px;
                }
              }

              .hotel_tag {
                font-size: .3rem;

                span {
                  margin-right: .1rem;
                  padding: .1rem;
                }
              }

            }

            .hotel_placeHolder {
              width: 100%;
              height: .5rem;
              background-color: #f8f8f8;
            }
          }
        }

        .hotel_all_room {
          width: 100%;
          height: auto;
          margin: 0.2rem 0;

          .room_border {
            border: 2px solid #f90;

          }

          .hotel_room {
            width: 100%;
            height: 2.5rem;
            background-color: #f8f8f8;
            display: flex;
            margin-bottom: .2rem;

            .room_img {
              width: 40%;
              height: 100%;
              background: url("./../../static/imgs/Koala.jpg") no-repeat center center;
              -webkit-background-size: 100%;
              background-size: 100%;
            }

            .room_name {
              width: 60%;
              height: 100%;
              text-align: left;
              display: flex;
              flex-direction: column;
              justify-content: center;

              p {
                margin: .1rem 0;
                padding-left: 0.4rem;
              }

              .room_price {
                display: flex;
                margin: 0.4rem 0.4rem 0 0;
                justify-content: space-between;
                align-items: baseline;
              }
            }
          }
        }

        .discuss {
          width: 100%;
          margin-top: .5rem;

          .discuss_title {
            width: 100%;
            height: 1rem;
            font-size: .4rem;
            color: #272636;
            text-align: left;
            font-weight: bold;
          }

          .discuss_item {
            width: 100%;
            height: 3rem;
            display: flex;

            .discuss_head_img {
              width: 15%;
              height: 100%;

              .head_img {
                width: 1rem;
                height: 1rem;
                max-width: 100%;
                background: url("../../static/imgs/Koala.jpg") center center no-repeat;
                background-size: 100% 100%;
                border-radius: 50%;
              }

            }

            .discuss_item_info {
              width: 85%;
              height: 100%;

              .item_name {
                width: 100%;
                height: 1rem;
                text-align: left;
                color: #272636;
                display: flex;
                align-items: center;
                font-size: .35rem;
                font-weight: bold;
                justify-content: space-between;

                .item_time {
                  color: #d4d4dd;
                  font-size: .2rem;
                  font-weight: normal;
                }
              }

              .item_detail_info {
                width: 100%;
                height: 2rem;
                text-align: left;

                .user_discuss {
                  color: #92919f;

                }

                .user_start {
                  height: .8rem;
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;

                  > p {
                    width: 8%;
                    height: 50%;
                    background: url("./../../static/imgs/星2.png") no-repeat center center;
                    -webkit-background-size: contain;
                    background-size: contain;
                  }

                  .star_by_empty {
                    background-image: url("./../../static/imgs/星1.png");
                  }

                }
              }

            }

          }

          .show_all_discuss {
            width: 100%;
            height: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #ecb437;
            font-size: .4rem;
            margin: .5rem 0;
            cursor: pointer;
          }
        }

        .search_center {
          width: 100%;
          margin: 0 auto;
          position: relative;

          .location_wrap {
            width: 100%;
            margin-bottom: .5rem;
          }

          .location {
            width: 50%;
            height: 1rem;
          }

          .date_picker {
            width: 100%;
            height: 1.5rem;
            overflow: hidden;
            z-index: 1;
            position: relative;

            > div {
              opacity: 0;
            }

          }

          .date_txt {
            display: flex;
            justify-content: space-around;
            position: absolute;
            top: 45%;
            left: 0;
            width: 100%;
            height: 60%;
            background: #f8f8f8;

            > p {
              position: absolute;
              top: 0%;
              margin: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
              font-size: .2rem;
            }

            .first_date {
              left: 0;
              font-size: 0.4rem;
              padding-left: .4rem;
            }

            .cent_p {
              left: 50%;
              top: 50%;
              height: 50%;
              border-radius: 1rem;
              border: 1px solid #f2f2f2;
              padding: 0 .3rem;
              transform: translateX(-50%) translateY(-50%);
            }

            .last_date {
              right: 0%;
              font-size: 0.4rem;
              padding-right: .3rem;

            }
          }

        }

        .discuss_title {
          width: 100%;
          height: 1rem;
          font-size: .4rem;
          color: #272636;
          text-align: left;
          font-weight: bold;
        }

        .room_device {
          width: 100%;
          height: 3rem;
          margin: 1rem 0;

          .room_device_items {
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .device_item {

              .item_icon {
                width: 1rem;
                height: 1rem;
                background: #f8f8f8;
                display: flex;
                justify-content: center;
                align-items: center;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;

                .icon_img {
                  width: 0.6rem;
                  height: 0.6rem;
                }
              }
            }
          }

          .entry_tips {
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;

            .item_tips {
              width: 32%;
              height: 2rem;
              text-align: left;
              color: #dfdee5;

              p {
                margin: .2rem 0;
              }
            }
          }
        }

      }

      .book_btn {
        width: 100%;
        height: 1.5rem;
        margin-top: 1rem;
        background: #ebae18;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .4rem;
        color: #fff;
      }

      /*.book_btn::before {*/
      /*content: " ";*/
      /*width: 1rem;*/
      /*height: 1rem;*/
      /*background: url("./../../static/imgs/");*/
      /*}*/
    }

  }


</style>


<style lang="scss">

  .bullet_item {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 100%;
    background: #000;
    opacity: .4;
    margin: 0 .1rem;
  }

  .bullet_item_active {
    background: #f8f8f8;
    opacity: 1;
  }

</style>

