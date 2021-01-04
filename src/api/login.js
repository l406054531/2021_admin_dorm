import request from '@/utils/request.js'
export function login(admin_name, admin_password) {
    return request({
        url: 'Admin/get',
        method: 'POST',
        data: {
            admin_name,
            admin_password
        }
    })
}