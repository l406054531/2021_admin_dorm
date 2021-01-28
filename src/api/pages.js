import request from '@/utils/request'
export function getAllPages() {
    return request({
        url: 'Pages/getList',
        method: "GET",
        params: { nopage: 1 }
    })
}

export function addPages(data) {
    return request({
        url: 'Pages/add',
        method: "POST",
        data
    })
}

export function delPages(id) {
    return request({
        url: 'Pages/del',
        method: "POST",
        data: {
            id
        }
    })
}