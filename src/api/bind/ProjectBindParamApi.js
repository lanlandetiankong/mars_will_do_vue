//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const ProjectBindParamApi = {
    doGetProjectHurryLevelBindParam() {
        return axios.post('/bind_param/project_hurry_level').then(res => res) ;
    },
}
