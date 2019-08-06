// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store/index'
import axios from './config/axios/httpConfig'
import * as globalFilter from './filters/filters'

//---------------------------------------------------------------------------->>>>>>css
import '~Assets/styles/reset.css'
import '~Assets/styles/border.css'
//iconfont
import '~Assets/iconfont/iconfont.css'

//---------------------------------------------------------------------------->>>>>>js
import {handleShowSimpleNotify} from '~Assets/js/myCommonNotification.js'
import {handleMyAxiosAfter} from '~Assets/js/myAxiosAfterServer.js'
import {handleSimpleConfirm} from '~Assets/js/myCommonMessageBox.js'
import {blogArticleConstant} from '~Assets/js/myComponentConstant.js'
import {formatDateUtil} from '~Assets/js/mydate.js'
import {quillToolbarConfig} from '~Assets/js/myQuillEditorConfig.js'


//---------------------------------------------------------------------------->>>>>>api
import {axiosPostActiveUserInfo} from '~ApiPath/user/activeUserInfoApi.js'

//---------------------------------------------------------------------------->>>>>>utils
import {paramValidateDefine} from '~Utils/validate/params-validate.js'
import {commonFunc} from  '~Utils/common/common-func.js'


Vue.prototype.$http = axios
for (var key in globalFilter) {
    Vue.filter(key, globalFilter[key])
}




router.beforeEach((to, from, next) => {
    const tempUserToken = store.state.UserToken ;
    //匹配需要验证用户登录的路径
    if (!tempUserToken) {
        if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {
            next() ;
        } else {
            handleShowSimpleNotify.handleShowErrorNotify("会话已失效!请重新登录！",5000);
            next({ path: '/' })
        }
    }   else {
        next() ;
    }
})





Vue.prototype.$axiosPostActiveUserInfo = axiosPostActiveUserInfo
Vue.prototype.$paramValidateDefine = paramValidateDefine
Vue.prototype.$commonFunc = commonFunc

//在Vue原型链注册，取得时：this.$actionname
Vue.prototype.$handleShowSimpleNotify = handleShowSimpleNotify
Vue.prototype.$handleMyAxiosAfter = handleMyAxiosAfter
Vue.prototype.$handleSimpleConfirm = handleSimpleConfirm
Vue.prototype.$blogArticleConstant = blogArticleConstant
Vue.prototype.$formatDateUtil = formatDateUtil
Vue.prototype.$quillToolbarConfig = quillToolbarConfig
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
