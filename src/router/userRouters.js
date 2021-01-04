export const userRouters = [{
    path: '/admin',
    redirect: '/admin/index',
    // component: Layout,
    children: [{
        path: 'index',
        name: 'admin',
        meta: { title: '管理员', roles: ['admin', 'aa'] },
        component: () =>
            import ('@/views/admin/admin')
    }]
}]