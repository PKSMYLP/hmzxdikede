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

export const searchVmPolicy = (innerCode) => {
  return request({
    url: `/api/vm-service/policy/vmPolicy/${innerCode}`,
    method: 'GET'
  })
}

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

export const editVmType = (typeId, data) => {
  return request({
    url: ` /api/vm-service/vmType/${typeId}`,
    method: 'PUT',
    data
  })
}
