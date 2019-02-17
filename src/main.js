// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "lib-flexible/flexible.js"
import Swiper from "swiper/dist/js/swiper.min.js"
import "swiper/dist/css/swiper.min.css"
import  { ConfirmPlugin } from 'vux'

const FastClick = require('fastclick')

Vue.config.productionTip = false
/* eslint-disable no-new */
FastClick.attach(document.body)
Vue.use(ConfirmPlugin);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
