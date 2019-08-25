//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const LoginPageApi = {
    doUserAccountLogin(formModel) {
        const param = {
            account:formModel.username,
            password:formModel.password
        }
        return axios.post('/user_account/do_login',qs.stringify(param)).then(res => res) ;
    }
}
