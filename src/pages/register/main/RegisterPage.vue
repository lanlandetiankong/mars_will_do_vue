<template>
    <div class="register-page-root">
        <div class="register-page">
            <base-register-comp
                ref="baseRegisterCompRef"
                @register-submit="handleUserAccountRegister($event,arguments)"
                @register-send-email-action="handleRegisterSendEmail($event,arguments)"
            >
            </base-register-comp>
        </div>
    </div>
</template>
<script>
    import BaseRegisterComp from '~Components/register/main/BaseRegisterComp'
    //js
    import {RegisterPageApi} from './_RegisterPage' ;
    export default {
        name: "RegisterPage",
        components:{
            BaseRegisterComp
        },
        data() {
          return {
              //自定义常量，别改
              constantKey:{
                  registerCompRefName:'baseRegisterCompRef',
                  registerCompFormRefName:'registerFormRef',
                  token:{
                      userToken:'userToken',
                      userInfo:'userInfo'
                  }

              }
          }
        },
        methods:{
            handleUserAccountRegister(e,args) {
                var _this = this ;
                if(args) {
                    var formModel = args[0];
                    RegisterPageApi.doUserAccountRegister(formModel).then(res => {
                        if(res.hasWarning){
                            _this.$commonEleNotice.notification.handleShowWarningNotify(res.info) ;
                        }
                        if(res.actionFlag == false){
                            //注册失败：清空输入框
                            _this.compBaseRegisterCompFormRef.resetFields();
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
            },
            handleRegisterSendEmail(e,args){
                var _this = this ;
                var registerModel = args[0] ;
                RegisterPageApi.doUserAccountRegisterCheckEmail(registerModel).then(res => {
                    if(res.actionFlag == true){
                        _this.$commonEleNotice.notification.handleShowSuccessNotify(res.info);
                    }   else {
                        _this.$commonEleNotice.notification.handleShowErrorNotify(res.info);
                    }
                })
            }
        },
        computed:{
            compBaseRegisterCompFormRef() {
                //返回登录组件form的ref指向
                var _this = this ;
                //当前 register_comp 的ref
                var baseRegisterCompRef = _this.$refs[_this.constantKey.registerCompRefName];
                //登录表单的ref
                return baseRegisterCompRef.$refs[_this.constantKey.registerCompFormRefName];
            }
        },
        mounted() {
        }
    }
</script>
<style scoped lang="stylus">
    @import '_RegisterPage.styl'
</style>
