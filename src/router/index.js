import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import hotelDetail from '@/components/hotelDetail'
import globalVal from "../globalValue"
import hotelSearch from '@/components/hotelSearch'

global.globalVal = globalVal;
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/homePage',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'hotelSearch',
      component: hotelSearch
    },
    {
      path: '/hotelDetail',
      name: 'hotelDetail',
      component: hotelDetail
    }
  ]
})
