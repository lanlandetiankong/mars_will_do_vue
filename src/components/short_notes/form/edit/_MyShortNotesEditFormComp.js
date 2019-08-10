//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const MyShortNotesEditFormCmopApi = {
    //取得用户的便签
    doGetMyShortNotesById(item) {
        const param = {
            id:item.id
        } ;
        return axios.post('/short_notes/my/get/by_id',qs.stringify(param)).then(res => res) ;
    },
    //更新用户的便签
    doUpdateMyShortNote(form) {
        const param = {
            id:form.id,
            content:form.content
        };
        return axios.post('/short_notes/my/update/short_notes',qs.stringify(param)).then(res => res) ;
    }

}
