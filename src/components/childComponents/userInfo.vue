<template>

  <div class="userInfo">
      <div class="top_banner_bgc"></div>
      <div>
        <img class="userInfo_img" src="./../../../static/imgs/Koala.jpg" alt="">
      </div>

    <div class="userInfo_detail">
      <div>
        <input class="inp_item" type="text">
        <span class="inp_title">昵称</span>
      </div>
      <div>
        <input class="inp_item" type="text">
        <span class="inp_title">手机</span>

      </div>
      <div>
        <!--<input type="text" v-model="pickerSexValue">-->
        <span class="inp_title">性别</span>
        <PopupPicker  class="inp_item" v-model="pickerSexValue" :columns="1" :data="pickerSexData"></PopupPicker>
      </div>
    </div>

    <div class="btns">
      <div>
        <img src="./../../../static/imgs/1.png" alt="" @click="clickSave">
        <p class="btn-item">保存</p>
      </div>
      <div>
        <img src="./../../../static/imgs/2.png" alt=""  @click="clickCancel">
        <p class="btn-item" style="color: #f5b400;">取消</p>
      </div>
    </div>

  </div>
</template>

<script>
  import { PopupPicker } from 'vux'

	export default {

    components: {
      PopupPicker
    },

		data() {
			return {
				msg: "wo de wfeilai dbushi ddmeng",
        pickerSexValue: ["123"],
        pickerSexData: ["男","女"]
			};
		},

    methods: {
      clickCancel () {
        console.log( "点击取消" );

      },

      clickSave () {
        console.log( "点击保存" );

      },

    },

	}
</script>

<style scoped lang="scss">

  .userInfo {
    width: 100%;
    height: 90%;

    .top_banner_bgc {
      width: 100%;
      position: absolute;
      top: 0;
      height: 3rem;
      background: linear-gradient(to top right, #fdf59d, #f5b400);
      left: 0;
      z-index: -1;
    }

    .userInfo_img {
      width: 2.8rem;
      height: 2.8rem;
      border-radius: 50%;
    }

    .userInfo_detail {
      width: 65%;
      height: 35%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: .5rem auto 1rem;

      div{
        width: 100%;
        position: relative;
        font-size: .45rem;

        .inp_title {
          position: absolute;
          left: .1rem;
          top: 1rem;
          color: #59493f;
        }

        .inp_item {
          width: 100%;
          height: 20%;
          border: 0;
          background: none;
          color: #f5b400;
          font-size: .5rem;
          margin-top: 1rem;
          border-bottom: 2px solid #d1c0a5;
          padding-right: .2rem;
          text-align: right;
        }

        .inp_item:focus {
          outline: none;
        }

        .inp_item::before {
          content: '';
          height: 0;
          width: 0;
        }
      }


    }

    .btns {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      div {
        position: relative;

          img {
            width: 80%;
            margin: 0.25rem;
          }

          .btn-item {
            position: absolute;
            top: 30%;
            left: 50%;
            color: #fff;
            transform: translateY(-50%) translateX(-50%);
          }
      }

    }
  }

</style>
