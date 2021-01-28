import request from '@/utils/request'
/**获取角色列表 */
export function getRolesList(data) {
    return request({
        url: 'Roles/getList',
        method: "GET",
        params: data
    })
}

/**获取角色所授权的页面 */
export function getPages(role) {
    return request({
        url: 'Roles/getList',
        method: "GET",
        params: {
            role
        }
    })
}
/**删除角色 */
export function delRole(id) {
    return request({
        url: 'Roles/del',
        method: "POST",
        data: {
            id
        }
    })
}