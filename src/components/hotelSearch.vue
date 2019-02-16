<template>
  <div class="hotel_search">
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

    <div class="search_info">


      <div class="search_center">
        <div class="location_wrap">
          <div class="location">
            <!--<PopupPicker @on-show="selectClick" @on-hide="selectClick" v-model="pickerValue" :data="pickerData"-->
            <!--:columns=1 @on-change="changePicker">-->
            <!--</PopupPicker>-->
            <Flexbox :gutter=0>
              <FlexboxItem>
                <div>
                  <div class="select_city">
                    <PopupPicker @on-show="selectClick" @on-hide="selectClick" v-model="pickerValue" :data="pickerData"
                                 :columns=2 @on-change="changePicker">
                    </PopupPicker>
                    <span :class="popupPickArrow"></span>
                  </div>
                </div>
              </FlexboxItem>
            </Flexbox>

          </div>
        </div>
        <div class="date_picker">
          <group>
            <calendar title="title" v-model="dateTimeValue" :display-format="formatDate" @on-change="dateChange"></calendar>
          </group>

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

        <div class="search">
          <Search placeholder="地标位置/酒店标题" v-model="searchValue" position="absolute" @on-blur="searchBlur"
                  @on-submit="searchSubmit"></Search>
        </div>

        <div class="center_btn">
          <div class="btn_search" @click="btnSearch">
            开始查找
          </div>
        </div>
      </div>
    </div>

    <div class="search_recommend">
        <div class="recommend_title">
            <p style="font-size: .5rem;"><span>为你</span>•<span style="color: #eeb730;">推荐</span></p>
            <p style="color: #bfbec6;">为你推荐品质好 服务佳 设备全的优质房源</p>
        </div>

        <div class="recommend_hotel">

          <div class="recommend_item">
              <div class="item_img">
                <div class="img_price">
                  $499
                </div>
              </div>

              <div class="recommend_bom">
                <div class="item_title">
                    <p style="font-size: .4rem;">考拉四季阳光</p>
                </div>
                <div class="item_address">
                    <p style="color: #bfbec6;">广东北海道•<span style="color: #eeb730;">5.0分</span></p>
                </div>
              </div>

          </div>
          <div class="recommend_item">
            <div class="item_img">
              <div class="img_price">
                $499
              </div>
            </div>

            <div class="recommend_bom">
              <div class="item_title">
                <p style="font-size: .4rem;">考拉四季阳光</p>
              </div>
              <div class="item_address">
                <p style="color: #bfbec6;">广东北海道•<span style="color: #eeb730;">5.0分</span></p>
              </div>
            </div>

          </div>
          <div class="recommend_item">
            <div class="item_img">
              <div class="img_price">
                $499
              </div>
            </div>

            <div class="recommend_bom">
              <div class="item_title">
                <p style="font-size: .4rem;">考拉四季阳光</p>
              </div>
              <div class="item_address">
                <p style="color: #bfbec6;">广东北海道•<span style="color: #eeb730;">5.0分</span></p>
              </div>
            </div>

          </div>
          <div class="recommend_item">
            <div class="item_img">
              <div class="img_price">
                $499
              </div>
            </div>

            <div class="recommend_bom">
              <div class="item_title">
                <p style="font-size: .4rem;">考拉四季阳光</p>
              </div>
              <div class="item_address">
                <p style="color: #bfbec6;">广东北海道•<span style="color: #eeb730;">5.0分</span></p>
              </div>
            </div>

          </div>
        </div>

        <div class="recommend_change">
            <p>换一批</p>
        </div>

        <div class="recommend_introduce">
          <div>
            <div>

              <div class="introduce_img"></div>
                <p style="color: #8c8b91;font-size: .4rem">真实房源</p>
                <p style="color: #cfcfd9;">上门实拍</p>
            </div>
            <div>

              <div class="introduce_img"></div>
                <p style="color: #8c8b91;font-size: .4rem">安心入住</p>
                <p style="color: #cfcfd9;">无房赔付</p>

            </div>
            <div>

              <div class="introduce_img"></div>
                <p style="color: #8c8b91;font-size: .4rem">投诉建议</p>
                <p style="color: #cfcfd9;">7*24小时</p>
            </div>
          </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Swiper from "swiper";
  import { AlertModule, Flexbox, FlexboxItem, PopupPicker, Calendar, Group, Search, Value2nameFilter as value2name, ChinaAddressV4Data} from 'vux'

  export default {
    name      : "hotelSearch",
    components: {
      PopupPicker,
      Flexbox,
      FlexboxItem,
      Calendar,
      Group,
      Search,
      AlertModule
    },
    mounted() {

      this.run();
    },
    data() {
      return {
        pickerValue   : [ "城市" ],
        pickerData    : [],
        popupPickArrow: {
          "popup_pick_arrow_up"  : true,
          "popup_pick_arrow_down": false,
          "popup_pick_arrow"     : true
        },

        dateTimeValue: [],
        //formatDate: ""
        firstDateObj : {
          date   : "",
          weekDay: "请选择日期"
        },
        lastDateObj  : {
          date   : "",
          weekDay: "请选择日期"
        },
        totalDay: "请选择",

        searchValue: "",
        city: ""
      }
    },
    methods   : {

      run() {
        global.globalVal.searchPage.searchPageSingleOne.setSearchPageIndexVueObj( this );
        this._initSwiper();
        this.pickerDataFn();
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

      selectClick() {

        if ( this.popupPickArrow[ "popup_pick_arrow_up" ] ) {
          this.popupPickArrow[ "popup_pick_arrow_up" ]   = false;
          this.popupPickArrow[ "popup_pick_arrow_down" ] = true;
        } else {
          this.popupPickArrow[ "popup_pick_arrow_up" ]   = true;
          this.popupPickArrow[ "popup_pick_arrow_down" ] = false;
        }

      },

      changePicker() {
        let self = this;
        //这里修改了pickValue时，会触发三次函数，问题待查..
        if ( !self.boo ) {
          self.boo = true;

          self.pickerValue = [ self.getName( self.pickerValue ).split( " " )[ 1 ] ];
          self.city =  self.pickerValue[0];
          //显示了中间市级城市 vux的第4版本的city_data直辖市的下一级默认是市辖区 这里修改了源代码为北京市等
          if ( self.pickerValue[ 0 ].length > 5 ) {
            self.pickArrowRight = 0.5;
          }
        }

      },

      pickerDataFn() {

        this.pickerData = ChinaAddressV4Data;

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

        let lastDate             = new Date( self.dateTimeValue[ self.dateTimeValue.length-1 ] );
        let lastDateWeekDate     = "周" + global.globalVal.formatDate.formatDateObj.WeekNumTransformToChineseNum( lastDate.getDay() );
        self.lastDateObj.weekDay = lastDateWeekDate;
        //格式化日期
        self.lastDateObj.date    = (lastDate.getMonth() + 1) + "月" + (lastDate.getDate()) + "日";

        self.totalDay = self.formatDate();

      },

      searchBlur () {
        console.log( "搜索框失去焦点事件" );

      },

      searchSubmit () {

        console.log( "enter键和可能手机的确认键" );

      },


      btnSearch () {
        let self = this;
        if( self.pickerValue[ 0 ] === "城市" ) {
          AlertModule.show( {
            title  : '提示',
            content: "请选择城市",
          } );
          return;
        }

        global.globalVal.hotelInfo.getHotelInfo( self.pickerValue, self.searchValue, function ( err, res ) {

          if( err ){
            return;
          }

          if( res.length < 1 ) {
            AlertModule.show( {
              title  : '提示',
              content: "未查询到该地区酒店",
            } );
            return;
          }
          //goto
          self.$router.push( '/homepage' );

        } );

      },
      getName( value ) {
        //value is array
        return value2name( value, ChinaAddressV4Data );
        //return string
      },


    },
  }
</script>

<style scoped lang="scss">
  .hotel_search {
    width: 100%;
    height: 100%;

    > div {
      width: 100%;
    }
    .top_img {
      width: 100%;
      height: 5rem;
      /*background-color: #fff;*/
      /*background: url("./../../static/imgs/Koala.jpg") no-repeat center center;*/

    }

    .search_info {
      border-radius: .3rem .3rem 0 0;
      background-color: #fff;
      position: absolute;
      z-index: 1;
      height: 7.5rem;
      margin-top: -.3rem;

      .search_center {
        width: 90%;
        height: 100%;
        margin: 0 auto;

        .location_wrap {
          width: 100%;
          margin-bottom: .5rem;
        }

        .location {
          width: 50%;
          height: 0.8rem;
        }

        .date_picker {
          width: 100%;
          height: 1.5rem;
          overflow: hidden;
          border-top: 1px solid #f5ecec;
          border-bottom: 1px solid #f5ecec;
          position: relative;

          > div {
            opacity: 0;
          }

          > p {
            position: absolute;
            top: 0;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            font-size: .2rem;
            z-index: -1;
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

        .center_btn {
          width: 100%;
          height: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;

          .btn_search {
            width: 65%;
            height: 40%;
            display: flex;
            justify-content: center;
            align-items: center;
            -webkit-border-radius: .8rem;
            -moz-border-radius: .8rem;
            border-radius: .8rem;
            background: url("./../../static/imgs/1.png") center center;
            -webkit-background-size: cover;
            background-size: cover;
            font-size: .4rem;
            color: #fff;
          }
        }
      }



    }


    .search_recommend {
      width: 100%;
      margin-top: 7.5rem;
      background-color: #fff;


      .recommend_title {
        width: 100%;
        height: 2rem;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        letter-spacing: 2px;

        p{
          margin: 0.1rem;
        }
      }

      .recommend_hotel {
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .recommend_item {
          width: 48%;
          height: 4.5rem;
          margin-bottom: .3rem;

          .item_img {
            width: 100%;
            height: 2.5rem;
            background: url("./../../static/imgs/Koala.jpg") center center;
            background-size: 100%;
            overflow: hidden;

            .img_price {
              width: 35%;
              height: .7rem;
              margin-top: .3rem;
              background-color: rgba(0,0,0, 0.7);
              border-radius: 0 1rem 1rem 0;
              color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: .4rem;
            }
          }

          .recommend_bom {
            width: 100%;
            height: 2rem;
            background-color: #f8f8f8;
            display: flex;
            justify-content: center;
            flex-direction: column;

            .item_title {
              width: 100%;
              height: 0.8rem;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              padding-left: 0.3rem;
              letter-spacing: 2px;



              p{
                margin: 0;
              }
            }

            .item_address{
              width: 100%;
              height: 0.8rem;
              display: flex;
              justify-content: flex-start;
              padding-left: 0.3rem;
              letter-spacing: 2px;

              p{
                margin: 0;
              }
            }

          }

        }


      }

      .recommend_change {
        width: 90%;
        height: 1.5rem;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;

        p {
          margin: 0;
          font-size: .4rem;
          color: #eeb730;
        }
      }

      .recommend_introduce {
        width: 100%;
        height: 2.5rem;
        border-top: .3rem solid #f8f8f8;
        padding-bottom: 1rem;

        >div {
          width: 90%;
          height: 100%;
          margin: 0.5rem auto;
          display: flex;

          > div {
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            p {
              margin: 0.1rem 0 0 0;
            }
            .introduce_img {
              width: 25%;
              height: 1rem;
              background: url("./../../static/imgs/空调.png") no-repeat center center;
              background-size: 100%;

            }
          }
        }
      }


    }
  }


</style>


<style lang="scss">

  #app {
    .hotel_search {

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

      .select_city {

        width: 90%;
        margin: 0 auto;
        height: 1.3rem;
        border-radius: .1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        position: relative;

        //暂时想到 如此下策地 修改框架样式,但庆幸属于局部 不影响全局
        .vux-cell-box {

          width: 100%;
          height: 100%;
          .vux-tap-active {
            height: 100%;
            padding: 0;
            .vux-popup-picker-select, .vux-popup-picker-select-box {
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
              font-size: 0.4rem;

              .vux-popup-picker-value {
                width: 70%;
                text-align: center;
                margin-left: -0.5rem;
                color: #000;
              }
            }

            .weui-cell__ft::after {
              content: "";
              border: 0;
            }

          }
        }

        .popup_pick_arrow {
          position: absolute;
          right: 1rem;
        }

        .popup_pick_arrow_down::after {
          content: " ";
          display: inline-block;
          height: 6px;
          width: 6px;
          border-width: 2px 0px 0px 2px;
          border-color: #C8C8CD;
          border-style: solid;
          -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          position: relative;
          top: -2px;
          position: absolute;
          top: 50%;
          margin-top: -4px;
          right: 2px;
        }

        .popup_pick_arrow_up::after {
          content: " ";
          display: inline-block;
          height: 6px;
          width: 6px;
          border-width: 0px 2px 2px 0px;
          border-color: #C8C8CD;
          border-style: solid;
          -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          position: relative;
          top: -2px;
          position: absolute;
          top: 50%;
          margin-top: -4px;
          right: 2px;
        }

      }

    }
    @media  screen and (min-width: 780px) {
      .search_info {
        width: 780px !important;
      }
    }
  }


</style>

