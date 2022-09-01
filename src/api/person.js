import request from '@/utils/request'

/***
 * 获取人员信息列表
 */
export function getEmployeeList(params) {
    return request({
        url: '/api/user-service/user/search',
        params
    })
}

/** 
 * 新增员工的接口
 * **/
export function addEmployee(data) {
    return request({
        url: '/api/user-service/user',
        method: 'POST',
        data
    })
}

/**
 * 删除员工的接口
 *  **/
export function removeEmployee(id) {
    return request({
        url: `/api/user-service/user/${id}`,
        method: 'DELETE',
    })
}

/**
 * 获取角色列表
 *  **/
export function getRolesList() {
    return request({
        url: '/api/user-service/role'
    })
}


  // 修改角色
  export function updateRole(data) {
    return request({
      url: `/api/user-service/user/${data.id}`,
      method: 'put',
      data
    })
  }
  
/**
 * 获取用户基本信息
 *  **/
export function userInfo(id) {
    return request({
          url: `/api/user-service/user/${id}`
      })
  }