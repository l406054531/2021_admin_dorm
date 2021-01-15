import layout from "@/layout"
export const homeRouter = [{
        path: '/home',
        name: 'home',
        meta: { title: '首页', icon: 'icon-shouye' },
        redirect: '/home/index',
        component: layout,
        children: [{
                path: 'index',
                name: 'home',
                meta: { title: '首页' },
                component: () =>
                    import ('@/views/homepage/index.vue'),
            },

        ]
    },

]