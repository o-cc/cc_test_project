<template>
  <div class="swiper-container">
    <login v-if="login"></login>
    <hotelPage v-if="hotelPage"></hotelPage>

  </div>
</template>

<script>
  import login     from "./login"
  import hotelPage from "./hotelPage"

  export default {
    name: "index",
    mounted() {
      // this._initSwiper();
      this.run();
    },
    components: {
      login,
      hotelPage
    },
    data() {
      return {
          login: false,
          hotelPage: true
      };
    },
    methods: {
      // _initSwiper() {
      //   var mySwiper = new Swiper(".swiper-container", {
      //     initialSlide: 1,
      //     direction: "horizontal", // 垂直切换选项
      //     loop: true, // 循环模式选项
      //     autoplay: true,
      //     speed: 1000,
      //     slidesPerView: "auto",
      //     // 如果需要分页器
      //     pagination: {
      //       el: ".swiper-pagination"
      //     },

      //     // 如果需要前进后退按钮
      //     navigation: {
      //       nextEl: ".swiper-button-next",
      //       prevEl: ".swiper-button-prev"
      //     },

      //     // 如果需要滚动条
      //     scrollbar: {
      //       el: ".swiper-scrollbar"
      //     },

      //     on: {

      //     }
      //   });
      // }

      run () {


      }
    }
  };

</script>

<style scoped lang="scss">
  .swiper-container {
    width: 100%;
    height: 100%;
  }

</style>
