import { login } from '@/api/login';
// import { reject, resolve } from 'core-js/fn/promise';
const state = {
    get role() {
        return sessionStorage.getItem('role')
    },
    set role(value) {
        return sessionStorage.setItem('role', value)
    },
}

const mutations = {
    USER_ROLE(state, role) {
        state.role = role
    }
}

const actions = {
    login({ commit, state }, usetInfo) {
        // debugger
        const { admin_name, admin_password } = usetInfo
        return new Promise((resolve, reject) => {
            login(admin_name, admin_password).then(response => {
                let role = response.data.role_name
                commit('USER_ROLE', role)
                    // console.log(response.data);
                resolve()
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