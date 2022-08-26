
import router from '@/router'
import store from '@/store/index'
import axios from 'axios'
import { Message } from 'element-ui'

// 设置token 有效时间
const timeOut = 3600
// 定义token超时函数
// const tokenTimeOut = () => {
//   return (+new Date() - store.getters.loginTime) / 1000 > timeOut1
// }
function tokenTimeOut() {
  return ((Date.now() - store.getters.loginTime) / 1000 > timeOut)
}
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor  请求拦截器
service.interceptors.request.use(config => {
  // 添加token
  if (store.getters.token) {
    console.log(store)
    if (tokenTimeOut()) {
      // 判断token 是否过期
      store.dispatch('user/logout')
      router.push('/login')
      // Message.error('token过期了')
      return Promise.reject(new Error('token过期了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置
}, error => {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response
    // 验证码错误处理
    if (!(res.data.msg === '验证码错误')) {
      return res
    } else {
      Message.error(res.data.msg)
      return Promise.reject(new Error(res.data.msg))
    }
  }
)

export default service
