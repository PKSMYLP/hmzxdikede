import request from '@/utils/request'
// 验证码
export const verificationCodeApi = (clientToken) =>
  request({
    url: `/api/user-service/user/imageCode/${clientToken}`,
    responseType: 'blob'

  })
// 登录
export const loginApi = (data) =>
  request({
    url: '/api/user-service/user/login',
    method: 'post',
    data
  })

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
