<template>
  <div class="hotel_detail_info">
    <div class="top_icon">
      <Arrow direction="left"></Arrow>
      <p @click="clickFavorite" class="favorite"></p>

    </div>

    <div class="top_img">
      <div class="swiper-container" style="height: 100%;">
        <div class="swiper-wrapper">
          <img class="swiper-slide" src="./../../static/imgs/Koala.jpg" alt="">
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

          <div v-for="(item, key, index ) in hotelDetailInfo" :key="index" class="hotel_item">
            <p class="price">{{ item.price }}</p>

            <div class="hotel_introduce">
              <p class="hotel_name">{{ item.name }}</p>
              <p class="hotel_tag">
                <span style="background: #fff1cc;color:#f7b500;">{{ item.tag.firstTag }}</span>
                <span style="background: #cef2e1;color:#109d59;">{{ item.tag.secondTag }}</span>
                <span style="background: #f8f8f8;color:#8b8a99;">{{ item.tag.thrithTag }}</span>
                <span style="background: #f8f8f8;color:#8b8a99;">{{ item.tag.lastTag }} </span>
              </p>
              <p class="hotel_address">
                <!--<span style="color: #f9c558;">{{ item.score }}分</span>-->
                <!--<span class="circle"></span>-->
                <!--<span>{{ item.evaluate }}条评价</span>-->
                <!--<span class="circle"></span>    -->
                <span>{{ item.address }}</span>
              </p>

            </div>
          </div>

        </div>
        <!-- 房间介绍 -->
        <div class="hotel_all_room">
          <div style="border: 2px solid #f90;" class="hotel_room">
            <div class="room_img"></div>
            <div class="room_name">
              <p>标准双人床</p>
              <p>标准双人床</p>
              <p class="room_price">
                <span style="background: #cef2e1;color:#109d59;">七天退换</span>
                <span style="background: #fff1cc;color:#f7b500;font-size: 0.4rem">$299</span>
              </p>
            </div>
          </div>
          <div class="hotel_room">
            <div class="room_img"></div>
            <div class="room_name">
              <p>标准双人床</p>
              <p>标准双人床</p>
              <p class="room_price">
                <span style="background: #cef2e1;color:#109d59;">七天退换</span>
                <span style="background: #fff1cc;color:#f7b500;font-size: 0.4rem">$299</span>
              </p>
            </div>
          </div>
          <div class="hotel_room">
            <div class="room_img"></div>
            <div class="room_name">
              <p>标准双人床</p>
              <p>标准双人床</p>
              <p class="room_price">
                <span style="background: #cef2e1;color:#109d59;">七天退换</span>
                <span style="background: #fff1cc;color:#f7b500;font-size: 0.4rem">$299</span>
              </p>
            </div>
          </div>
        </div>
        <!--评论-->
        <div class="discuss">
          <div class="discuss_title">
            近期热评
          </div>

          <div class="discuss_item">

            <div class="discuss_head_img">
              <div class="head_img"></div>
            </div>
            <div class="discuss_item_info">
              <div class="item_name">
                <div>金针菇</div>
                <div class="item_time">2019年01月04号</div>
              </div>
              <div class="item_detail_info">
                <div class="user_discuss">
                  我知道我的未来不是梦我认真的过每一分钟 我的未来不是噩梦 我的新跟着希望在动 跟着希望在动
                </div>
                <div class="user_start">

                  <p class="cc"></p>
                  <p class="cc"></p>
                  <p class="cc"></p>
                  <p class="cc"></p>
                  <p class="cc"></p>

                </div>
              </div>
            </div>
          </div>
          <div class="discuss_item">

            <div class="discuss_head_img">
              <div class="head_img"></div>
            </div>
            <div class="discuss_item_info">
              <div class="item_name">
                <div>金针菇</div>
                <div class="item_time">2019年01月04号</div>
              </div>
              <div class="item_detail_info">
                <div class="user_discuss">
                  我知道我的未来不是梦我认真的过每一分钟 我的未来不是噩梦 我的新跟着希望在动 跟着希望在动
                </div>
                <div class="user_start">

                  <p class="cc"></p>
                  <p class="cc"></p>
                  <p class="cc"></p>
                  <p class="cc"></p>
                  <p class="cc"></p>

                </div>
              </div>
            </div>
          </div>
          <div class="discuss_item">

            <div class="discuss_head_img">
              <div class="head_img"></div>
            </div>
            <div class="discuss_item_info">
              <div class="item_name">
                <div>金针菇</div>
                <div class="item_time">2019年01月04号</div>
              </div>
              <div class="item_detail_info">
                <div class="user_discuss">
                  我知道我的未来不是梦我认真的过每一分钟 我的未来不是噩梦 我的新跟着希望在动 跟着希望在动
                </div>
                <div class="user_start">

                  <p class="cc"></p>
                  <p class="cc"></p>
                  <p class="cc"></p>
                  <p class="cc"></p>
                  <p class="cc"></p>

                </div>
              </div>
            </div>
          </div>

          <div class="show_all_discuss">
            <div>
              全部31条评论
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
                        @on-change="dateChange"></calendar>
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

      <div class="book_btn">
        <i></i>
        <p>立即预订</p>
      </div>
    </div>

  </div>


</template>

<script>
  import Arrow from "./childComponents/topArrow"
  import Swiper from "swiper"

  import { Flexbox, FlexboxItem, PopupPicker, Calendar, Group, Search } from 'vux'

  export default {
    name      : "hotelDetail",
    components: {
      Arrow,
      Flexbox,
      FlexboxItem,
      PopupPicker,
      Calendar,
      Group,
      Search
    },

    mounted() {
      this._initSwiper();

    },

    data() {
      return {
        redHeat: false,

        hotelDetailInfo: [
          {
            name       : "考拉酒店 (四季阳光店)",
            score      : "5.0",
            evaluate   : "48",
            address    : "滨江道/四季阳光/考拉原始村落，我知道我的未来不是梦我认真的过每一分钟",
            tag        : { firstTag: "速定", secondTag: "七天可退", thrithTag: "实拍", lastTag: "很干净" },
            price      : "$299",
            isFavorites: 1
          }
        ],

        dateTimeValue: [],

        firstDateObj: {
          date   : "",
          weekDay: "请选择日期"
        },
        lastDateObj : {
          date   : "",
          weekDay: "请选择日期"
        },
        totalDay    : "请选择",

      }

    },

    methods: {
      clickFavorite( el ) {

        if ( this.redHeat ) {
          this.redHeat                      = false;
          el.path[ 0 ].style.background     = "url(./../../../static/imgs/心.png) no-repeat";
          el.path[ 0 ].style.backgroundSize = "100%";

        } else {
          this.redHeat                      = true;
          el.path[ 0 ].style.background     = "url(./../../../static/imgs/红心.png) no-repeat";
          el.path[ 0 ].style.backgroundSize = "100%";

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

        self.totalDay = self.formatDate();

      },

    }
  }
</script>

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
                font-size: .4rem;
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

