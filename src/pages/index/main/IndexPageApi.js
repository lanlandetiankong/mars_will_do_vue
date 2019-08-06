//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'
//声明基础访问地址
//axios.defaults.baseURL = 'http://localhost:8080'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */


export const IndexPageApi = {
    /*[博文] 取得当前用户的所有博客 */
    doGetAllBlogOfUser : (userInfo,searchVal) => {
        const param = {
            userId:userInfo.fid ,
            token:userInfo.token,
            searchVal:searchVal
        }
        return axios.post('/article/get_article_byid',qs.stringify(param)).then(res => res.data) ;
    },
    /*[博文明细] 根据用户id跟博客id取得对应的博客内容*/
    doGetBlogDetailById : (userId,articleId,token) => {
        const param = {
            userId:userId,
            articleId:articleId,
            token:token
        }
        return axios.post('/article_detail/get_article_detail_byid',qs.stringify(param)).then(res => res.data) ;
    },
    /*[博文明细] 修改内容*/
    doUpdateArticleContentById : (userInfo,articleObj,newContent) => {
        const param = {
            userId:userInfo.fid,
            token:userInfo.token,
            articleDetailId:articleObj.fid,
            articleId:articleObj.farticleid,
            newContent:newContent
        }
        return axios.post('/article_detail/update_article_detail_content_byid',qs.stringify(param)).then(res => res.data) ;
    },
    /*[博文明细]删除博文*/
    doDeleteArticleById : (userInfo,articleObj) => {
        const param = {
            userId:userInfo.fid,
            token:userInfo.token,
            articleDetailId:articleObj.fid,
            articleId:articleObj.farticleid,
        }
        return axios.post('/article_detail/delete_article_detail_byid',qs.stringify(param)).then(res => res.data) ;
    },
    /*[博文]新建*/
    doCreateNewArticle : (axiosCreateParams,tempUserInfo) => {
        const param = {
            articleTitle:axiosCreateParams.fTitle,
            articleText:axiosCreateParams.articleText,
            userId:tempUserInfo.fid,
            userCode:tempUserInfo.fusercode,
            userName:tempUserInfo.fusername,
            token:tempUserInfo.token
        }
        return axios.post('/article/create_article',qs.stringify(param)).then(res => res.data) ;
    },
}
