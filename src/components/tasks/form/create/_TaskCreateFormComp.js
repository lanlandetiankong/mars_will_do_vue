//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const TaskCreateFormCompApi = {
    //取得用户的活动项目
    doGetActivityProject() {
        const param = {
        } ;
        return axios.post('/project/activity/get_activity_project',qs.stringify(param)).then(res => res) ;
    },
    //取得用户的活动项目
    doAddActivityProjectByFormModel(formModel) {
        const param = {

        } ;
        return axios.post('/project/activity/get_activity_project',qs.stringify(param)).then(res => res) ;
    },
}
