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
        <input class="inp_item" type="text">
        <span class="inp_title">性别</span>

      </div>

    </div>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				msg: "wo de wfeilai dbushi ddmeng"
			};
		}
	}
</script>

<style scoped lang="scss">

  .userInfo {
    width: 100%;
    height: 100%;

    .top_banner_bgc {
      width: 100%;
      position: absolute;
      top: 0;
      height: 3rem;
      background: linear-gradient(to top right, rgba(255,255,200,.6), #ebb018);
      left: 0;
      z-index: -1;
    }

    .userInfo_img {
      width: 2.8rem;
      height: 2.8rem;
      border-radius: 50%;
    }

    .userInfo_detail {
      width: 70%;
      height: 35%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 auto;

      div{
        width: 100%;
        position: relative;
        font-size: .45rem;

        .inp_title {
          position: absolute;
          left: .1rem;
          top: .9rem;
        }

        .inp_item {
          width: 100%;
          height: 20%;
          border: 0;
          background: none;
          color: #fcb810;
          font-size: .45rem;
          margin-top: 1rem;
          border-bottom: 2px solid #d1c0a5;
          padding-right: .2rem;
          text-align: right;
        }

        .inp_item:focus {
          outline: none;
        }
      }


    }
  }

</style>
