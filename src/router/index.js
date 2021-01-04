import Vue from 'vue'
import VueRouter from 'vue-router'

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch((err) => err)
// }

Vue.use(VueRouter)

export const constantRoutes = [{
        path: '/login',
        name: 'login',
        hidden: true,
        meta: {
            title: '登录页面'
        },
        component: () =>
            import ('../views/login/userLogin.vue')
    },
    {
        path: '/404',
        name: '404',
        // hidden: true,
        meta: {
            title: '测试',
            role: ['admin']
        },
        component: () =>
            import ('../views/404.vue')
    }

]

const createRouter = () => new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router