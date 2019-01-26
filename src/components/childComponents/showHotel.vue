<template>
  <div>
    <!-- 按钮 -->
    <div class="location_date">
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
        <FlexboxItem>
          <div>
            <div class="select_city">
              <PopupPicker @on-show="selectTimeClick" @on-hide="selectTimeClick" v-model="pickerTimeValue"
                           :data="pickerTimeData" :columns=2 @on-change="changeTimePicker"></PopupPicker>
              <span :class="popupPickArrowTime"></span>
            </div>
          </div>
        </FlexboxItem>
      </Flexbox>
    </div>
    <!-- 搜索 -->
    <div class="search">
      <Search placeholder="地标位置/酒店标题" v-model="searchValue" position="absolute" @on-blur="searchBlur"
              @on-submit="searchSubmit"></Search>
    </div>
    <!-- 酒店信息 -->
    <div class="hotel_info">

      <div v-for="(item, key, index ) in hotelDetailInfo" :key="index" class="hotel_item">
        <div class="img_wrap">
          <img class="hotel_img" src='./../../../static/imgs/Koala.jpg' alt="">
          <p class="price">{{ item.price }}</p>
          <p @click="clickFavorite" class="favorite"></p>
        </div>

        <div class="hotel_introduce">
          <p class="hotel_name">{{ item.name }}</p>
          <p class="hotel_address">
            <span style="color: #f9c558;">{{ item.score }}分</span>
            <span class="circle"></span>
            <span>{{ item.evaluate }}条评价</span>
            <span class="circle"></span>
            <span>{{ item.address }}</span>
          </p>
          <p class="hotel_tag">
            <span style="background: #fff1cc;color:#f7b500;">{{ item.tag.firstTag }}</span>
            <span style="background: #cef2e1;color:#109d59;">{{ item.tag.secondTag }}</span>
            <span style="background: #f8f8f8;color:#8b8a99;">{{ item.tag.thrithTag }}</span>
            <span style="background: #f8f8f8;color:#8b8a99;">{{ item.tag.lastTag }} </span>
          </p>
        </div>
        <div class="hotel_placeHolder"></div>
      </div>

    </div>
  </div>
</template>

