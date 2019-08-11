//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const TagListCompApi = {
    doDeleteMyTagById(tagId) {
        var param = {
            tagId:tagId
        }
        return axios.post("tags/my/delete/by_id",qs.stringify(param)).then(res => res) ;
    }
}
