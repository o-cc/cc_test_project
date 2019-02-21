<template>
  <div class="evaluate">

    <div class="top_info">
      <div class="hotel_info">
        <div class="hotel_img"></div>
        <div class="hotel_txt">
          <div class="hotel_name">
            {{ orderInfo.hotel_name }}
          </div>

          <div class="hotel_tag">
            <p style="line-height: 0.2rem;">{{ orderInfo.room_name }}</p>
            <span style="background: #fff1cc;color:#f7b500;" v-for="(type, index) in orderInfo.types"
                  v-bind:style="{color: type.color,background: colorRgb( type.color?type.color:'#000000' ) }">{{ type.name }}</span>

          </div>

        </div>
      </div>
    </div>

    <div class="evaluate_star">
        <p class="cc"></p>
        <p class="cc"></p>
        <p class="cc"></p>
        <p class="cc"></p>
        <p class="cc"></p>
    </div>

    <div class="evaluate_text">
      <group>
        <x-textarea title="" v-model="textValue"  placeholder="聊聊您本次交易的感受~"></x-textarea>
      </group>
      <!--<textarea name="" id="xx" cols="30" rows="10" placeholder="聊聊您本次交易的感受"></textarea>-->
    </div>

    <div class="evaluate_comfrim">
      <div @click="submit">
        提交
      </div>
    </div>


  </div>
</template>

<script>

  import { Group, XTextarea, AlertModule } from 'vux'

  export default {
      name: "evaluate",
      components: {
        XTextarea,
        Group

      },
      mounted() {


        this.run();

      },

      data (){
        return {
          textValue: "",
          orderInfo: {},
          starNum: 0
        }

      },
      methods: {
        submit () {
          let self = this;
          /*
          * {
              "order": "201901251125020007",  # 订单id
              "text": "sbdbbdbdffbdfbdfbdfb",  # 评论内容
              "star": 5  # 评论星级
            }
          * */
          if ( !self.textValue.trim() ) {
            AlertModule.show( {
              title  : '提示',
              content: "请填写评价内容"
            } );
            return;
          }

          let evaluateData = {
            order: self.orderInfo[ "order_id" ],
            text: self.textValue,
            star: self.starNum

          }
          global.globalVal.hotelOrder.postOrderEvalute( evaluateData )
            .then( res => {
              if( res.order !== self.orderInfo[ "order_id" ] ) {
                AlertModule.show( {
                  title  : '提示',
                  content: "订单错误",
                } );
                return;
              }

              AlertModule.show( {
                title  : '提示',
                content: "评论成功!",
                onHide () {
                  //返回订单页面
                  self.$emit( "showOrder", "order" );
                }
              } );
            })
            .catch( err => {
              AlertModule.show( {
                title  : '提示',
                content: err
              } );
              return;

            })
        },

        run () {
          let bool;
          let self = this;
          let stars = document.getElementsByClassName("cc");
          for ( let i = 0; i < stars.length; i++ ) {
            stars[i].index   = i;
            stars[i].onclick = function () {
              //就这么写了吧赶时间, 以后要对这种辣鸡代码0容忍！
              //手机端不知道是否会出问题0.0
              //+1的原因是数组下标从0开始
              self.starNum = this.index + 1;

              if( bool === this.index ) {
                let bg = stars[ this.index ].style.background;

                if( bg === "url(\"./../../../static/imgs/星1.png\") center center / contain no-repeat" )
                {
                  stars[ this.index ].style.background     = "url(\"./../../../static/imgs/星2.png\") center center / contain no-repeat";
                  stars[ this.index ].style.backgroundSize = "contain";
                }
                else
                {
                  stars[ this.index ].style.background     = "url(\"./../../../static/imgs/星1.png\") center center / contain no-repeat";
                  stars[ this.index ].style.backgroundSize = "contain";
                  //如果是实心的星，那么直接等于下标索引
                  self.starNum = this.index;
                }
                return;
              }

              for ( let j = 0; j < this.index + 1; j++ ) {
                stars[j].style.background     = "url(./../../../static/imgs/星2.png) no-repeat center center";
                stars[j].style.backgroundSize = "contain";
              }

              for ( let j = stars.length - 1; j > this.index ; j-- ) {
                stars[j].style.background     = "url(./../../../static/imgs/星1.png) no-repeat center center";
                stars[j].style.backgroundSize = "contain";
              }

              bool = this.index;

            }
          }

          //获取该订单信息

          let orderInfo = global.globalVal.hotelOrder.getOrderInfoTemp();

          if( !orderInfo ) {
            AlertModule.show( {
              title  : '提示',
              content: "不存在该订单信息",
              onHide () {
                self.$emit( "showHotel", "order" );
                return;
              }
            } );
            return;
          }

          /*
          * btn1: Object
            btn2: Object
            chineseStatus: "已取消"
            date: "12月1日-12月2日 共-1晚"
            end_time: "2018-12-02"
            hotel_name: (...)
            image: (...)
            order_id: (...)
            room_name: (...)
            start_time: (...)
            status: (...)
            total_amount: (...)
            type: (...)
          * */
          self.orderInfo = orderInfo;

          //需要获取到房间的type

        },

        colorRgb( color ) {
          return global.globalVal.formatDate.colorRgb( color );
        },
      }
    }
</script>

<style scoped lang="scss">

  .evaluate {
    width: 100%;
    height: 90%;
    overflow: hidden;
    >div {
      width: 93%;
      margin: 0 auto .3rem;
      background-color: #fff;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .top_info {
      height: 3rem;

      .hotel_info {
        width: 90%;
        height: 85%;
        display: flex;
        justify-content: space-between;

        .hotel_img {
          width: 35%;
          height: 100%;
          background:url("./../../../static/imgs/Koala.jpg") no-repeat center center;
          background-size: 100%;
        }

        .hotel_txt {
          width: 60%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .hotel_name {
            font-size: 0.45rem;
            font-weight: 600;
            color: #272636;
            text-align: left;
          }

          .hotel_tag {
            text-align: left;
            width: 90%;
            font-size: .3rem;
            display: flex;
            justify-content: space-between;

            p {
              display: flex;
              align-items: center;
              border-radius: 3px;
            }
          }
        }
      }
    }

    .evaluate_star {
      height: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;

      >p {
        width: 12%;
        height: 60%;
        background: url("./../../../static/imgs/星1.png") no-repeat center center;
        -webkit-background-size: contain;
        background-size: contain;
      }

    }

    .evaluate_text {
      height: 3.5rem;

      textarea {
        width: 90%;
        height: 85%;
        border: 0;
        color: #333;
        outline: none;
        font-size: .4rem;
      }

    }

    .evaluate_comfrim {
      width: 90%;
      min-height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: none;

      div {
        width: 45%;
        height: 1.2rem;
        background: url("./../../../static/imgs/1.png") no-repeat center center;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
      }

    }

  }
</style>
