//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const CreateActivityProjectCompApi = {
    doCreateActivityProjectByForm(formModel) {
        const param = {
            name:formModel.name,
            goal:formModel.goal,
            hurryLevel:formModel.hurryLevel,
            description:formModel.description,
            firstNote:formModel.firstNote,
            secondNote:formModel.secondNote,
            remark:formModel.remark,
            startDate:formModel.activityPlanDate[0],
            endDate:formModel.activityPlanDate[1],
            sort:formModel.sort
        } ;
        return axios.post('/project/activity/add/activity_project',qs.stringify(param)).then(res => res) ;
    },
    doUpdateActivityProjectByForm(formModel) {
        const param = {
            id:formModel.id,
            name:formModel.name,
            goal:formModel.goal,
            hurryLevel:formModel.hurryLevel,
            description:formModel.description,
            firstNote:formModel.firstNote,
            secondNote:formModel.secondNote,
            remark:formModel.remark,
            startDate:formModel.activityPlanDate[0],
            endDate:formModel.activityPlanDate[1],
            sort:formModel.sort
        } ;
        return axios.post('/project/activity/update/activity_project',qs.stringify(param)).then(res => res) ;
    },
    doGetProjectHurryLevelBindParam() {
        return axios.post('/bind_param/project_level').then(res => res) ;
    },
    doGetActivityProjectById(id) {
        var param = {
            projectId:id
        }
        return axios.post('/project/activity/get/activity_project/by_id',qs.stringify(param)).then(res => res) ;
    }

}
