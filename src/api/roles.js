import request from '@/utils/request'
export function getRolesList(data) {
    return request({
        url: 'Roles/getList',
        method: "GET",
        params: data
    })
}
export function getPages(role) {
    return request({
        url: 'Roles/getList',
        method: "GET",
        params: {
            role
        }
    })
}