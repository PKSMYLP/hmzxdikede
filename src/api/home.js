import request from '@/utils/request'

// 获取当时工单汇总信息(人员统计头部信息)
export const taskReportInfo = (start, end) => request({
  url: `/api/task-service/task/taskReportInfo/${start}/${end}`
})

// 获取一定时间范围之内的订单总数
export const orderCount = (params) => request({
  url: `/api/order-service/report/orderCount/`,
  params
})

// 获取一定时间范围之内的收入
export const orderAmount = (params) => request({
  url: `/api/order-service/report/orderAmount/`,
  params
})

// 获取销售前几的商品
export const skuTop = (topValue, start, end) => request({
  url: `/api/order-service/report/skuTop/${topValue}/${start}/${end}`
})

// 获取销售额统计
export const amountCollect = (collectType, start, end) => request({
  url: `/api/order-service/report/amountCollect/${collectType}/${start}/${end}`
})

// 根据地区汇总销售额数据(销售量分布)
export const regionCollect = (start, end) => request({
  url: `/api/order-service/report/regionCollect/${start}/${end}`
})

// 获取点位总数
export const nodeCount = () => request({
  url: `/api/vm-service/node/count`
})

// 获取合作商总数
export const partnerCount = () => request({
  url: `/api/user-service/partner/count`
})

// 合作商点位汇总统计
export const nodeCollect = () => request({
  url: `/api/vm-service/node/nodeCollect`
})
