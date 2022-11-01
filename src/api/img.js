import request from '@/utils/request'

//获取图片验证码
export function imageCode(clientToken) {
    return request({
      url: `/user-service/user/imageCode/${clientToken}`,
      method: 'get',
    })
  } 
  