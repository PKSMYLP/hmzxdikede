import request from '@/utils/request'

// 商品类型搜索  /api/vm-service/skuClass/search  get
export const getSkuClassSearch = (params) => {
  return request({
    url: `/api/vm-service/skuClass/search`,
    params
  })
}

// 新增商品类型 /api/vm-service/skuClass post
export const addGoodsType = (data) => {
  return request({
    url: `/api/vm-service/skuClass`,
    method: 'post',
    data
  })
}

// 修改商品类型 /api/vm-service/skuClass/:classId  put
export const amendGoodsType = (classId, data) => request({ url: `/api/vm-service/skuClass/${classId}`, method: 'put', data })

// 商品搜索 /api/vm-service/sku/search get
export const getGoodsList = (params) => request({ url: `/api/vm-service/sku/search`, params })

// 新增商品  /api/vm-service/sku post
export const addGoods = (data) => request({ url: `/api/vm-service/sku`, method: 'post', data })

// 修改商品  /api/vm-service/sku/:skuId  put
export const amendGoods = (skuId, data) => request({ url: `/api/vm-service/sku/${skuId}`, method: 'put', data })

// 导入商品 /api/vm-service/sku/upload  post
export const importGoods = (data) => request({ url: `/api/vm-service/sku/upload`, method: 'post', data })
