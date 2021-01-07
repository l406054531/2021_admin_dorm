import { constantRoutes } from '@/router'
import { userRouters } from '@/router/userRouters';
import { homeRouter } from '@/router/homeRouter';

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        // debugger
        if (roles instanceof Array) {
            return true
        } else {
            let arr = roles.split()
            roles = arr
        }
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []
        // debugger
    routes.forEach(route => {
        const tmp = {...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
            // console.log(constantRoutes.concat(routes));

    }
}

const actions = {
    generateRoutes({ commit }, roles) {
        return new Promise(resolve => {
            let pageRoutes = [].concat(homeRouter, userRouters)
            let accessedRoutes = filterAsyncRoutes(pageRoutes, roles)
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}