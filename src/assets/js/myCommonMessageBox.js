import {MessageBox} from 'element-ui';

function getShowSimpleConfirm (theTitle,theMessage,theType) {
    //进行通知
    const messageBox = MessageBox.confirm(theMessage,theTitle,{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
    return messageBox ;
}

export const handleSimpleConfirm = {
    handleShowSimpleSuccessConfirm : (theMessage,theTitle) => {
        if(!theTitle){
            theTitle = '操作提示'
        }
        return getShowSimpleConfirm(theTitle,theMessage,"success") ;
    },
    handleShowSimpleInfoConfirm : (heMessage,theTitle) => {
        if(!theTitle){
            theTitle = '操作提示'
        }
        return getShowSimpleConfirm(theTitle,theMessage,"info") ;
    },
    handleShowSimpleWarningConfirm : (theMessage,theTitle) => {
        if(!theTitle){
            theTitle = '操作提示'
        }
        return getShowSimpleConfirm(theTitle,theMessage,"warning") ;
    },
    handleShowSimpleErrorConfirm : (theMessage,theTitle) => {
        if(!theTitle){
            theTitle = '操作提示'
        }
        return getShowSimpleConfirm(theTitle,theMessage,"error") ;
    }
}
