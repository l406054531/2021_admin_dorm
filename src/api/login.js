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
// export function addUser(user_name, admin_name, admin_password) {
//     return request({
//         url: 'Admin/add',
//         method: 'POST',
//         data: {
//             user_name,
//             admin_name,
//             admin_password
//         }
//     })
// }
export function addUser(data) {
    return request({
        url: 'Admin/add',
        method: 'POST',
        data
    })
}