//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const ProjectsArchiveListCmopApi = {
    //取得用户的归档项目
    doGetArchiveProject(searchParam) {
        const param = {
            searchVal:searchParam.value
        } ;
        return axios.post('/project/archive/get_archive_project',qs.stringify(param)).then(res => res) ;
    },
    //删除归档项目
    doDeleteArchiveById(projectId) {
        const param = {
            projectId:projectId
        } ;
        return axios.post('/project/archive/delete/archive_project/by_id',qs.stringify(param)).then(res => res) ;
    }
}
