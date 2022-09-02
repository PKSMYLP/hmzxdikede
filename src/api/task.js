import request from '@/utils/request'
// 获取工单列表基本信息
export const taskListApi = params => request({
  url: '/api/task-service/task/search',
  params
})

// 新增工单
export const addListItemApi = data => request({
  url: '/api/task-service/task/create',
  method: 'POST',
  data
})

// 根据售货机获取运营人员列表
export const operatorList = (innerCode) => request({
  url: `/api/user-service/user/operatorList/${innerCode}`
})

// 获取售货机货道详情
export const channelListApi = (innerCode) => request({
  url: `/api/vm-service/channel/channelList/${innerCode}`
})

// 补货详情
export const taskDetails = (taskId) => request({
  url: `/api/task-service/taskDetails/${taskId}`
})

// 获取补货预警值
export const supplyAlertValue = () => request({
  url: `/api/task-service/task/supplyAlertValue`
})

// 获取工单详情
export const taskInfo = (taskId) => request({
  url: `/api/task-service/task/taskInfo/${taskId}`
})

// 获取所有工单类型
export const taskType = () => request({
  url: `/api/task-service/taskType/list`
})

// 取消工单
export const cancel = (data) => request({
  url: `/api/task-service/task/cancel/${data.taskId}`,
  method: 'POST',
  data
})

// 工单状态列表
export const allTaskStatus = () => request({
  url: `/api/task-service/task/allTaskStatus`
})

