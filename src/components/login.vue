<template>
  <div class="login">
    <div class="center">
      <div class="top_logo flex_center">
        <img class="logo" src="./../../static/imgs/logo.png" alt="">
      </div>

      <div v-if="isLogin" class="login_item">
        <div class="center_inp flex_center">
          <input v-model="username" class="inp_item" style="height: 20%;" type="text" placeholder="用户名">
          <input v-model="password" class="inp_item" style="height: 20%;" type="password" placeholder="密码">
        </div>
        <div class="bom_btn flex_center">
          <div class="bom_center">
            <router-link :to="LoginRouter">
              <XButton @click.native="clickLogin" type="primary" class="btn_login">登录</XButton>
            </router-link>
            <p>还没有账号?</p>
            <XButton @click.native="clickRegister" type="primary" class="btn_regiser">注册</XButton>
          </div>
        </div>
      </div>

      <div v-else class="login_item">
        <div class="center_inp flex_center" style="height: 50%;">
          <input class="inp_item" v-model="registerUsername" type="text" v-on:blur="usernameBlur" placeholder="用户名">
          <input class="inp_item" v-model="registerPassword" type="password" v-on:blur="passwordBlur" placeholder="密码">
          <input class="inp_item" v-model="registercomfirm" type="password" v-on:blur="comfirmPasswordBlur" placeholder="确认密码">
        </div>
        <p style="color: #f30;font-size: .3rem;" v-if="registerWarnning"> {{ warnning }} </p>

        <div class="bom_btn flex_center" style="height: 45%;">
          <div class="bom_center">
            <router-link :to="LoginRouter">
              <XButton @click.native="register" type="primary" class="btn_login">注册</XButton>
            </router-link>
          </div>
        </div>
      </div>

    </div>
    <div class="leftArrow">
      <topArrow :direction="left"></topArrow>
    </div>
  </div>
</template>

<script>
  // import Swiper from "swiper"
  import { XButton, AlertModule } from "vux";
  import topArrow from "./childComponents/topArrow"

  export default {
    name      : 'login',
    created() {
      // this._initSwiper();

    },
    components: {
      XButton,
      topArrow,
      AlertModule
    },
    data() {
      return {
        left : "left",
        right: "right",

        isLogin: true,

        LoginRouter: "",

        username        : "",
        password        : "",
        registerUsername: "",
        registerPassword: "",
        registercomfirm : "",
        registerWarnning: true,
        warnning        : ""
      }
    },
    directives: {
      mouseleave: {
        // 指令的定义
        inserted: function ( el ) {
          console.log( el );
        }
      }
    },
    methods   : {

      clickLogin() {
        let self = this;
        if ( !self.username || !self.password || self.password.length < 6 ) {
          AlertModule.show( {
            title  : '提示',
            content: "用户名不存在或密码长度错误"
          } );
          return;
        }

        //post
        global.globalVal.oauth.userLogin( self.username.trim(), self.password.trim(), function ( err, res ) {

          if ( err ) {
            AlertModule.show( {
              title  : '提示',
              content: err
            } );
            return;
          }
          //跳转
          window.history.length > 1 ? self.$router.go( -1 ) : self.$router.push( '/' );

        } );

      },

      clickRegister() {
        let self     = this;
        self.isLogin = false;

      },

      register() {
        let self = this;

        if( self.warnning ) {

          AlertModule.show( {
            title  : '提示',
            content: "输入有误: " + self.warnning
          } );
          return;
        }

        global.globalVal.oauth.userRegister( self.registerUsername, self.registerPassword, self.registercomfirm, function (err, tf) {

          if( err ) {
            AlertModule.show( {
              title  : '提示',
              content: err
            } );
            return;
          }

          AlertModule.show( {
            title  : '提示',
            content: '注册成功',
            onHide () {
              window.history.length > 1 ? self.$router.go( -1 ) : self.$router.push( '/' );

            }
          } );

        } );

      },

      usernameBlur() {
        let self = this;


        if( self.registerUsername.trim().length < 5 ) {
          AlertModule.show( {
            title  : '提示',
            content: '用户名长度必须大于5',
          } );
          return;
        }

        global.globalVal.oauth.checkUserNameIsSingleOne( self.registerUsername, function ( err, tf ) {
          if ( err ) {
            self.warnning = err;
            return;
          }

          self.warnning = "";
          self.passwordBlur();

        } );
      },

      passwordBlur() {
        let self = this;
        if ( self.registerPassword.length < 6 ) {
          self.warnning = "密码长度不能小于6位";
          return;
        }

        self.warnning = "";
        self.comfirmPasswordBlur();

      },

      comfirmPasswordBlur () {
        let self = this;
        if ( self.registerPassword !== self.registercomfirm ) {
          self.warnning = "密码不一致";
          return;
        }
        self.warnning = "";

      }
    },
  }
</script>

<style scoped lang="scss">
  // @import "./../../node_modules/swiper/dist/css/swiper.css";
  .flex_center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .leftArrow {
    position: absolute;
    top: 2%;
    left: 5%;

  }

  .login {
    width: 100%;
    height: 100%;
    background: url("./../../static/imgs/登录注册背景.png");
    background-size: contain;
    .center {
      width: 60%;
      height: 100%;
      margin: 0 auto;
    }

    .top_logo {
      width: 100%;
      height: 35%;
      padding-top: 5%;
      .logo {
        width: 45%;
      }
    }

    .login_item {

      width: 100%;
      height: 60%;
    }
    .center_inp {
      width: 100%;
      height: 35%;
      justify-content: space-around;

      .inp_item {
        width: 100%;
        height: 15%;
        border: 0;
        background: none;
        color: #2c3e50;
        font-size: .5rem;
        border-bottom: 2px solid #d1c0a5;
        padding-left: .2rem;
      }

      .inp_item:focus {
        outline: none;
      }
    }

    .bom_btn {
      width: 100%;
      height: 65%;
      color: #313131;

      .bom_center {
        width: 110%;
        button {
          height: 1.3rem;
          border-radius: 1rem;
        }

        p {
          font-size: .3rem;
        }

      }

      .btn_login {
        background-color: #f5b400;
      }

      .btn_regiser {
        border: 1px solid #f5b400;
        background: none;
        color: #f5b400;
      }

    }

    touch-action: none;
  }

  @media screen and (min-width: 768px) {
    .login {
      background-size: cover;
    }
  }

</style>
