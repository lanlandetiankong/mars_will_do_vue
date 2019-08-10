//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const ProjectsActivityListCmopApi = {
    //取得用户的活动项目
    doGetActivityProject(searchParam) {
        const param = {
            searchVal:searchParam.projectName
        } ;
        return axios.post('/project/activity/get_activity_project',qs.stringify(param)).then(res => res) ;
    },
    //删除活动项目
    doDeleteActivityById(projectId) {
        const param = {
            projectId:projectId
        } ;
        return axios.post('/project/activity/delete/activity_project/by_id',qs.stringify(param)).then(res => res) ;
    },
    //活动项目归档
    doProjectTranslateToArchiveById(projectId) {
        const param = {
            projectId:projectId
        } ;
        return axios.post('/project/activity/translate/activity_project/to_archive_project/by_id',qs.stringify(param)).then(res => res) ;
    },
}
