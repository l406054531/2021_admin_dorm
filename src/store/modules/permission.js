import { constantRoutes } from '@/router'
import { userRouters } from '@/router/userRouters';
import { homeRouter } from '@/router/homeRouter';

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//     if (route.meta && route.meta.roles) {
//         // debugger
//         if (roles instanceof Array) {
//             return true
//         } else {
//             let arr = roles.split()
//             roles = arr
//         }
//         return roles.some(role => route.meta.roles.includes(role))
//     } else {
//         return true
//     }
// }
function hasPermission(route, asyncRoutes) {
    // debugger
    // if (asyncRoutes == null) {
    //     return false
    // }
    const hasRoute = asyncRoutes.some(i => {
        if (i.page_name === route.name) {
            return true
        }
    })
    return hasRoute
}


/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */


// export function filterAsyncRoutes(routes, roles) {
//     const res = []
//         // debugger
//     routes.forEach(route => {
//         const tmp = {...route }
//         if (hasPermission(roles, tmp)) {
//             if (tmp.children) {
//                 tmp.children = filterAsyncRoutes(tmp.children, roles)
//             }
//             res.push(tmp)
//         }
//     })

//     return res
// }
export function filterAsyncRoutes(routes, asyncRoutes) {
    const res = []
    routes.forEach(route => {
        const tmp = {...route }
        if (hasPermission(tmp, asyncRoutes)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, asyncRoutes)
            }
            res.push(tmp)
        }
    })
    return res
}


// export function recursionRouter(userRouter, allRouter) {
//     var realRoutes = []
//     let arr = []
//     allRouter.forEach((v) => {
//             userRouter.forEach((item) => {
//                 if (v.name == item.page_name) {
//                     arr.push(v)
//                 }
//                 arr.forEach(parent => {
//                     parent.children.forEach(children => {
//                         if (children.name == item.page_name) {
//                             parent.children = []
//                             parent.children.push(children)
//                             realRoutes.push(parent)
//                         }
//                     })
//                 })
//             })
//         })
//         //   console.log(realRoutes);
//     return realRoutes
// }

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
    generateRoutes({ commit }, asyncRoutes) {
        return new Promise(resolve => {
            let pageRoutes = [].concat(homeRouter, userRouters)
                // console.log(pageRoutes);
            let accessedRoutes = filterAsyncRoutes(pageRoutes, asyncRoutes)
                // let accessedRoutes = recursionRouter(pageRoutes, roles)
                // console.log(accessedRoutes);
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