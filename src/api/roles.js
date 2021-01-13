import request from '@/utils/request'
export function getRolesList(data) {
    return request({
        url: 'Roles/getList',
        method: "GET",
        params: data
    })
}