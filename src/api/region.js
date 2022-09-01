import request from '@/utils/request'

/**
 * 区域名称
 *  **/
export function regionNameList(params) {
    return request({
        url: '/api/vm-service/region/search',
        params
    })
}