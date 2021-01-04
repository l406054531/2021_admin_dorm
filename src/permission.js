import router from './router'
import store from './store'

router.beforeEach(async(to, from, next) => {
    document.title = to.meta.title
    let roles = store.state.user.role
    if (to.path == "/") {
        next({ path: '/login' })
    } else {
        if (roles) {
            const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

            // if (to.path === '/login' || to.path === '/') {
            //     next({ path: accessRoutes[0].redirect || accessRoutes[0].path })
            //         // NProgress.done()
            // }
            // console.log(accessRoutes);
            // router.addRoutes(accessRoutes)
            // console.log(router.options.routes);
            // next()
        }
        //     if (to.meta.role instanceof Array) {
        //         if (to.meta.role.indexOf(role) > -1) {

        //         next()
        //     } else {
        //         next({ path: '/login' })
        //     }
        // } else {
        next()
            // }
    }



})