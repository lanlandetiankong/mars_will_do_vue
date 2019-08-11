//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const TagsFormCompApi = {
    doUpdateTagsForm(formModel) {
        var param = {
            id:formModel.id,
            name:formModel.name,
            hurryLevel:formModel.hurryLevel,
            firstNote:formModel.firstNote,
            secondNote:formModel.secondNote
        }
        return axios.post('tags/my/update/by_form',qs.stringify(param)).then(res => res) ;
    },
    doCreateTagsForm(formModel) {
        var param = {
            name:formModel.name,
            hurryLevel:formModel.hurryLevel,
            firstNote:formModel.firstNote,
            secondNote:formModel.secondNote
        }
        return axios.post('tags/my/add/by_form',qs.stringify(param)).then(res => res) ;
    },
    doGetTagsHurryLevelBindParam() {
        return axios.post('/bind_param/tags_hurry_level').then(res => res) ;
    },
}
