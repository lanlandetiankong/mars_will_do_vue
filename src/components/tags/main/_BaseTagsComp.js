//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const BaseTagsCompApi = {
    doGetAllMyTags(searchModel) {
        const param = {
            searchVal:searchModel.name
        }
        return axios.post("/tags/my/get/all_tags",qs.stringify(param)).then(res => res) ;
    }
}
