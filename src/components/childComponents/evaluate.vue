<template>
  <div class="evaluate">

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

    <div class="evaluate_star">
        <p class="cc"></p>
        <p class="cc"></p>
        <p class="cc"></p>
        <p class="cc"></p>
        <p class="cc"></p>
    </div>

    <div class="evaluate_text">
      <textarea name="" id="xx" cols="30" rows="10" placeholder="聊聊您本次交易的感受"></textarea>
    </div>

    <div class="evaluate_comfrim">
      <div>
        提交
      </div>
    </div>


  </div>
</template>

<script>
    export default {
      name: "evaluate",
      mounted() {

        let stars = document.getElementsByClassName("cc");
        for ( let i = 0; i < stars.length; i++ ) {
          stars[i].index = i;
          stars[i].onclick = function () {

            for ( let j = 0; j < this.index + 1; j++ ) {
              stars[j].style.background     = "url(./../../../static/imgs/星2.png) no-repeat center center";
              stars[j].style.backgroundSize = "contain";
            }

            for ( let j = stars.length - 1; j > this.index ; j-- ) {
              stars[j].style.background     = "url(./../../../static/imgs/星1.png) no-repeat center center";
              stars[j].style.backgroundSize = "contain";
            }

          }

        }

      },

      data (){
        return {
          textPrompt: true
        }

      },
      methods: {
        fu () {
          this.textPrompt = false
        }
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
