import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import http from  './http/request'
import { get,post} from './http/api'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$get = get
Vue.prototype.$post = post
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
