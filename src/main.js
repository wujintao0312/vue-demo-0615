import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router/index'

// 引入通用样式/字体图标
import './styles/iconfont.css'
import './styles/base.css'

// 引入页面rem适配插件
import 'lib-flexible'

// 引入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

// 引入图片上传组件
import {Uploader} from 'vant'
Vue.use(Uploader)

// 全局注册组件
import PageHeader from './components/PageHeader.vue'
import CommonInput from './components/CommonInput.vue'
import CommonButton from './components/CommonButton.vue'
import CommonLogo from './components/CommonLogo.vue'
import CommonNav from './components/CommonNav.vue'
Vue.component('PageHeader', PageHeader)
Vue.component('CommonInput', CommonInput)
Vue.component('CommonButton', CommonButton)
Vue.component('CommonLogo', CommonLogo)
Vue.component('CommonNav', CommonNav)

// 全局过滤器
import moment from 'moment'
Vue.filter('date', (input, str='YYYY-MM-DD') => {
  return moment(input).format(str)
})

// axios优化
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
// 配置axios响应拦截器
axios.interceptors.response.use((res) => {
  // 对需要验证token才能成功调用的接口来说，当token失效或是假的token时，后端是能对此token进行验证的
  // 对token验证的结果不通过的情况可以进行统一的处理
  const {statusCode, message} = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // 跳转到登录页去
    router.push('/login')
    // 移除失效token
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user_id')
  }
  return res
})

// 配置响应拦截器
axios.interceptors.request.use((config) => {
  // 统一的给所有请求都加上token
  const token = sessionStorage.getItem('token')
  config.headers.Authorization = token
  return config
})
Vue.prototype.$axios = axios //将axios挂载到vue的原型上

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  router
}).$mount('#app')