<script>

  import { Flexbox, FlexboxItem, PopupPicker, Search } from 'vux'

  export default {

    mounted() {
      this.pickerDataFn();
    },
    components: {
      Search,
      Flexbox,
      FlexboxItem,
      PopupPicker,
      Search
    },
    data() {
      return {
        pickerValue       : [ "城市" ],
        pickerTimeValue   : [ "时间" ],
        pickerData        : [],
        pickerTimeData    : [],
        arrowUp           : true,
        arrowDown         : false,
        popupPickArrow    : {
          "popup_pick_arrow_up"  : true,
          "popup_pick_arrow_down": false,
          "popup_pick_arrow"     : true
        },
        popupPickArrowTime: {
          "popup_pick_arrow_up"  : true,
          "popup_pick_arrow_down": false,
          "popup_pick_arrow"     : true
        },
        pickArrowRight    : 1,

        searchValue: "",

        hotelDetailInfo: [
          {
            name       : "考拉酒店 (四季阳光店)",
            score      : "5.0",
            evaluate   : "48",
            address    : "滨江道/四季阳光/考拉原始村落",
            tag        : { firstTag: "速定", secondTag: "七天可退", thrithTag: "实拍", lastTag: "很干净" },
            price      : "$299",
            isFavorites: 1
          }, {
            name       : "考拉酒店 (四季阳光店)",
            score      : "5.0",
            evaluate   : "48",
            address    : "滨江道/四季阳光/考拉原始村落",
            tag        : { firstTag: "速定", secondTag: "七天可退", thrithTag: "实拍", lastTag: "很干净" },
            price      : "$299",
            isFavorites: 1
          }, {
            name       : "考拉酒店 (四季阳光店)",
            score      : "5.0",
            evaluate   : "48",
            address    : "滨江道/四季阳光/考拉原始村落",
            tag        : { firstTag: "速定", secondTag: "七天可退", thrithTag: "实拍", lastTag: "很干净" },
            price      : "$299",
            isFavorites: 1
          }, {
            name       : "考拉酒店 (四季阳光店)",
            score      : "5.0",
            evaluate   : "48",
            address    : "滨江道/四季阳光/考拉原始村落",
            tag        : { firstTag: "速定", secondTag: "七天可退", thrithTag: "实拍", lastTag: "很干净" },
            price      : "$299",
            isFavorites: 1
          }, {
            name       : "考拉酒店 (四季阳光店)",
            score      : "5.0",
            evaluate   : "48",
            address    : "滨江道/四季阳光/考拉原始村落",
            tag        : { firstTag: "速定", secondTag: "七天可退", thrithTag: "实拍", lastTag: "很干净" },
            price      : "$299",
            isFavorites: 1
          }, {
            name       : "考拉酒店 (四季阳光店)",
            score      : "5.0",
            evaluate   : "48",
            address    : "滨江道/四季阳光/考拉原始村落",
            tag        : { firstTag: "速定", secondTag: "七天可退", thrithTag: "实拍", lastTag: "很干净" },
            price      : "$299",
            isFavorites: 1
          },
        ],

        //红心
        redHeat: false,
      }
    },
    methods   : {

      clickFavorite( el ) {

        if( this.redHeat ) {
          this.redHeat = false;
          el.path[0].style.background     = "url(./../../../static/imgs/心.png) no-repeat";
          el.path[0].style.backgroundSize = "100%";

        }else {
          this.redHeat = true;
          el.path[0].style.background     = "url(./../../../static/imgs/红心.png) no-repeat";
          el.path[0].style.backgroundSize = "100%";

        }
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

      selectTimeClick() {

        if ( this.popupPickArrowTime[ "popup_pick_arrow_up" ] ) {
          this.popupPickArrowTime[ "popup_pick_arrow_up" ]   = false;
          this.popupPickArrowTime[ "popup_pick_arrow_down" ] = true;
        } else {
          this.popupPickArrowTime[ "popup_pick_arrow_up" ]   = true;
          this.popupPickArrowTime[ "popup_pick_arrow_down" ] = false;
        }

      },

      pickerDataFn() {
        let data = [
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

        let timeData = [
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
            name  : '广西001',
            value : '广西001',
            parent: 'china002'
          }, {
            name  : '美国001_001',
            value : '美国001_001',
            parent: 'usa001'
          }, {
            name  : '美国002_001',
            value : '美国002_001',
            parent: 'usa002'
          }
        ];

        this.pickerTimeData = timeData;
        this.pickerData     = data;

      },

      changePicker() {
        this.pickerValue = [ this.pickerValue[ this.pickerValue.length - 1 ] ];
        if ( this.pickerValue[ 0 ].length > 5 ) {
          this.pickArrowRight = 0.5;
        }
      },

      changeTimePicker() {
        this.pickerTimeValue = [ this.pickerTimeValue[ this.pickerTimeValue.length - 1 ] ];
        if ( this.pickerValue[ 0 ].length > 5 ) {
          this.pickArrowRight = 0.5;
        }
      },

      searchBlur() {

        console.log( "搜索失去焦点了" );
      },

      searchSubmit() {

        console.log( "表单提交触发了" );

      }

    }
  };
</script>

<style scoped lang="scss">
  .location_date {
    height: 2rem;
    display: flex;
    align-items: center;
  }

  .hotel_info {
    width: 95%;
    margin: 0 auto;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow: auto;

    .hotel_item {
      width: 100%;

      .img_wrap {
        width: 100%;
        position: relative;

        .hotel_img {
          width: 100%;
        }

        .price {
          position: absolute;
          bottom: 8%;
          left: 8%;
          padding: .2rem .3rem;
          background: rgba(0, 0, 0, .7);
          color: #eee;
          border-radius: .5rem;
        }

        .favorite {
          position: absolute;
          right: 8%;
          top: 0%;
          width: .5rem;
          height: .5rem;
          background: url("./../../../static/imgs/心.png") no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
          filter: drop-shadow(0px 0px 20px rgb(255, 20, 20)); //阴影实现:filter: drop-shadow(x偏移, y偏移, 模糊大小, 色值);
          animation: test 1s linear infinite;
        }

        .redHeat {
          background: url("./../../../static/imgs/红心.png") no-repeat;
          background-size: 100%;

        }

      }

      .hotel_introduce {
        text-align: left;
        padding-left: .5rem;
        letter-spacing: 1px;

        p {
          margin-top: 10px;
          margin-bottom: 10px;
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

</style>


<style lang="scss">
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

  .search {
    width: 95%;
    height: 1.5rem;
    margin: 0rem auto 0;
    position: relative;

    .weui-search-bar {
      padding: 0;
      background: none;

      .weui-search-bar__form {
        padding: 8px 10px;

        .weui-search-bar__label {
          display: flex;
          justify-content: center;
          align-items: center;

        }
      }

      .weui-search-bar__cancel-btn {
        display: none !important;
      }

    }

  }

</style>



