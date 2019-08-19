//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const TasksQuadrantShowCompApi = {
    doDeleteTaskById(id) {
        const param = {
            taskId:id
        }
        return axios.post("/task/delete/task/by_id",qs.stringify(param)).then(res => res) ;
    }
}
