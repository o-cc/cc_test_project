<template>

  <div class="userInfo">
    <div class="top_banner_bgc"></div>
    <div style="position: relative;">
      <input type="file" accept="image/*" multiple @change="headImgChange" class="image_file">
      <img class="userInfo_img" :src="headImg" alt="">
    </div>

    <div class="userInfo_detail">
      <div>
        <input class="inp_item" type="text" v-model="name">
        <span class="inp_title">昵称</span>
      </div>
      <div>
        <input class="inp_item" type="text" @blur="checkPhone" v-model="phone">
        <span class="inp_title">手机</span>

      </div>
      <div>
        <!--<input type="text" v-model="pickerSexValue">-->
        <span class="inp_title">性别</span>
        <PopupPicker class="inp_item" v-model="pickerSexValue" :columns="1" :data="pickerSexData"></PopupPicker>
      </div>
    </div>

    <div class="btns">
      <div>
        <img src="./../../../static/imgs/1.png" alt="" @click="clickSave">
        <p class="btn-item">保存</p>
      </div>
      <div>
        <img src="./../../../static/imgs/2.png" alt="" @click="clickCancel">
        <p class="btn-item" style="color: #f5b400;">取消</p>
      </div>
    </div>

  </div>
</template>

<script>
  import { PopupPicker, AlertModule } from 'vux'

  export default {

    components: {
      PopupPicker,
      AlertModule
    },

    mounted() {
      this.run();

    },
    data() {
      return {
        pickerSexValue: [ "性別" ],
        pickerSexData : [ "男", "女" ],

        name        : "",
        phone       : "",
        headImg     : "./../../../static/imgs/Koala.jpg",
        headImgValue: "",

        headImg1: null
      };
    },

    methods: {
      clickCancel() {
        //应该回到首页
        let self = this;

        self.$emit( "showHotel", "showHotel" );
      },

      clickSave() {
        let self = this;

        if( self.checkPhone() ) {
          return;
        }

        global.globalVal.userInfo.putUserInfo( self.name, self.phone, self.headImg1, self.pickerSexValue[ 0 ] ,function ( err, res ) {

          if( err ) {
            console.log( err );
            return;
          }

          AlertModule.show( {
            title  : '提示',
            content: "修改成功",
            onHide () {
              self.$emit( "showHotel", "showHotel" );
            }
          } );

        } )
      },

      run() {
        let self = this;

        let userInfo = global.globalVal.userInfo.userInfoIncache.getUserInfo();
        self.name                = userInfo[ "nickname" ];
        self.phone               = userInfo[ "mobile" ];
        self.pickerSexValue[ 0 ] = userInfo[ "gender" ] ? "男" : "女";

        if( userInfo[ "user_pic" ] ) {
          self.headImg = userInfo[ "user_pic" ];
        }

      },

      checkPhone() {
        let self = this;
        if ( !(/^1[34578]\d{9}$/.test( self.phone )) ) {
          AlertModule.show( {
            title  : '提示',
            content: "手机号码有误"
          } );
          return true;
        }

      },

      headImgChange( e ) {
        let self = this;

        let reader = new FileReader();
        reader.readAsDataURL( e.target.files[ 0 ] );
        self.headImg1 = e.target.files[ 0 ];
        reader.onload = function ( e ) {
          self.headImg = e.target.result;
        }

      }

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

      .image_file {
        position: absolute;
        top: 0;
        left: 50%;
        width: 2.8rem;
        height: 2.8rem;
        transform: translateX(-50%);
        opacity: 0;
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

        div {
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
            height: 40%;
            border: 0;
            background: none;
            color: #f5b400;
            font-size: .5rem;
            margin-top: 1rem;
            border-bottom: 2px solid #d1c0a5;
            padding-right: .2rem;
            text-align: right;

            >div {
              padding: 0;

              .weui-cell__ft::after {
                content: " ";
                width: 0;
                height: 0;
              }
            }





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
