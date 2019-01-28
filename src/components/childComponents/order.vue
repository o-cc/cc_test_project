<template>
  <div class="order">
    <div class="banner_tab">
      <div class="banner_tab_btn" type="all" :class="{tab_active: firstTabBtn}" @click="clickFirstTabBtn('all')">全部</div>
      <div class="banner_tab_btn" type="evaluate" :class="{tab_active: secondTabBtn}" @click="clickSecondTabBtn('evaluate')">待评价</div>
      <div class="banner_tab_btn" type="waitIn" :class="{tab_active: lastTabBtn}" @click="clickLastTabBtn('waitIn')">待入住</div>
    </div>

    <div class="order_info" v-if="orderInfo">
      <div style="padding-bottom: 0;" v-for="( item, key, index ) in hotelInfoData" :key="index">
        <div class="hotel_info_wrap">
          <div class="img" :style='{background: "url("+item.imgUrl+") no-repeat center center", backgroundSize: "100%"}'></div>
          <div class="hotel_info_txt">
            <p class="hotel_name">{{ formatHotelName( item.hotelName ) }}</p>
            <p class="hotel_detail">{{ item.date }}</p>
            <p class="hotel_detail">{{ item.typeRoom}}</p>
            <p class="hotel_detail" style="height: 1rem;line-height: 1rem;">{{ item.price }}</p>
          </div>
        </div>
        <div class="hotel_info_btns">
          <p class="left_prompt">{{ item.status }}</p>
          <div class="order_info_btn"
               :class="{ hide: item.btn1.hide, flex: (!item.btn1.hide) }"
          >
            {{ item.btn1.text }}
          </div>
          <div class="order_info_btn order_info_btn_active"
            :class="{ hide: item.btn2.hide, flex: (!item.btn2.hide) }"
          >
            {{ item.btn2.text }}
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
  import { ButtonTab, ButtonTabItem } from 'vux'

  export default {
    name      : "order",
    components: {
      ButtonTab,
      ButtonTabItem
    },
    mounted() {

    },
    data() {
      return {

        firstTabBtn : true,
        secondTabBtn: false,
        lastTabBtn  : false,

        orderInfo: true,

        hotelInfoData: [
          {
            type: "evaluate",
            hotelName: "考拉四季阳光酒店 (中国站)",
            date: "8月9日-8月10日 共一晚",
            imgUrl: "./../../../static/imgs/Koala.jpg",
            typeRoom: "标准双人房",
            price: "$299",
            status: "未评价",
            btn1: {
              text: "删除",
              hide: false
            },
            btn2: {
              text: "重新预订",
              hide: false
            },
          },
          {
            type: "evaluate",
            hotelName: "考拉四季阳光酒店 (中国站)",
            date: "8月9日-8月10日 共一晚",
            imgUrl: "./../../../static/imgs/Koala.jpg",
            typeRoom: "标准双人房",
            price: "$299",
            status: "未评价",
            btn1: {
              text: "取消",
              hide: false
            },
            btn2: {
              text: "立即评价",
              hide: true
            },
          },
          {
            type: "evaluate",
            hotelName: "考拉四季阳光酒店 (中国站)",
            date: "8月9日-8月10日 共一晚",
            imgUrl: "./../../../static/imgs/Koala.jpg",
            typeRoom: "标准双人房",
            price: "$299",
            status: "未评价",
            btn1: {
              text: "删除",
              hide: true
            },
            btn2: {
              text: "去评价",
              hide: false
            },
          },
          {
            type: "evaluate",
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
            },
          },

        ]

      }

    },

    methods: {
      clickFirstTabBtn( ShowAll ) {
        //console.log( "点击第一个" );
        this.firstTabBtn  = true;
        this.secondTabBtn = false;
        this.lastTabBtn   = false;




      },

      clickSecondTabBtn() {
        //console.log( "点击第2个" );
        this.firstTabBtn  = false;
        this.secondTabBtn = true;
        this.lastTabBtn   = false;

      },

      clickLastTabBtn() {
        //console.log( "点击第3个" );
        this.firstTabBtn  = false;
        this.secondTabBtn = false;
        this.lastTabBtn   = true;

      },

      formatHotelName ( name ) {

        if( typeof name !== "string" ) {
          return name;
        }

        if( name.length > 10 ) {
          return name.slice( 0,10 ) + "...";
        }

        return name;

      }

    },
  }
</script>

<style scoped lang="less">

  .order {
    width: 100%;
    height: 90%;

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
        /*background-color: #f5b400;*/
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
      height: 90%;
      /*background-color: #f90;*/

      div {
        width: 95%;
        background-color: #fff;
        margin: 0 auto 0.5rem;
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
