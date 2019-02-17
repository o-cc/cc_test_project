<template>
  <div style="min-height: 90%;width: 100%;">

    <div class="order_detail">

      <div class="top_info">
            <div class="hotel_info">
                <div class="hotel_img"></div>
                <div class="hotel_txt">
                  <div class="hotel_name">
                      酒店的名字
                  </div>

                  <div class="hotel_tag">
                    <p style="line-height: 0.2rem;">标准双人床</p>
                    <p style="background-color:#cef2e1;padding: .1rem;color: #109d59;">七天可退</p>
                  </div>

                </div>
            </div>
        </div>

      <div class="order_date">
        <div>
          <!--<p>8月20号 <span style="color: #d0cfe5; font-size: .4rem; margin-left: .2rem;">周三</span></p>-->
          <!--<p><span style="padding: 0.1rem .3rem;border: 1px solid #d4d3e8;border-radius: .5rem;">8晚</span></p>-->
          <!--<p><span style="color: #d0cfe5; font-size: .4rem; margin-right: .2rem;">周日</span > 8月29号</p>-->
          <div class="date_picker">
            <group>
              <calendar title="title" v-model="dateTimeValue" :display-format="formatDate"
                        @on-change="dateChange" :start-date="startDate"></calendar>
            </group>
          </div>

          <div class="date_txt">
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

        </div>
      </div>

      <div class="order_hotel_info">
        <div>
          <div>
            <p>预定间数</p>
            <p>
              <span class="reduce" @click="reduceRoom">-</span>
              <span style="color: #000; margin:0 .2rem;letter-spacing: 1px">{{ roomNum }} 间</span>
              <span class="add" @click="addRoom">+</span>
            </p>
          </div>
          <div>
            <p>入住人数</p>
            <p>
              <span class="reduce" @click="reducePerson">-</span>
              <span style="color: #000;margin:0 .2rem;letter-spacing: 1px">{{ personNum }} 间</span>
              <span class="add" @click="addPerson">+</span>
            </p>
          </div>
          <div>
            <p>手机号</p>
            <p><input type="text" placeholder="请填写手机号码"></p>
          </div>
          <div>
            <p>联系人</p>
            <p><input type="text" placeholder="请填写真实姓名"></p>
          </div>
        </div>
      </div>

      <div class="id_card">
        <div>
          <div class="id_card_left">
            <div class="id_card_txt">入住人信息</div>
            <div>
              <input type="text" placeholder="姓名">
            </div>
          </div>

          <div class="id_card_right">
            <div class="id_card_txt" style="text-align: right;">入住人信息</div>
            <div>
              <input type="text" placeholder="身份证"  style="text-align: right;">
            </div>
          </div>
        </div>
        </div>

      <div class="invoice">
        <div>
          <div style="color:#d0cfe5;">发票</div>
          <div style="height: 1.5rem;">
            <Group class="pick_invoice">
              <PopupPicker v-model="pickValue" :columns=1 :data="pickDataOfInvoice" placeholder="发票"></PopupPicker>
            </Group>
          </div>
        </div>
      </div>


      <div class="order_hotel_info order_hotel_price ">
        <div>
          <div>
            <p>房费</p>
            <p style="color: #000;">￥299</p>
          </div>
          <div>
            <p>住宿意外险</p>
            <p style="color: #000;">免费</p>
          </div>
          <div>
            <p>订单总额</p>
            <p style="color: #000;">￥299</p>
          </div>
          <div>
            <p>线上支付</p>
            <p style="color: #f5b400;">￥299</p>
          </div>
        </div>
      </div>

    </div>

    <div class="payment">
      <div class="left_price">订单总额大概30万吧</div>
      <div class="right_btn">确认支付</div>
    </div>
  </div>

</template>

