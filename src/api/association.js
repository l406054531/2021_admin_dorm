import request from '@/utils/request'
export function getPages(data) {
    return request({
        url: 'Association/getList',
        method: "GET",
        params: data
    })
}

// export function getAllPages() {
//     return request({
//         url: 'Pages/getList',
//         method: "GET",
//         params: { nopage: 1 }
//     })
// }

export function addUserAssociation(data) {
    return request({
        url: 'Association/add',
        method: "POST",
        data
    })
}

export function delUserAssociation(id) {
    return request({
        url: 'Association/del',
        method: "POST",
        data: {
            id,
            nopage: 1
        }
    })
}