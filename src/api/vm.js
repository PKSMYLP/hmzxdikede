import request from '@/utils/request'

/**
 * 搜索售货机(售货机列表)
 * @param {*} params
 * @returns
 */
export const getVmSearch = (params) => {
  return request({
    url: '/api/vm-service/vm/search',
    method: 'GET',
    params
  })
}

/**
 * 售货机类型列表(搜索)
 * @param {*} params
 * @returns
 */
export const getVmTypeSearch = (params) => {
  return request({
    url: '/api/vm-service/vmType/search',
    params
  })
}

export const getSkuCollect = (innerCode, start, end) => {
  return request({
    url: `/api/order-service/report/skuCollect/${innerCode}/${start}/${end}`
  })
}

/**
 * 新增售货机
 * @param {*} data
 * @returns
 */
export const addVm = (data) => {
  return request({
    url: '/api/vm-service/vm',
    method: ' POST',
    data
  })
}
/**
 * 新增售货机类型
 * @param {*} data
 * @returns
 */
export const addVmType = (data) => {
  return request({
    url: '/api/vm-service/vmType',
    method: 'POST',
    data
  })
}

/**
 * 新增策略/策略列表
 * @param {*} data
 * @returns
 */
export const getPolicy = (data) => {
  return request({
    url: '/api/vm-service/policy',
    data
  })
}

/**
 * 查询售货机策略
 * @param {*} innerCode
 * @returns
 */
export const searchVmPolicy = (innerCode) => {
  return request({
    url: `/api/vm-service/policy/vmPolicy/${innerCode}`,
    method: 'GET'
  })
}

/**
 * 点位搜索
 * @param {*} params
 * @returns
 */
export const getNode = (params) => {
  return request({
    url: '/api/vm-service/node/search'
  })
}

/**
 * 获取售货机货道详情
 * @param {*} innerCode
 * @returns
 */
export const getChannelListC = (innerCode) => {
  return request({
    url: `/api/vm-service/channel/channelList/${innerCode}`
  })
}

/**
 * 售货机类型详情
 * @param {*} typeId
 * @returns
 */
export const getVmTypeDetail = (typeId) => {
  return request({
    url: `/api/vm-service/vmType/${typeId}`
  })
}

/**
 * 售货机类型删除
 * @param {*} typeId
 * @returns
 */
export const deleteVmType = (typeId) => {
  return request({
    url: `/api/vm-service/vmType/${typeId}`,
    method: 'DELETE'
  })
}

/**
 *售货机类型修改
 *
 * @param {*} typeId
 * @param {*} data
 * @returns
 */
export const editVmType = (typeId, data) => {
  return request({
    url: `/api/vm-service/vmType/${typeId}`,
    method: 'PUT',
    data
  })
}

/**
 * 取消策略
 * @param {*} innerCode
 * @param {*} policyId
 * @returns
 */
export const cacancelPolicy = (innerCode, policyId) => {
  return request({
    url: `/api/vm-service/vm/cancelPolicy/${innerCode}/${policyId}`,
    method: 'PUT'
  })
}

/**
 * 修改售货机点位
 * @param {*} id
 * @param {*} nodeId
 * @returns
 */
export const editVmNode = (id, nodeId) => {
  return request({
    url: `/api/vm-service/vm/${id}/${nodeId}`,
    method: 'PUT'
  })
}
