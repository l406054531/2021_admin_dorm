import request from '@/utils/request'
export function getPages(data) {
    return request({
        url: 'Association/getList',
        method: "GET",
        params: data
    })
}