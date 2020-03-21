import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Aboutus from '@/pages/home/Aboutus'
import enter from '@/pages/home/enter'
import feedback from '@/pages/home/feedback'
import information from '@/pages/home/information'
import Banner from '@/pages/home/Banner'
import hotparticulars from '@/pages/home/hotparticulars'
import denglv from '@/pages/home/denglv'
import login from '@/pages/home/login'
import addarticle from '@/pages/home/addarticle'
import dynamic from '@/pages/home/dynamic'
import newdynamic from '@/pages/home/newdynamic'
import orderinfo from '@/pages/home/orderinfo'



// 注册使用路由
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页',
        requireAuth: true
      }
  },
{
  path: '/home/Aboutus',
  name: 'Aboutus',
  component: Aboutus,
  meta: {
    title: '关于我们',
    requireAuth: false
  }
},
{
  path: '/home/enter',
  name: 'enter',
  component: enter,
  meta: {
    title: 'dd',
    requireAuth: false
  }
},
{
  path: '/home/feedback',
  name: 'feedback',
  component: feedback,
  meta: {
    title: '留言',
    requireAuth: false
  }
},
{
  path: '/home/information',
  name: 'information',
  component: information,
  meta: {
    title: '美文',
    requireAuth: false
  }
},
{
  path: '/home/Banner',
  name: 'Banner',
  component: Banner,
  meta: {
    title: '景点详情',
    requireAuth: false
  }
},
{
  path: '/home/hotparticulars',
  name: 'hotparticulars',
  component: hotparticulars,
  meta: {
    title: '美文详情',
    requireAuth: false
  }
},
{
  path: '/home/denglv',
  name: 'denglv',
  component: denglv,
  meta: {
    title: '登录',
    requireAuth: false
  }
},
{
  path: '/home/login',
  name: 'login',
  component: login,
  meta: {
    title: '注册',
    requireAuth: false
  }
},
{
  path: '/home/addarticle',
  name: 'addarticle',
  component: addarticle,
  meta: {
    title: '新增景点',
    requireAuth: false
  }
},
{
  path: '/home/dynamic',
  name: 'dynamic',
  component: dynamic,
  meta: {
    title: '旅游动态',
    requireAuth: false
  }
},
{
  path: '/home/newdynamic',
  name: 'newdynamic',
  component: newdynamic,
  meta: {
    title: '发布旅游动态',
    requireAuth: false
  }
},
{
  path: '/home/orderinfo',
  name: 'orderinfo',
  component: orderinfo,
  meta: {
    title: '订单详情',
    requireAuth: false
  }
},

  ]
})
