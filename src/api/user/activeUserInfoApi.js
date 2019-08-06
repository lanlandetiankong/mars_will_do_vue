//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

export const axiosPostActiveUserInfo = {
    doGetUserInfo : (userinfo) => {
        const params = {
            user_id:userinfo.fid,
            token:userinfo.token
        }
        return axios.post('/userinfo/get_active_userinfo',qs.stringify(params)).then(res => res.data) ;
    }
}
