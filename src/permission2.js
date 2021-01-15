import router from './router'
import store from './store'
const whiteList = ['/login', '/register']
router.beforeEach(async(to, from, next) => {
    document.title = to.meta.title + "-Lx"
    let roles = store.state.user.role
    if (roles) {
        let hasMenus = await store.dispatch('user/routers', roles)
        if (store.state.permission.routes.length > 0) {
            if (to.path === '/login' || to.path === '/') {
                next({ path: store.state.permission.addRoutes[0].path })
            } else {
                next()
            }
        } else {
            const accessRoutes = await store.dispatch('permission/generateRoutes', hasMenus)
            router.addRoutes(accessRoutes)
            next(to.path)
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')

        }
    }
})