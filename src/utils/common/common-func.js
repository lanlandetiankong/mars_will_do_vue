var sessionStorageKey = {
    userToken : "userToken",
    userInfo: "userInfo"
}



function checkIsUserTokenExist()  {
    var _this = this ;
    let sessionUserToken = sessionStorage.getItem(sessionStorageKey.userToken) ;
    if(sessionUserToken) {
        console.log(sessionUserToken) ;
        return true ;
    }
    return false ;
}

export const commonFunc =  {
    checkIsUserTokenExist
}