<script>
  import { Group,PopupPicker,Calendar  } from 'vux'

  export default {
      name: "orderDetail",
      components: {
        Group,
        PopupPicker,
        Calendar
      },
    mounted () {
        this.run();

    },
      data () {
        return　{
          roomNum : 1,
          personNum: 1,

          pickValue: [],
          pickDataOfInvoice: ["开具发票","不开发票"],
          dateTimeValue  : [],
          firstDateObj   : {
            date   : "",
            weekDay: "请选择日期"
          },
          lastDateObj    : {
            date   : "",
            weekDay: "请选择日期"
          },
          startDate      : "",
          totalDay       : "请选择",
          roomId         : ""
        }

      },
      methods: {
        run() {
          let self = this;
          //获取首页选择的日期
          let date       = new Date();
          let month      = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
          self.startDate = date.getFullYear() + "-" + month + "-" + date.getDate();
          //入离日期
          let dateTimeValue  = global.globalVal.hotelInfo.hotelInfoSingleOne.hotelTempInfo.dateTimeValue;
          self.dateTimeValue = dateTimeValue ? dateTimeValue : self.dateTimeValue;

          //获取房间id
          let roomInfo = global.globalVal.hotelInfo.hotelInfoSingleOne.hotelTempInfo.hotelRoomInfo;

        },

        reduceRoom () {
          if( this.roomNum > 0 ) {
            this.roomNum--;
          }else {
            this.roomNum = 0;
          }

        },

        reducePerson () {

          if( this.personNum > 0 ) {
            this.personNum--;
          }else {
            this.personNum = 0;
          }

        },

        addPerson () {
          this.personNum ++;
        },

        addRoom () {
          this.roomNum ++;
        },

        formatDate() {
          return this.dateTimeValue.length + "晚";
        },
        dateChange() {
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

          let lastDate             = new Date( self.dateTimeValue[ self.dateTimeValue.length - 1 ] );
          let lastDateWeekDate     = "周" + global.globalVal.formatDate.formatDateObj.WeekNumTransformToChineseNum( lastDate.getDay() );
          self.lastDateObj.weekDay = lastDateWeekDate;
          //格式化日期
          self.lastDateObj.date    = (lastDate.getMonth() + 1) + "月" + (lastDate.getDate()) + "日";
          self.totalDay            = self.formatDate();
          global.globalVal.hotelInfo.hotelInfoSingleOne.hotelTempInfo.dateTimeValue = self.dateTimeValue;

        },
      }
    }
</script>

<style scoped lang="scss">

  .order_detail {
    width: 100%;
    height: 100%;
    letter-spacing: 1px;

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


    .order_date {
      height: 2rem;

      >div {
        width: 95%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        white-space: nowrap;
        position: relative;

        .date_picker {
          width: 100%;
          height: 1.5rem;
          overflow: hidden;
          z-index: 1;
          position: relative;

          > div {
            opacity: 0;

          }
        }

        .date_txt {
          display: flex;
          justify-content: space-around;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1.5rem;

          > p {
            position: absolute;
            top: 0%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            font-size: .2rem;
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


        >p {
          flex: 1;

        }
      }

    }

    .order_hotel_info, .order_hotel_price {

      >div {
        width: 93%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        >div {
          width: 100%;
          flex: 1;
          display: flex;
          justify-content: space-between;

          >p {
            font-size: .35rem;
            color: #d0cfe5;

            .reduce, .add {
              width: .5rem;
              height: .5rem;
              border-radius: 50%;
              border: 1px solid #000;
              display: inline-block;
              line-height: .5rem;
              font-size: .5rem;
              color: #000;
            }

            .reduce {
              border-color: #dfdfe6;
              color: #dfdfe6;

            }

            .add {
              line-height: .6rem;
            }

            >input {
              border: 0;
              outline: 0;
              text-align: right;
            }
          }
        }
      }


    }

    .id_card {
      height: 2rem;
      display: flex;

      >div{
        width: 95%;
        height: 100%;

        display: flex;
        justify-content: space-between;

        .id_card_txt {
          font-size: .35rem;
          text-align: left;
          color: #d0cfe5;
          padding: .2rem 0;
        }
        .id_card_left {
          width: 35%;

        }

        .id_card_left, .id_card_right {
          display: flex;
          justify-content: center;
          flex-direction: column;
        }

        input {
          border: 0;
          outline: none;
          height: 1rem;
        }
      }

    }

    .invoice {
      height: 1.5rem;
      justify-content: space-between;

      >div {
        width: 95%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        font-size: .35rem;


      }
    }


  }

  .payment {
    width: 100%;
    height: 1.5rem;
    margin-bottom: 0;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    >div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    .left_price {
      width: 70%;
    }

    .right_btn {
      width: 30%;
      background-color: #f5b400;
      color: #fff;

    }
  }


</style>

<style lang="scss">

  .pick_invoice {
    .weui-cells:before,.weui-cells:after {
      content: " ";
      border: 0 !important;
    }

    .vux-popup-picker-placeholder {
      font-size: .35rem;
    }
    .vux-popup-picker-value {
      font-size: .35rem;
      color: #000;

    }

  }

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



</style>
