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