import { login } from '@/api/login';
import { Message } from 'element-ui'
const state = {
    get role() {
        return sessionStorage.getItem('role')
    },
    set role(value) {
        return sessionStorage.setItem('role', value)
    },
    get userInfo() {
        return sessionStorage.getItem('userInfo')
    },
    set userInfo(value) {
        return sessionStorage.setItem('userInfo', value)
    },
}
const mutations = {
    USER_ROLE(state, role) {
        state.role = role
    },
    USER_NAME(state, username) {
        state.username = username
    },
    USER_ID(state, userId) {
        state.userId = userId
    },
    USER_INFO(state, info) {
        state.userInfo = info
    },
}
const actions = {
    login({ commit, state }, usetInfo) {
        // debugger
        const { admin_name, admin_password } = usetInfo
        return new Promise((resolve, reject) => {
            login(admin_name, admin_password).then(response => {
                if (admin_name == '' || admin_password == '') {
                    return Message.warning("请正确输入账号或密码")
                } else {
                    if (response.data == '') {
                        return Message.error("账号或密码有误")
                    } else {
                        let role = response.data.role_name
                        let data = JSON.stringify(response.data)
                        commit('USER_ROLE', role)
                        commit('USER_INFO', data)
                        resolve()
                    }
                }

            }).catch(error => {
                reject(error)
            })
        })
    },
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}