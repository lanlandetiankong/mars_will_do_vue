import axios from 'axios'
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
    function(config) {
        var cfgUserToken = window.sessionStorage.getItem("userToken") ;
        // 请求头添加token
        if (cfgUserToken) {
            config.headers['token'] = JSON.parse(cfgUserToken).id;
        }   else {
            console.log("user is loginout") ;
        }
        return config
    },
    function(error) {
        return Promise.reject(error)
    }
)

// 响应拦截器即异常处理
instance.interceptors.response.use(
    response => {
        return response.data
    },
    err => {
        if (err && err.response) {
        } else {
            err.message = '连接服务器失败'
        }
        // Message.error({
        //     message: err.message
        // })
        return Promise.reject(err.response)
    }
)

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
