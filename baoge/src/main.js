// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import fts from './utils/autorem'
import store from './store.js'
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'
import 'swiper/dist/css/swiper.css'
import huitui from './pages/home/components/huitui'
import thetime from './pages/home/components/time'
import ElementUI from 'element-ui';
import '../node_modules/element-ui/lib/theme-chalk/index.css'

import axios from 'axios';

Vue.prototype.$axios=axios
Vue.prototype.BasedUrl="http://127.0.0.1:3000"

Vue.use(ElementUI);




Vue.component('huitui',huitui);
Vue.component('thetime',thetime);

Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)


// 如果你需要让一个工具函数在每个组件可用，可以把方法挂载到 Vue.prototype上
Vue.prototype.nowtime=new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+" "+new Date().getHours()+":"+new Date().getMinutes()+":"+"00"
// 把路由跳转写成一个方法
Vue.prototype.go = function (e){//go是函数名
  this.$router.push({
    path: e
})
}

// 判断用户用否登录
router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth){
		if(JSON.parse(localStorage.getItem('userinfo'))!=null){
			next()
		}else{
			next({path:'/home/denglv'})
		}
	}else{
		next()
	}
})



new Vue({
  el: '#app',
  router,
  store,
  components: { App},
  template: '<App/>'
})
