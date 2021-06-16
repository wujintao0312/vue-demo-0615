import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import User from '../pages/User.vue'
import Edit from '../pages/Edit.vue'

// 注意点：要配置路由出口
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', component: Login, name: 'login'},
    {path: '/register', component: Register, name: 'register'},
    {path: '/user', component: User, name: 'user'},
    {path: '/edit', component: Edit, name: 'edit'}
  ]
})

// 配置导航守卫，可以在路由跳转时进行想要的操作
// 比如，有些页面是需要登录有token的情况下才能访问的
const authPath = ['/user', '/edit']
router.beforeEach((to, from, next) => {
  if (authPath.includes(to.path)) {
    const token = sessionStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
  next()
})

export default router