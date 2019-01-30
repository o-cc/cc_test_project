<template>
  <div class="hotel_detail_info">
    <div class="top_icon">
      <Arrow direction="left"></Arrow>
      <p @click="clickFavorite" class="favorite"></p>
    </div>

    <div class="top_img">

    </div>

  </div>


</template>

<script>
  import Arrow from "./childComponents/topArrow"

  export default {
    name      : "hotelDetail",
    components: {
      Arrow
    },

    data() {
      return {
        redHeat: false

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
      height: 7rem;
      background: url("./../../static/imgs/Koala.jpg") no-repeat center center;
      -webkit-background-size: contain;
      background-size: contain;
    }
  }


</style>
