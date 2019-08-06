//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const ProjectsActivityListCmopApi = {
    doGetActivityProject(searchParam) {
        const param = {
            searchVal:searchParam.value
        } ;
        return axios.post('/project/activity/get_activity_project',qs.stringify(param)).then(res => res) ;
    },
    doDeleteArticleById(projectId) {
        const param = {
            projectId:projectId
        } ;
        return axios.post('/project/activity/delete/activity_project/by_id',qs.stringify(param)).then(res => res) ;
    },
}
