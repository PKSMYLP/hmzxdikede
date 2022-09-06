import request from '@/utils/request'

// 搜索
export function orderSearch(params) {
  return request({
    url: '/api/order-service/order/search',
    params
  })
}
