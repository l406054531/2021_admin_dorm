import layout from "@/layout"
export const userRouters = [{
        path: '/admin',
        meta: { title: '管理', roles: ['admin'] },
        redirect: '/admin/index',
        component: layout,
        children: [{
                path: 'index',
                meta: { title: '管理' },
                component: () =>
                    import ('@/views/admin/admin'),
            },
            {
                path: 'test',
                meta: { title: '测试' },
                component: () =>
                    import ('@/views/test/test'),
            },
        ]
    },
    {
        path: '/test2',
        meta: { title: '测试2', roles: ['admin', 'test'] },
        redirect: '/test2/index',
        component: layout,
        children: [{
                path: 'index',
                meta: { title: '测试2' },
                component: () =>
                    import ('@/views/test2/test2'),
            },

        ]
    },
]