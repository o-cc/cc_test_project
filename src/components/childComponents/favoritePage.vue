<template>
  <div class="favoritePage">
    <div class="search">
      <Search placeholder="地标位置/酒店标题" v-model="searchValue" position="absolute" @on-blur="searchBlur"
              @on-submit="searchSubmit"></Search>
    </div>

    <div class="favorite_hotel">
        <div @click="goHotelDetail( item.id )" class="hotel_item" v-for="(item, value, index) in hotelDetailInfo" :key="item.id">
          <div class="hotel_img" :style="{backgroundImage: item.image}"></div>
          <div class="hotel_info">
            <p class="hotel_name">{{ item.name }}</p>
            <p @click="clickFavorite( item.id )" class="favorite"></p>
            <p class="hotel_address">
              <span style="color: #f9c558;">{{ item.comm_score }}分</span>
              <span class="circle"></span>
              <span>{{ item.total_comm }}条评价</span>
              <span class="circle"></span>
              <span>{{ item.place }}</span>
            </p>
            <p class="hotel_tag">
              <span style="background: #fff1cc;color:#f7b500;" v-for="(type, index) in item.types"
                    v-bind:style="{color: type.color,background: colorRgb( type.color?type.color:'#000000' ) }">{{ type.name }}</span>

            </p>
            <p style="text-align: left">
              <span style="color:#f7b500;font-size: .4rem;">{{ item.low_price }}</span>

            </p>
          </div>
        </div>
    </div>
  </div>


</template>

<script>
  import { Search,AlertModule } from "vux"

  export default {
    name      : "favoritePage",
    components: {
      Search,
      AlertModule
    },
    mounted () {
      let self = this;
      self.run();

    },

    data() {
      return {
        searchValue: "",
        hotelDetailInfo: [
          {
            "id"        : 1,
            "name"      : "万达嘉华酒店",
            "image"     : "http://127.0.0.1/images/ix.jpg",
            "place"     : "广州市增城增城广场南",
            "types"     : [
              {
                "name" : "速定",
                "color": "red"
              },
              {
                "name" : "七天可退",
                "color": "green"
              },
              {
                "name" : "超干净",
                "color": null
              }
            ],
            "low_price" : "150.00",
            "comm_score": 5,
            "total_comm": 3
          },
          {
            "id"        : 2,
            "name"      : "太阳城酒店",
            "image"     : "http://127.0.0.1/images/ix_6DQawxB.jpg",
            "place"     : "广州市增城增城广场南",
            "types"     : [],
            "low_price" : "150.00",
            "comm_score": 0,
            "total_comm": 0
          }
        ],

        redHeat: true,

      }

    },
    methods: {

      goHotelDetail( hotelId ) {
        let self = this;
        if( !hotelId ) {
          AlertModule.show( {
            title  : '提示',
            content: "没有该酒店",
          } );
          return;
        }
        global.globalVal.hotelInfo.hotelInfoSingleOne.hotelTempInfo.hotelId = hotelId;
        self.$router.push( '/hotelDetail' );
      },

      searchSubmit() {
        console.log( "按了提交" );
      },

      searchBlur() {
        console.log( "失去焦点" );
      },

      run () {
        let self = this;
        if ( !window.localStorage.getItem( "token" ) ) {
          AlertModule.show( {
            title  : '提示',
            content: "请登录查看收藏",
            onHide () {
              self.$router.push( "/login" );
            }
          } );

          return;
        }

        //应该先获取到所有的已收藏的酒店的信息然后写入
        global.globalVal.favorite.getFavoriteHotelLists()
          .then( res => {
            self.hotelDetailInfo = res;
          })
          .catch( err => {
            AlertModule.show( {
              title  : '提示',
              content: err,
              onHide () {
                self.$emit( "showHotel", true );
              }
            } );
          })

      },

      clickFavorite( id ) {
        //验证有没有登录
        let self = this;

        if ( !self.redHeat ) {
          self.$vux.confirm.show( {
            title  : '提示',
            content: '是否确认添加收藏',
            onConfirm() {
              //红心变化
              global.globalVal.hotelInfo.postAddFavorite( id, function ( err, tf ) {
                if ( err ) {
                  AlertModule.show( {
                    title  : '提示',
                    content: err
                  } );
                  return;
                }

                AlertModule.show( {
                  title  : '提示',
                  content: "添加成功!",
                  onHide() {
                    self.redHeat     = true;
                    self.favoriteImg = "url(./../../../static/imgs/红心.png)";
                  }
                } );
              } )
            }
          } );
        }

        if ( self.redHeat ) {
          self.$vux.confirm.show( {
            title  : '提示',
            content: '是否取消收藏',
            onConfirm() {
              //红心变化
              global.globalVal.hotelInfo.postCancelFavorite( id, function ( err, tf ) {

                if ( err ) {
                  AlertModule.show( {
                    title  : '提示',
                    content: err
                  } );
                  return;
                }

                AlertModule.show( {
                  title  : '提示',
                  content: "取消收藏!",
                  onHide() {
                    //这里应该请求一次数据
                    global.globalVal.favorite.getFavoriteHotelLists()
                      .then( res => {
                        self.hotelDetailInfo = res;

                      })
                      .catch( err => {
                        AlertModule.show( {
                          title  : '提示',
                          content: err
                        } );
                      })

                  }
                } );
              } );
            }
          } );
        }
      },

      colorRgb( color ) {
        return global.globalVal.formatDate.colorRgb( color );
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
            background: url("./../../../static/imgs/红心.png") no-repeat;
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
