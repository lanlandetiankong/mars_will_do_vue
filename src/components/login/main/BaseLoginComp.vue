<template>
    <div>
        <div>
            <el-container>
                <el-header>
                    <div>

                    </div>
                </el-header>
                <el-main>
                    <el-form ref="loginForm" :model="formModel" key="loginFormKey" :rules="rules" label-width="80px" class="login-box">
                        <div>
                            <svg class="mars-icons" aria-hidden="true">
                                <use xlink:href="#mars-icon-xingqiu"></use>
                            </svg>
                        </div>
                        <el-form-item  prop="username">
                            <template slot="label" >
                                <svg class="mars-icons" aria-hidden="true">
                                    <use xlink:href="#mars-icon-huoxinglieren"></use>
                                </svg>
                            </template>
                            <el-input type="text"
                                      prefix-icon="el-icon-user" placeholder="请输入账号"
                                      v-model="formModel.username"/>
                        </el-form-item>
                        <el-form-item  prop="password">
                            <template slot="label">
                                <svg class="mars-icons" aria-hidden="true">
                                    <use xlink:href="#mars-icon-waixingren"></use>
                                </svg>
                            </template>
                            <el-input
                                type="password"
                                prefix-icon="el-icon-view"
                                v-model="formModel.password"
                                show-password
                                placeholder="请输入密码"/>
                        </el-form-item>
                        <el-button
                            type="primary"
                            icon="mars-icons mars-icon-Hold"
                            @click="onsubmit($event,'loginForm')"
                        > Travel Mars</el-button>
                        <el-button
                            type="primary"
                            icon="mars-icons mars-icon-Flag"
                            @click="handleRegisterUserAccount"
                        >
                            Register 4 Mars
                        </el-button>
                    </el-form>
                    <el-dialog
                        title="温馨提示"
                        :visible.sync="dialogVisible"
                        width="30%"
                        :before-close="handleClose"
                    >
                        <span>请输入账号和密码</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        </span>
                    </el-dialog>
                </el-main>
                <el-footer>
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
                </el-footer>
            </el-container>
        </div>
    </div>
</template>
<script>
    //js
    import {BaseLoginCompApi} from './_BaseLoginCompApi.js'


    export default {
        name: "BaseLoginComp",
        props: {

        },
        data() {
            return {
                formModel: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: {
                        required: true,
                        message: '账号不能为空',
                        trigger: 'blur'
                    },
                    password: {
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }
                },
                dialogVisible: false,
                progressConfigModel:{
                    percentage:0,
                    status:null
                },
                progressTimer:null,
                register:{
                    showDialog:true,
                    model:{}
                }
            }
        },
        methods: {
            onsubmit(e, formName) {
                var _this = this;
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //交给父组件处理
                        this.$emit('login-submit', _this.formModel);
                    } else {
                        this.dialogVisible = true;
                        return false;
                    }
                })
            },
            handleClose() {

            },
            handleRegisterUserAccount(e) {
                this.$router.push("/register");
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
    @import './_BaseLoginComp.styl'
</style>
