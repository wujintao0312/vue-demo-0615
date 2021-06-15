import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router/index'

// 引入通过样式/字体图标
import './styles/iconfont.css'
import './styles/base.css'

// 引入页面rem适配插件
import 'lib-flexible'

// 引入vant组件库
import vant from 'vant'
Vue.use(vant)
import 'vant/lib/index.css'

// 全局注册组件
import PageHeader from './components/PageHeader.vue'
import CommonInput from './components/CommonInput.vue'
import CommonButton from './components/CommonButton.vue'
import CommonLogo from './components/CommonLogo.vue'
Vue.component('PageHeader', PageHeader)
Vue.component('CommonInput', CommonInput)
Vue.component('CommonButton', CommonButton)
Vue.component('CommonLogo', CommonLogo)

// axios优化
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$axios = axios //将axios挂载到vue的原型上

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  router
}).$mount('#app')