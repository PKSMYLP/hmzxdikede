import request from '@/utils/request'
// 获取工单列表基本信息
export const taskListApi = params => request({
  url: '/api/task-service/task/search',
  params
})
