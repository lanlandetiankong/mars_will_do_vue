import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '~Pages/index/main/IndexPage'
import LoginPage from '~Pages/login/main/LoginPage'
import RegisterPage from '~Pages/register/main/RegisterPage'
Vue.use(Router);

/* 初始路由 */
let router =  new Router({
    routes: [
        {
            path: '/',
            name: 'LoginPage',
            component: LoginPage,
        },
        {
            path: '/index',
            name: 'IndexPage',
            component: IndexPage,
            meta:{
                requiresAuth:true
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: RegisterPage
        }
    ]
})
export const DynamicRouters = [
    {
        path:'' ,
        component:IndexPage,
        name:'IndexPage',
        redirect:'home',
        meta:{
            requiresAuth:true,
            name:'首页'
        },
        children: [
            {
                id: 1,
                path: 'home',
                component: IndexPage,
                name: 'home',
                meta: {
                    name: '首页',
                    icon: 'tree'
                }
            }
        ]
    },
]

//---------------------------------------------------------------------------->>>>>>路由拦截











export default  router
