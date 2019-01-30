<template>
  <div class="hotel_search">
    <div class="top_img">
      <div class="swiper-container" style="height: 100%;">
        <div class="swiper-wrapper">
          <img class="swiper-slide" src="./../../static/imgs/Koala.jpg" alt="">
          <img class="swiper-slide" src="./../../static/imgs/Chrysanthemum.jpg" alt="">
          <img class="swiper-slide" src="./../../static/imgs/Penguins.jpg" alt="">

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
                                 :columns=3 @on-change="changePicker">
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
            <calendar title="title" v-model="dateTimeValue" :display-format="formatDate" @on-change="fn"></calendar>
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
        <!--<h1>{{ dateTimeValue }}</h1>-->

      </div>

    </div>
  </div>
</template>

<script>
  import Swiper from "swiper";
  import { Flexbox, FlexboxItem, PopupPicker, Calendar, Group } from 'vux'

  export default {
    name      : "hotelSearch",
    components: {
      PopupPicker,
      Flexbox,
      FlexboxItem,
      Calendar,
      Group
    },
    mounted() {
      this._initSwiper();
      this.pickerDataFn();

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
        totalDay: "请选择"
      }
    },
    methods   : {
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
        this.pickerValue = [ this.pickerValue[ this.pickerValue.length - 1 ] ];
        if ( this.pickerValue[ 0 ].length > 5 ) {
          this.pickArrowRight = 0.5;
        }
      },

      pickerDataFn() {
        let data        = [
          {
            name  : '中国',
            value : 'china',
            parent: '0' // 为一级时可以不写 parent，但是此时允许为数字 0、空字符串或者字符串 '0'
          }, {
            name  : '美国',
            value : 'USA',
            parent: '0'
          }, {
            name  : '广东',
            value : '广东',
            parent: 'china'
          }, {
            name  : '广西',
            value : 'china002',
            parent: 'china'
          }, {
            name  : '美国001',
            value : 'usa001',
            parent: 'USA'
          }, {
            name  : '美国002',
            value : 'usa002',
            parent: 'USA'
          }, {
            name  : '广州',
            value : '广州的名字其实很长',
            parent: '广东'
          }, {
            name  : '深圳',
            value : '深圳有五个',
            parent: '广东'
          }, {
            name  : '广西001',
            value : '广西001',
            parent: 'china002'
          }, {
            name  : '广西002',
            value : '广西的名字其实很长',
            parent: 'china002'
          }, {
            name  : '美国001_001',
            value : '美国001_001',
            parent: 'usa001'
          }, {
            name  : '美国001_002乌鲁木齐',
            value : '美国001_002乌鲁木齐',
            parent: 'usa001'
          }, {
            name  : '美国002_001',
            value : '美国002_001',
            parent: 'usa002'
          }, {
            name  : '美国002_002',
            value : '美国002_002',
            parent: 'usa002'
          }
        ];
        this.pickerData = data;

      },

      formatDate() {
        return this.dateTimeValue.length + "晚";
      },

      fn() {
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

      }

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
      height: 4rem;
      /*background-color: #fff;*/
      /*background: url("./../../static/imgs/Koala.jpg") no-repeat center center;*/

    }

    .search_info {
      height: 5rem;
      border-radius: .3rem .3rem 0 0;
      background-color: #fff;
      position: absolute;
      z-index: 1;
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
          height: 1rem;
        }

        .date_picker {
          width: 100%;
          height: 1.5rem;
          overflow: hidden;
          border-top: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
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

      }
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

          .vux-popup-picker-value {
            width: 70%;
            text-align: center;
            margin-left: -0.5rem;
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

</style>

