import router from '@/router' // 引入路由实例
import store from '@/store' // 引入vuex store实例

const whiteList = ['/login', '/404'] // 白名单

// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 有无token
  if (store.getters.token) {
    // 有token 是否去往登录页，在登录页，去往首页
    if (to.path === '/login') {
      //  表示去的是登录页
      next('/') // 跳到主页
    } else {
      // 有token 是否去往登录页，不在登录页，直接放行
      next() // 直接放行
    }
  } else {
    // 无token 是否去往白名单，在白名单，直接放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 无token 是否去往白名单，不在白名单，去往登录页
      next('/login')
    }
  }
})
