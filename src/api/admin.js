import request from '@/utils/request'
export function getAdminList(data) {
    return request({
        url: 'Admin/getList',
        method: "GET",
        params: data
    })
}

/**上传头像 */
export function upImg(data) {
    return request({
        url: 'https://service.yhong.info/extend/upload?appCode=418783FDA9E0090B1C990AE816ACDCE3',
        method: "POST",
        data,
        timeout: 0,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

/** 修改数据库img路径 */
export function imgEdit(data) {
    return request({
        url: 'Admin/edit',
        method: "POST",
        data
    })
}