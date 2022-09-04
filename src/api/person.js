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
  
/**
 * 人员工作量列表
 *  **/
export function searchUserWork(params) {
    return request({
        url: '/api/user-service/user/searchUserWork',
        params
    })
}

/**
 * 获取用户工作量(工单统计)
 *  **/
export function userWorkTotal(params) {
    return request({
        url: '/api/task-service/task/userWork',
        params
    })
}

/**
 * 获取当时工单汇总信息(人员统计头部信息)
 *  **/
export function todayUserInfo(data) {
    return request({
        url: `/api/task-service/task/taskReportInfo/${data.start}/${data.end}`,
        data
    })
}