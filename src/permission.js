import router from './router'
import store from './store'
const whiteList = ['/login']
router.beforeEach(async(to, from, next) => {
    document.title = to.meta.title + "-"
    let roles = store.state.user.role
    if (roles) {
        console.log(store.state.permission.routes);
        if (store.state.permission.routes.length > 0) {
            if (to.path === '/login' || to.path === '/') {
                document.title = store.state.permission.addRoutes[0].meta.title
                next({ path: store.state.permission.addRoutes[0].path })
            } else {
                next()
            }
        } else {
            const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
                // console.log(accessRoutes);
            router.addRoutes(accessRoutes)
            next({ path: store.state.permission.addRoutes[0].path })
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')

        }
    }
})