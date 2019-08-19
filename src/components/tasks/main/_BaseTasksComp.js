//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const BaseTaskCompApi = {
    doGetAllMyTasks(searchModel) {
        const param = {
            searchVal:searchModel.content
        }
        return axios.post("/task/get/all/task",qs.stringify(param)).then(res => res) ;
    }
}
