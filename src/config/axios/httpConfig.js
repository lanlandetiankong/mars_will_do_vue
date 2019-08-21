import axios from 'axios'
import router from '@/router/index'
import store from '@/store/index.js'
import baseURL from './baseUrl'
import { Message,Loading } from 'element-ui'
import qs from 'qs'
const http = {}
//基础访问url
var instance = axios.create({
    timeout: 50000,
    baseURL,
    withCredentials:true,
    headers:{
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
    },
    validateStatus(status) {
        switch (status) {
        case 400:
            Message.error('请求出错')
            break
        case 401:
            Message.warning({
                message: '授权失败，请重新登录'
            })
            store.commit('LOGIN_OUT')
            setTimeout(() => {
                window.location.reload()
            }, 1000)
            return
        case 403:
            Message.warning({
                message: '拒绝访问'
            })
            break
        case 404:
            Message.warning({
                message: '请求错误,未找到该资源'
            })
            break
        case 500:
            Message.warning({
                message: '服务端错误'
            })
            break
        }
        return status >= 200 && status < 300
    }
})

// 添加请求拦截器
instance.interceptors.request.use(
    config => {
        var cfgUserToken = window.sessionStorage.getItem("userToken") ;
        // 请求头添加token
        if (cfgUserToken) {
            config.headers['token'] = JSON.parse(cfgUserToken).id;
        }   else {
            console.log("user is loginout") ;
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)


// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    router.replace({
                        path: '/login',
                        query: { redirect: router.currentRoute.fullPath }
                    });
                    break;
                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                    Toast({
                        message: '登录过期，请重新登录',
                        duration: 1000,
                        forbidClick: true
                    });
                    // 清除token
                    localStorage.removeItem('token');
                    store.commit('loginSuccess', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;
                // 404请求不存在
                case 404:
                    Toast({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Toast({
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    });
            }
            return Promise.reject(error.response);
        }
    }
);



http.get = function(url, options) {
    let loadingInstance ;
    if (!options || options.isShowLoading !== false) {
        loadingInstance = Loading.service({ fullscreen: true });
    }
    return new Promise((resolve, reject) => {
        instance
            .get(url, options)
            .then(response => {
                if (!options || options.isShowLoading !== false) {
                    loadingInstance.close() ;
                }
                if (response.code === 1) {
                    resolve(response.data)
                } else {
                    Message.error({
                        message: response.msg
                    })
                    reject(response.msg)
                }
            })
            .catch(e => {
                console.log(e)
            },err => {
                Message.error({
                    message: '请求错误或服务器异常!请联系管理员！'
                });
                reject(err)
            })
    })
}

http.post = function(url, data, options) {
    let loadingInstance
    if (!options || options.isShowLoading !== false) {
        loadingInstance = Loading.service({ fullscreen: true });
    }
    return new Promise((resolve, reject) => {
        instance
            .post(url, data, options)
            .then(response => {
                loadingInstance.close() ;
                //对返回结果的预先处理
                if(response) {
                    let tempRespHasError = response.hasError ;
                    //Error:不放行
                    if(typeof(tempRespHasError) != "undefined" && tempRespHasError != null && tempRespHasError === true){
                        let tempRespInfo = response.info ;
                        if(typeof(tempRespInfo) != "undefined" && tempRespInfo != null && tempRespInfo.replace(/(^s*)|(s*$)/g, "").length != 0){
                            Message.error(tempRespInfo) ;
                        }
                    }   else {
                        let respHasWarning = response.hasWarning;
                        if(typeof(respHasWarning) == "undefined" || respHasWarning == null) {
                            respHasWarning = false ;
                        }
                        response.hasWarning = respHasWarning ;
                        //Warning或正常:放行
                        resolve(response);
                    }
                }
            })
            .catch(e => {
                loadingInstance.close() ;
                console.log(e);
            })

    })
}
export default http



