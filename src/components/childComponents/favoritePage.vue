<template>
  <div class="favoritePage">
    <div class="search">
      <Search placeholder="地标位置/酒店标题" v-model="searchValue" position="absolute" @on-blur="searchBlur"
              @on-submit="searchSubmit"></Search>
    </div>

    <div class="favorite_hotel">
        <div class="hotel_item" v-for="(item,key, index) in hotelDetailInfo">
          <div class="hotel_img"></div>
          <div class="hotel_info">
            <p class="hotel_name">{{ item.name }}</p>
            <p @click="clickFavorite" class="favorite"></p>
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
            <p style="text-align: left">
              <span style="color:#f7b500;font-size: .4rem;">{{ item.price }}</span>

            </p>
          </div>
        </div>
    </div>
  </div>


</template>

<script>
  import { Search } from "vux"

  export default {
    name      : "favoritePage",
    components: {

      Search
    },
    data() {
      return {
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
    methods: {
      searchSubmit () {
        console.log( "按了提交" );

      },

      searchBlur () {
        console.log( "失去焦点" );
      },

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

    }
  }
</script>

<style scoped lang="scss">
  .favoritePage {
    width: 100%;
    height: 90%;
    /*background-color: #f90;*/

    .favorite_hotel {
      width: 95%;
      background-color: #fff;
      border-radius: 5px;
      margin: 0 auto 2rem;

      .hotel_item {
        display: flex;
        width: 100%;
        margin: 0 auto;
        padding: 0.3rem;
        border-bottom: 1px solid #f6f6f6;
        box-sizing: border-box;

        .hotel_img {
          width: 35%;
          height: 3.5rem;
          background: url("./../../../static/imgs/Koala.jpg") no-repeat center center;
          background-size: 100%;
          border-radius: 5px;
        }

        .hotel_info {
          width: 65%;
          display: flex;
          flex-direction: column;
          align-content: center;
          justify-content: space-between;
          position: relative;

          p{
            margin: 0;
            padding-left: .3rem;
          }

          .hotel_name {
            font-size: 0.45rem;
            font-weight: 600;
            color: #272636;
          }

          .favorite {
            position: absolute;
            right: 0%;
            bottom: 0%;
            width: .2rem;
            height: .4rem;
            background: url("./../../../static/imgs/心.png") no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
            filter: drop-shadow(0px 0px 20px rgb(255, 20, 20)); //阴影实现:filter: drop-shadow(x偏移, y偏移, 模糊大小, 色值);
            animation: test 1s linear infinite;
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
      }
    }

  }
</style>
