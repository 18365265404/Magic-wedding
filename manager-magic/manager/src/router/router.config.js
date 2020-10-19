




let routes= [
    {
        path: '/',
        name:"dashboard",
        redirect: '/dashboard'
    },
    {
        path: '/',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: '自述文件' },
        children:[
 
            
            {
                path: '/dashboard',
                name:"dashboard",
                component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                meta: { title: '系统首页' }
            },

            // 目录
            
            {
                path: '/dictionary',
                name: 'dictionary',
                component: resolve => require(['../components/page/Dictionary.vue'], resolve),
                meta: { title: '全部字典' }
            },
            {
                path: '/banner',
                name: 'banner',
                component: resolve => require(['../components/page/Banner.vue'], resolve),
                meta: { title: '全部轮播图' }
            },
            {
                path: '/imageText1',
                name: 'imageText1',
                component: resolve => require(['../components/page/ImageText1.vue'], resolve),
                meta: { title: '首页文图' }
            },
            {
                path: '/imageText2',
                name: 'imageText2',
                component: resolve => require(['../components/page/ImageText2.vue'], resolve),
                meta: { title: '更多文图' }
            },
            {
                path: '/classify',
                name: 'classify',
                component: resolve => require(['../components/page/Classify.vue'], resolve),
                meta: { title: '条件管理' }
            },
            {
                path: '/weddingShop',
                name: 'weddingShop',
                component: resolve => require(['../components/page/WeddingShop.vue'], resolve),
                meta: { title: '全部婚礼婚品' }
            },
            {
                path: '/visual',
                name: 'visual',
                component: resolve => require(['../components/page/Visual.vue'], resolve),
                meta: { title: '全部视觉展示' }
            },
            {
                path: '/scheme',
                name: 'scheme',
                component: resolve => require(['../components/page/Scheme.vue'], resolve),
                meta: { title: '全部策划布置' }
            },
            {
                path: '/flower',
                name: 'flower',
                component: resolve => require(['../components/page/Flower.vue'], resolve),
                meta: { title: '全部婚礼花艺' }
            },
            {
                path: '/design',
                name: 'design',
                component: resolve => require(['../components/page/Design.vue'], resolve),
                meta: { title: '全部婚礼设计' }
            },
            {
                path: '/video',
                name: 'video',
                component: resolve => require(['../components/page/Video.vue'], resolve),
                meta: { title: '全部摄像视频' }
            },



            // 错误页面
            {
                path: '/404',
                name: '404',
                component: resolve => require(['../components/page/404.vue'], resolve),
                meta: { title: '404' }
            },
            {
                path: '/403',
                name: '403',
                component: resolve => require(['../components/page/403.vue'], resolve),
                meta: { title: '403' }
            }
        ]
    },
    {
        path: '/changePass',
        name:"changePass",
        component: resolve => require(['../components/page/ChangePass.vue'], resolve),
        meta: { title: 'denglu' }
    },
    {
        path: '/login',
        name:"login",
        component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
        path: '*',
        name:"404",
        redirect: '/404'
    }
]


// export default routes;
export default {routes}