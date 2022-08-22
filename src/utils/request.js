import axios from 'axios'
import { Message } from 'element-ui'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(

)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response
    //   要根据success的成功与否决定下面的操作

    if (!(res.data.msg === '验证码错误')) {
      return res
    } else {
      Message.error(res.data.msg)
      return Promise.reject(new Error(res.data.msg))
    }
  }
)

export default service
