import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import hotelDetail from '@/components/hotelDetail'
import globalVal from "../globalVal/globalTips"

global.globalVal = globalVal;
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/hotelDetail',
      name: 'hotelDetail',
      component: hotelDetail
    }
  ]
})
