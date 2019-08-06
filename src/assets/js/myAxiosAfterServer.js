import {Notification} from 'element-ui';
/* 对axios结果的预处理显示，需要传入标准的 result才能正常处理 */
export const handleMyAxiosAfter = (baseResult,isSuccessNotify,limitTime) => {
    var isSuccess = false; 
    if(limitTime == undefined){
        limitTime = 0;
    }   else {
        limitTime = limitTime * 1000 ;
    }
    if(baseResult == undefined) {
        Notification.error({
            title:'错误提示:',
            message:'未传入值给请求结果预处理！',
            duration:0
        })
    }   else {
        if(baseResult.hasError == true) {
            Notification.error({
                title:'错误提示:',
                message:baseResult.info,
                duration:0
            })
        }   else {
            isSuccess = true ;
            if(isSuccessNotify) {
                Notification.success({
                    title:'操作提示:',
                    message:baseResult.info,
                    duration:limitTime
                })
            }
        }
    }
    return isSuccess ;
}