import request from '@/utils/request'
export function getPages(data) {
    return request({
        url: 'Association/getList',
        method: "GET",
        params: data
    })
}

export function getAllPages() {
    return request({
        url: 'Association/getList',
        method: "GET",
    })
}

export function addUserPages(data) {
    return request({
        url: 'Association/add',
        method: "POST",
        data
    })
}