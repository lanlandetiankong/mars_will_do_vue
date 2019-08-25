//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const RegisterPageApi = {
    doUserAccountRegister(formModel) {
        const param = {
            account:formModel.username,
            password:formModel.password
        }
        return axios.post('/user_account/register',qs.stringify(param)).then(res => res) ;
    },
    doUserAccountRegisterCheckEmail(formModel) {
        const param = {
            name:formModel.username,
            sex:formModel.sex,
            account:formModel.account,
            password:formModel.password,
            email:formModel.email,
            telephone:formModel.telephone,
            validateCode:formModel.validateCode
        }
        return axios.post('/user_account/register/email_check',qs.stringify(param)).then(res => res) ;
    }
}
