import { login } from '@/api/login';
import { Message } from 'element-ui'
import { Encrypt } from '@/utils/Crypto';
import { getPages } from '@/api/association';
import { setRole, getRole, getUserInfo, setUserInfo, getRouters, setRouters } from '@/utils/cache';
const state = {
    role: getRole(),
    userInfo: getUserInfo(),
    routers: getRouters(), // 用户授权的页面
    // get userInfo() {
    //     return sessionStorage.getItem('userInfo')
    // },
    // set userInfo(value) {
    //     return sessionStorage.setItem('userInfo', value)
    // },
}
const mutations = {
    USER_ROLE(state, role) {
        state.role = role
    },
    USER_INFO(state, info) {
        state.userInfo = info
    },
    USER_ROUTERS(state, routers) {
        state.routers = routers
    }
}
const actions = {
    login({ commit, state }, usetInfo) {
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
                        commit('USER_ROLE', role)
                        setRole(role)
                        let data = JSON.stringify(response.data)
                        commit('USER_INFO', data)
                        setUserInfo(data)
                        resolve(response)
                    }
                }

            }).catch(error => {
                reject(error)
            })
        })
    },
    // routers({ commit, state }, data) {
    //     // debugger
    //     return new Promise((resolve, reject) => {
    //         let router = JSON.stringify(data);
    //         // console.log(router);
    //         // console.log(data);
    //         commit("USER_ROUTERS", data)
    //         setRouters(router)
    //         resolve()
    //     })
    // },
    userRouters({ commit, state }, role) {
        let where = {}
        let data = {}
        where.role_name = role
        data.where = JSON.stringify(where);
        return new Promise((resolve, reject) => {
            getPages(data).then(response => {
                // console.log(response.data);
                let router = JSON.stringify(response.data);
                // // console.log(router);
                commit("USER_ROUTERS", router)
                setRouters(router)
                resolve(response.data)
            })

        })
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}