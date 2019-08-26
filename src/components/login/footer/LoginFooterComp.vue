<template>
    <div>
        <div>
            <el-row type="flex" justify="center" >
                <el-button round
                    type="primary"
                    icon="mars-icons mars-icon-Flag"
                    @click="handleRegisterUserAccount"
                >
                    注册
                </el-button>
                <el-button round
                           type="primary"
                           icon="mars-icons mars-icon-Pencil"
                           @click="handleForgetPassword"
                >
                    忘记密码
                </el-button>
            </el-row>
            <br/>
            <el-col :span=23>
                <el-progress :text-inside="true" :stroke-width="24"
                             :percentage="progressConfigModel.percentage"
                             :status="progressConfigModel.status">
                </el-progress>
            </el-col>
            <el-col :span=1>
                <svg class="mars-icons" aria-hidden="true">
                    <use xlink:href="#mars-icon-huoxing"></use>
                </svg>
            </el-col>
        </div>
    </div>
</template>
<script>
    //js
    import {LoginFooterCompApi} from './_LoginFooterCompApi.js'


    export default {
        name: "LoginFooterComp",
        props: {

        },
        data() {
            return {
                progressConfigModel:{
                    percentage:0,
                    status:null
                }
            }
        },
        methods: {
            handleRegisterUserAccount(e) {
                this.$router.push("/register");
            },
            handleForgetPassword(e) {
                alert("跳转到忘记密码");
                this.$router.push("/user/center/password/forget");
            },
            handleProgressLiveChange(e){
                //下方进度条控制
                var _this = this ;
                if(parseInt(_this.progressConfigModel.percentage) >= 100) {
                    //关闭定时器
                    clearInterval(this.progressTimer);
                }
                var randomNum = parseInt(Math.round(Math.random()*10)) ;
                if(_this.progressConfigModel.percentage + randomNum >= 100) {
                    _this.progressConfigModel.percentage = 100 ;
                }   else {
                    _this.progressConfigModel.percentage += randomNum ;
                }
                var newProgressPercentage = _this.progressConfigModel.percentage ;
                if(80 < newProgressPercentage) {
                    _this.progressConfigModel.status =  null ;
                }   else if(60 < newProgressPercentage &&  newProgressPercentage < 80){
                    _this.progressConfigModel.status =  "success" ;
                }   else {
                    _this.progressConfigModel.status =  "warning" ;
                }
            }
        },
        mounted() {
            this.progressTimer = setInterval(this.handleProgressLiveChange, 500);
        }
    }
</script>
<style scoped lang="stylus">
    @import '_LoginFooterComp.styl'
</style>
