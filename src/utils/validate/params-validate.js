export const paramValidateDefine = {
    checkParamIsBlank : (str) => {
        //判断是否为 undefined 或者 Null 或 空字符串
        if(typeof (str) == "undefined" ) {
            return true ;
        }
        if(str == null) {
            return true ;
        }
        if(typeof(str) == "string") {
            //去除所有空格
            str = str.replace(/\s*/g,"");
            if(!str){
                return true ;
            }
        }
        return false ;
    }
}





//去除字符串内所有的空格
// str = str.replace(/\s*/g,"");
//去除字符串内两头的空格
// str = str.replace(/^\s*|\s*$/g,"");
//去除字符串内左侧的空格
//str = str.replace(/^\s*/,"");
//去除字符串内右侧的空
// str = str.replace(/(\s*$)/g,"");
