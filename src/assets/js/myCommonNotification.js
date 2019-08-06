import {Notification} from 'element-ui';

export const handleShowSimpleNotify = {
    handleShowErrorNotify : (theMessage,limitTime) => {
        limitTime = doNotifyLimitTime(theMessage,limitTime);
        //进行通知
        Notification({
            title:'错误提示：',
            type:'error',
            message:theMessage,
            duration:limitTime,
        })
    },
    handleShowWarningNotify : (theMessage,limitTime) => {
        limitTime = doNotifyLimitTime(theMessage,limitTime);
        //进行通知
        Notification({
            title:'警告：',
            type:'warning',
            message:theMessage,
            duration:limitTime
        })
    },
    handleShowInfoNotify : (theMessage,limitTime) => {
        limitTime = doNotifyLimitTime(theMessage,limitTime);
        //进行通知
        Notification({
            title:'提示消息：',
            type:'info',
            message:theMessage,
            duration:limitTime
        })
    },
    handleShowSuccessNotify : (theMessage,limitTime) => {
        limitTime = doNotifyLimitTime(theMessage,limitTime);
        //进行通知
        Notification({
            title:'操作成功：',
            type:'success',
            message:theMessage,
            duration:limitTime
        })
    }
}


function doNotifyLimitTime(theMessage,limitTime) {
    if(typeof(limitTime) == undefined || limitTime == null) {
        limitTime = 0 ;
    }
    return limitTime ;
}
