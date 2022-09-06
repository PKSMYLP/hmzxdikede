import request from '@/utils/request'

export function getSearchList(params) {
  return request({
    url: '/api/vm-service/policy/search',
    params
  })
}

// 新增策略
export function addPolicyApi(data) {
  return request({
    url: '/api/vm-service/policy',
    method: 'POST',
    data
  })
}

// 详情
export function getPolicy(policyId, pageIndex, pageSize) {
  return request({
    url: `/api/vm-service/policy/vmList/${policyId}`,
    params: {
      pageIndex: pageIndex,
      pageSize: pageSize
    }
  })
}

// 修改策略
export function changePolicy(data) {
  return request({
    url: `/api/vm-service/policy/${data.policyId}`,
    method: 'PUT',
    data
  })
}

// 删除策略

export function deletePolicy(data) {
  return request({
    url: `/api/vm-service/policy/${data.policyId}`,
    method: 'DELETE',
    data
  })
}
