<template>


  <div class="swiper-wrapper">


    <div class="swiper-slide menu">
      <!-- menu side -->
      <div class="user_info">
        <div class="user_center">
          <div class="user_img"></div>

          <div class="user_info_detail">
            <span class="user_name" style="font-size: .5rem;"> {{ userInfo.userName }} </span>
            <span class="user_email">{{userInfo.email }}</span>
          </div>
        </div>
      </div>

      <div class="hotel_menu">
        <div class="top_menu">
          <div>
            <img src="./../../static/imgs/share.png" alt="">
            <p>我的订单</p>
          </div>
          <div>
            <img src="./../../static/imgs/share.png" alt="">
            <p>我的收藏</p>
          </div>
          <div>
            <img src="./../../static/imgs/share.png" alt="">
            <p>个人资料</p>
          </div>
        </div>
        <div class="bom_menu">
          <img src="./../../static/imgs/share.png" alt="">
          <p> 退出登录</p>
        </div>
      </div>
    </div>
    <div class="swiper-slide content" style="overflow:scroll;">
      <div class="menu-button"></div>
      <!-- 内容 -->
      <div class="rotelPage">

        <!-- 顶部banner -->
        <div class="top_banner">
          <div class="home" @click.passive="showLeftSide">
            <img width="55%" src="./../../static/imgs/home.png" alt="">
          </div>
          <div class="home home_title">
            {{ homeTitle }}
          </div>
          <div class="home right_arrow">
            <topArrow :direction="right"></topArrow>
          </div>
        </div>

        <!-- 酒店页面组件 -->
        <showHotel v-if="showHotel"></showHotel>
        <!-- 个人中心 -->
        <userInfo v-if="userDetail"></userInfo>

        <!-- 我的收藏 -->

        <favorite v-if="true"></favorite>

      </div>
    </div>
  </div>
</template>

<script>
  import topArrow  from "./childComponents/topArrow";
  import showHotel from "./childComponents/showHotel"
  import userInfo  from "./childComponents/userInfo"
  import Swiper    from "swiper";
  import favorite  from "./childComponents/favoritePage"

   //import { Flexbox, FlexboxItem, PopupPicker, Search } from 'vux'

  export default {
    name      : "hotelPage",
    mounted() {
      this._initSwiper();
    },
    components: {
      topArrow,
      showHotel,
      userInfo,
      favorite
    },
    data() {
      return {

        right   : "right",
        userInfo: {
          userName: "啦啦啦",
          email   : "357104242@qq.com"
        },
        homeTitle: "我的收藏",

        showHotel: false,
        userDetail : false
      };
    },
    methods   : {
      showLeftSide( el ) {
        console.log( 1 );
      },

      _initSwiper() {
        let self       = this;
        var menuButton = document.querySelector( ".menu-button" );
        var swiper     = new Swiper( ".swiper-container", {
          slidesPerView      : "auto",
          initialSlide       : 1,
          resistanceRatio    : 0,
          slideToClickedSlide: true,
          mousewheel         : false,
          on                 : {
            init       : function () {
              var slider = this;
              menuButton.addEventListener(
                "click",
                function () {
                  if ( slider.activeIndex === 0 ) {
                    slider.slideNext();
                  } else {
                    slider.slidePrev();
                  }
                },
                true
              );
            },
            slideChange: function () {
              //var slider = this;
              //if (slider.activeIndex === 0) {
              //  menuButton.classList.add("cross");
              //} else {
              //  menuButton.classList.remove("cross");
              //}
            },

          }
        } );
      },

    }
  };
</script>

<style scoped lang="scss">
  .rotelPage {
    width: 95%;
    height: 100%;
    margin: 0 auto;

    .top_banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0rem;

      .home {
        width: 15%;
      }

      .home_title {
        font-size: 0.6rem;
        font-weight: bold;
        margin-top: -5px;
        width: 50%;
        white-space: nowrap;
      }
      .right_arrow {
        width: 15%;
      }
    }
  }

  // 侧边样式
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    flex-direction: column;
  }

  .menu {
    min-width: 100px;
    width: 75%;
    max-width: 320px;
    color: #fff;
    background: url(./../../static/imgs/图层3.png) no-repeat;
    background-size: 100% 100%;

    .user_info {
      width: 100%;
      height: 25%;
      display: flex;
      justify-content: center;
      align-items: center;

      .user_center {
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        .user_img {
          width: 2rem;
          height: 2rem;
          background: url(./../../static/imgs/Koala.jpg) no-repeat;
          background-size: 100% 100%;
          border-radius: 50%;
        }

        .user_info_detail {
          width: 50%;
          text-align: left;
          display: flex;
          flex-direction: column;
          span {
            padding: 0.1rem 0.3rem;
            font-size: .4rem;
          }
        }
      }
    }

    .hotel_menu {
      width: 100%;
      height: 75%;

      .top_menu {
        width: 100%;

        div {
          padding: 0rem .5rem .1rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          img {
            width: .8rem;
            height: .8rem;
            padding-right: .3rem;
          }
        }
      }

      .bom_menu {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 1rem .5rem .1rem;

        img {
          width: .8rem;
          height: .8rem;
          padding-right: .3rem;
        }
      }

    }

  }

  .content {
    width: 100%;
  }

  .menu-button {
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 0.8rem;
    cursor: pointer;
    -webkit-transition: 0.3s;
    transition: 0.3s;

  }

</style>


