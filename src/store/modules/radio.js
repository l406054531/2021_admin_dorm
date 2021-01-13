import { login } from '@/api/login';
import { Message } from 'element-ui'
import { Encrypt } from '@/utils/Crypto';
import { setRadio, getRadio } from '@/utils/cache';
const state = {
    radio: getRadio()
}
const mutations = {
    RADIO(state, radio) {
        state.radio = radio
    },
}
const actions = {
    setRadio({ commit, state }, radio) {
        return new Promise((resolve, reject) => {
            // debugger
            commit('RADIO', radio)
            setRadio(radio)
                // console.log(state.radio);
        })
    },
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}