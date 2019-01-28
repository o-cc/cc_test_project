<template>
  <div class="order">
    <div class="banner_tab">
      <div class="banner_tab_btn" :class="{tab_active: firstTabBtn}" @click="clickFirstTabBtn">全部</div>
      <div class="banner_tab_btn" :class="{tab_active: secondTabBtn}" @click="clickSecondTabBtn">待评价</div>
      <div class="banner_tab_btn" :class="{tab_active: lastTabBtn}" @click="clickLastTabBtn">待入住</div>
    </div>

    <div class="order_info">
      <div>
        <div class="hotel_info_wrap">
          <div class="img"></div>
          <div class="hotel_info_txt">
            <p class="hotel_name">xxx阳光酒店（中国站）</p>
            <p class="hotel_detail">8月9日-8月10日 共一晚</p>
            <p class="hotel_detail">标准双人房</p>
            <p class="hotel_detail" style="height: 1rem;line-height: 1rem;">￥299</p>
          </div>
        </div>
        <div class="hotel_info_btns">
          <div>
            <p class="left_prompt">待评价</p>
          </div>
          <div class="order_info_btns">
            <div class="order_info_btn">删除</div>
            <div  class="order_info_btn order_info_btn_active">待评价</div>
          </div>
        </div>
      </div>

      <div>
        <div class="hotel_info_wrap">
          <div class="img"></div>
          <div class="hotel_info_txt">
            <p class="hotel_name">xxx阳光酒店（中国站）</p>
            <p class="hotel_detail">8月9日-8月10日 共一晚</p>
            <p class="hotel_detail">标准双人房</p>
            <p class="hotel_detail" style="height: 1rem;line-height: 1rem;">￥299</p>
          </div>
        </div>
        <div class="hotel_info_btns">
          <div>
            <p class="left_prompt">待评价</p>
          </div>
          <div class="order_info_btns">
            <div class="order_info_btn">删除</div>
            <div  class="order_info_btn order_info_btn_active">待评价</div>
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
        lastTabBtn  : false
      }

    },

    methods: {
      clickFirstTabBtn() {
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
        margin: 0 auto;
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
            }
          }


        }

        .hotel_info_btns {
          width: 90%;
          display: flex;

          div {
            width: 100%;
            padding: 0;
            display: flex;

            .left_prompt {
              font-size: .3rem;
              color: #ceced9;
              text-align: left;
              line-height: 1rem;
              margin: 0;
            }

            .order_info_btn {
              font-size: .4rem;
              height: .9rem;
              display: flex;
              width: 30%;
              justify-content: center;
              align-items: center;
              background-color: #f8f8f8;
              border-radius: 5px;
            }

            .order_info_btn_active {
              width: 60%;
              color: #fff;
              background-color: #f5b400;
            }
          }


          }



      }
    }
  }
</style>
