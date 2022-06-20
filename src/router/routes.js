export default [
    //重定向
    {
        path: '/',
        redirect: '/home'
    },
    //首页
    {
        path: "/home",
        component: () => import("@/pages/Home/Home.vue"),
        meta: {
            show: true,
            title: '首页',
        }
    },
    //搜索页
    {
        name: 'search',
        path: '/search/:keyword?',
        component: () => import("@/pages/Search/Search.vue"),
        meta: {
            show: true,
            title: '搜索',
        },
        // 将params参数和query参数映射成属性传入路由组件
        props: route => ({
            keyword: route.params.keyword,
            k: route.query.k
        })
    },
    //登录页
    {
        path: "/login",
        component: () => import("@/pages/Login/Login.vue"),
        meta: {
            show: false,
            title: '用户登录',
        }
    },
    //注册页
    {
        path: "/register",
        component: () => import("@/pages/Register/Register.vue"),
        meta: {
            show: false,
            title: '用户注册',
        }
    },
    //详情页
    {
        name: 'detail',
        path: '/detail/:skuId',
        component: () => import("@/pages/Detail/Detail.vue"),
        meta: {
            show: true,
            title: '产品详情',
        }
    },
    //加购成功页
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: () => import('@/pages/AddCartSuccess/AddCartSuccess.vue'),
        meta: {
            show: true,
            title: '添加成功',
        },
    },
    //购物车
    {
        path: '/shopcart',
        component: () => import('@/pages/ShopCart/ShopCart.vue'),
        meta: {
            show: true,
            title: '购物车',
        },
    },
    //交易页面
    {
        path: '/trade',
        component: () => import('@/pages/Trade/Trade.vue'),
        meta: {
            show: true,
            title: '确认订单',
        },
        //路由独享守卫,只能从购物车页面来
        beforeEnter: (to, from, next) => {

            if (from.path == '/shopcart') {
                next();
            } else {
                next(false);
            }
        }
    },
    //支付页面
    {
        path: '/pay',
        component: () => import('@/pages/Pay/Pay.vue'),
        meta: {
            show: true,
            title: '等待支付',
        },
        props: route => ({
            orderId: route.query.orderId
        }),
        /* 只能从交易界面, 才能跳转到支付界面 */
        beforeEnter(to, from, next) {
            if (from.path === '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    //支付成功页面
    {
        path: '/paySuccess',
        component: () => import('@/pages/PaySuccess/PaySuccess.vue'),
        meta: {
            show: true,
            title: '支付成功',
        },
    },
    //个人中心页面
    {
        path: '/center',
        component: () => import('@/pages/Center/Center.vue'),
        meta: {
            show: true
        },
        children: [
            //我的订单二级路由
            {
                path: "myorder",
                component: () => import('@/pages/Center/MyOrder/MyOrder.vue'),
                meta: {
                    show: true,
                    title: '我的订单',
                },
            },
            {
                path: 'grouporder',
                component: () => import('@/pages/Center/MyOrder/MyOrder.vue') /* ('@/pages/Center/GroupOrder/GroupOrder.vue') */ ,
                meta: {
                    show: true
                },
            },
            {
                path: '/',
                redirect: '/center/myorder'
            }
        ]
    }

]