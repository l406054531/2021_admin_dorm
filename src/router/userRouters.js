import layout from "@/layout"
export const userRouters = [{
        path: '/admin',
        name: 'admin',
        meta: { title: '管理', roles: ['admin'], icon: 'icon-guanli' },
        redirect: '/admin/index',
        component: layout,
        children: [{
                path: 'index',
                name: 'yonghuguanli',
                meta: { title: '用户管理' },
                component: () =>
                    import ('@/views/admin/admin'),
            },
            {
                path: 'roles',
                name: 'jueseguanli',
                meta: { title: '角色管理' },
                component: () =>
                    import ('@/views/roles/index'),
            },
            {
                path: 'tree',
                name: 'CaiDanShu',
                meta: { title: '菜单树管理' },
                component: () =>
                    import ('@/views/tree/treeIndex'),
            },
            {
                path: 'test',
                name: 'test',
                meta: { title: '测试' },
                component: () =>
                    import ('@/views/test/test'),
            },
        ]
    },
    {
        path: '/test2',
        name: 'test2',
        meta: { title: '测试2', roles: ['admin', 'test'], icon: 'icon-guanli' },
        redirect: '/test2/index',
        component: layout,
        children: [{
                path: 'index',
                name: 'test2',
                meta: { title: '测试2' },
                component: () =>
                    import ('@/views/test2/test2'),
            },
            // {
            //     path: 'test',
            //     name: 'test',
            //     meta: { title: '测试' },
            //     component: () =>
            //         import ('@/views/test/test'),
            // },
        ]
    },
]