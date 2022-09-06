import request from '@/utils/request'

// 获取一定时间范围之内的订单总数
export function getorderCount(params) {
  return request({
    url: '/api/order-service/report/orderCount',
    params
  })
}
// 获取一定时间范围之内的收入
export function getorderAmount(params) {
  return request({
    url: '/api/order-service/report/orderAmount',
    params
  })
}
// 获取一定时间范围之内的分成总数
export function gettotalBill(params) {
  return request({
    url: '/api/order-service/report/totalBill',
    params
  })
}

// 获取一定日期范围之内的合作商分成汇总数据
export function getpartnerCollect(params) {
  return request({
    url: '/api/order-service/report/partnerCollect',
    params
  })
}
