//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const TaskCreateFormCompApi = {
    //取得用户的活动项目
    doGetActivityProject() {
        const param = {};
        return axios.post('/project/activity/get/activity_project', qs.stringify(param)).then(res => res);
    },
    //新增 用户的活动项目
    doAddActivityProjectByFormModel(formModel) {
        const param = {
            name: formModel.name,
            description:formModel.description,
            progressRate:formModel.progressRate,
            progressIsException:formModel.progressIsException,
            progressExceptionNote:formModel.progressExceptionNote,
            hurryLevel: formModel.hurryLevel,
            activityProjectId: formModel.activityProjectId,
            taskLevel: formModel.taskLevel,
            planStartDate:formModel.planDate[0],
            planEndDate:formModel.planDate[1],
            presenter: formModel.presenter,
            participant: formModel.participant,
            firstNote: formModel.firstNote,
            secondNote: formModel.secondNote,
            thirdNote: formModel.thirdNote
        };
        return axios.post('/task/add/task', qs.stringify(param)).then(res => res);
    },
    //新增 用户的活动项目
    doEditActivityProjectByFormModel(formModel) {
        const param = {
            id:formModel.id,
            name: formModel.name,
            description:formModel.description,
            progressRate:formModel.progressRate,
            progressIsException:formModel.progressIsException,
            progressExceptionNote:formModel.progressExceptionNote,
            hurryLevel: formModel.hurryLevel,
            activityProjectId: formModel.activityProjectId,
            taskLevel: formModel.taskLevel,
            planStartDate:formModel.planDate[0],
            planEndDate:formModel.planDate[1],
            presenter: formModel.presenter,
            participant: formModel.participant,
            firstNote: formModel.firstNote,
            secondNote: formModel.secondNote,
            thirdNote: formModel.thirdNote
        };
        return axios.post('/task/update/task', qs.stringify(param)).then(res => res);
    },
}
