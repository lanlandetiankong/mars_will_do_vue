// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store/index'
import axios from './config/axios/httpConfig'

//---------------------------------------------------------------------------->>>>>>css
import '~Assets/styles/reset.css'
import '~Assets/styles/border.css'
//iconfont
import '~Assets/iconfont/iconfont.css'

//---------------------------------------------------------------------------->>>>>>js
import {BeeUtil} from '~Assets/js/util/bee/beeUtil.js'
import {commonEleNotice} from '~Assets/js/common/notice/myCommonNotice.js'

//---------------------------------------------------------------------------->>>>>>api
import {axiosPostActiveUserInfo} from '~ApiPath/user/activeUserInfoApi.js'


router.beforeEach((to, from, next) => {
    const tempUserToken = store.state.UserToken ;
    //匹配需要验证用户登录的路径
    if (!tempUserToken) {
        if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {
            next() ;
        } else {
            commonEleNotice.notification.handleShowErrorNotify("会话已失效!请重新登录！",5000);
            next({ path: '/' })
        }
    }   else {
        next() ;
    }
})





Vue.prototype.$axiosPostActiveUserInfo = axiosPostActiveUserInfo

//在Vue原型链注册，取得时：this.$actionname
Vue.prototype.$commonEleNotice = commonEleNotice
Vue.prototype.$BeeUtil = BeeUtil
Vue.prototype.$axiosPostActiveUserInfo = axiosPostActiveUserInfo

Vue.config.productionTip = false ;
Vue.use(elementUI);




new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
