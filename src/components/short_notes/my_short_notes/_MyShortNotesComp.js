//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const MyShortNotesCmopApi = {
    //取得用户的便签
    doGetMyShortNotes(searchObj) {
        const param = {
            searchVal:searchObj.value
        } ;
        return axios.post('/short_notes/my/get/all_short_notes',qs.stringify(param)).then(res => res) ;
    },
    //取得用户的便签
    doGetMyShortNotesById(item) {
        const param = {
            id:item.id
        } ;
        return axios.post('/short_notes/my/get/by_id',qs.stringify(param)).then(res => res) ;
    },

    //新增用户的便签
    doAddMyShortNote(form) {
        const param = {
            content:form.content
        } ;
        return axios.post('/short_notes/my/add/short_notes',qs.stringify(param)).then(res => res) ;
    },

    //删除用户便签
    doDeleteMyShortNotes(item) {
        const param = {
            shortNoteId:item.id
        } ;
        return axios.post('/short_notes/my/delete/by_id',qs.stringify(param)).then(res  =>  res) ;
    }
}
