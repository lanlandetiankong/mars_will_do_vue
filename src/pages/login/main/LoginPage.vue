<template>
    <div>
        <div class="login-page">
            <base-login-comp
                ref="baseLoginCompRef"
                @login-submit="handleUserAccountLogin($event,arguments)"
            >

            </base-login-comp>
        </div>
    </div>
</template>
<script>
    import BaseLoginComp from '~Components/login/main/BaseLoginComp'
    //js
    import {LoginPageApi} from './LoginPageApi' ;
    export default {
        name: "LoginPage",
        components:{
            BaseLoginComp
        },
        data() {
          return {
              //自定义常量，别改
              constantKey:{
                  loginCompRefName:'baseLoginCompRef',
                  loginCompFormRefName:'loginForm',
                  token:{
                      userToken:'userToken',
                      userInfo:'userInfo'
                  }

              }
          }
        },
        methods:{
            handleUserAccountLogin(e,args) {
                var _this = this ;
                if(args) {
                    var formModel = args[0];
                    LoginPageApi.doUserAccountLogin(formModel).then(res => {
                        if(res.hasWarning){
                            _this.$handleShowSimpleNotify.handleShowWarningNotify(res.info) ;
                        }
                        if(res.actionFlag == false){
                            //登录失败：清空输入框
                            _this.compBaseLoginCompFormRef.resetFields();
                        }   else {
                            _this.dealUserTokenSet(res.bean) ;
                            if(_this.checkIsUserTokenExist()) {
                                _this.$router.push("/index") ;
                            }
                        }
                    })
                }
                //使用 vue-router 路由到指定页面
                //this.$router.push("/index") ;
            },
            dealUserTokenSet(userToken) {
                this.$store.commit("SET_USER_TOKEN",userToken);
            },
            checkIsUserTokenExist() {
                var _this = this ;
                let sessionUserToken = sessionStorage.getItem(_this.constantKey.token.userToken) ;
                if(sessionUserToken) {
                    console.log(sessionUserToken) ;
                    return true ;
                }   else {
                    console.log(" sessionUserToken null") ;
                }
                return false ;
            }
        },
        computed:{
            compBaseLoginCompFormRef() {
                //返回登录组件form的ref指向
                var _this = this ;
                //当前 login_comp 的ref
                var baseLoginCompRef = _this.$refs[_this.constantKey.loginCompRefName];
                //登录表单的ref
                return baseLoginCompRef.$refs[_this.constantKey.loginCompFormRefName];
            }
        },
        mounted() {

        }
    }
</script>
<style scoped lang="stylus">
    @import './_LoginPage.styl'
</style>
