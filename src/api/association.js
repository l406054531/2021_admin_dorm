import request from '@/utils/request'
export function getPages(role_name) {
    return request({
        url: 'Association/get',
        method: "GET",
        params: {
            role_name
        }
    })
}