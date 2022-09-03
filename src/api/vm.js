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
