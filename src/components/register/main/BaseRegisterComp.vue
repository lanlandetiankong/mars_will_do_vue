<template>
    <div>
        <div>
            <el-container>
                <el-main>
                    <el-form ref="registerFormRef" key="registerFormKey" :model="registerModel" :rules="rules"
                             label-width="80px" class="register-box">
                        <div>
                            <svg class="mars-icons" aria-hidden="true">
                                <use xlink:href="#mars-icon-xingqiu"></use>
                            </svg>
                        </div>
                        <el-form-item prop="nickname">
                            <template slot="label">
                                <svg class="mars-icons" aria-hidden="true">
                                    <use xlink:href="#mars-icon-huoxinglieren"></use>
                                </svg>
                            </template>
                            <el-input type="text" clearable
                                      prefix-icon="el-icon-user" placeholder="请输入昵称"
                                      v-model="registerModel.nickname"/>
                        </el-form-item>
                        <el-form-item prop="account">
                            <template slot="label">
                                <svg class="mars-icons" aria-hidden="true">
                                    <use xlink:href="#mars-icon-waixingren"></use>
                                </svg>
                            </template>
                            <el-input type="text"
                                      readonly onfocus="this.removeAttribute('readonly');"
                                      prefix-icon="el-icon-user" placeholder="请输入登录账号"
                                      v-model="registerModel.account"/>
                        </el-form-item>
                        <el-form-item prop="password">
                            <template slot="label">
                                <svg class="mars-icons" aria-hidden="true">
                                    <use xlink:href="#mars-icon-private"></use>
                                </svg>
                            </template>
                            <el-input type="password" clearable
                                      prefix-icon="el-icon-view"
                                      v-model="registerModel.password"
                                      readonly onfocus="this.removeAttribute('readonly');"
                                      show-password
                                      placeholder="请输入密码"/>
                        </el-form-item>
                        <el-form-item prop="sex">
                            <template slot="label">
                                <svg class="mars-icons" aria-hidden="true">
                                    <use xlink:href="#mars-icon-yonghushezhi"></use>
                                </svg>
                            </template>
                            <el-radio-group v-model="registerModel.sex">
                                <el-radio-button label="1">男
                                </el-radio-button>
                                <el-radio-button label="2" >女
                                </el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item prop="email" >
                            <template slot="label">
                                <svg class="mars-icons" aria-hidden="true">
                                    <use xlink:href="#mars-icon-youjian"></use>
                                </svg>
                            </template>
                            <el-input type="text" clearable
                                      prefix-icon="el-icon-view"
                                      v-model="registerModel.email"
                                      readonly onfocus="this.removeAttribute('readonly');"
                                      placeholder="请输入邮箱"/>
                        </el-form-item>
                        <el-form-item prop="telephone">
                            <template slot="label">
                                <svg class="mars-icons" aria-hidden="true">
                                    <use xlink:href="#mars-icon-shouji"></use>
                                </svg>
                            </template>
                            <el-input type="text" clearable
                                      prefix-icon="el-icon-view"
                                      v-model="registerModel.telephone"
                                      readonly onfocus="this.removeAttribute('readonly');"
                                      placeholder="请输入手机号码"/>
                        </el-form-item>
                        <el-form-item prop="validateCode">
                            <template slot="label">
                                <svg class="mars-icons" aria-hidden="true">
                                    <use xlink:href="#mars-icon-yinzhang"></use>
                                </svg>
                            </template>
                            <el-input type="text" clearable
                                      prefix-icon="el-icon-view"
                                      v-model.number="registerModel.validateCode"
                                      readonly onfocus="this.removeAttribute('readonly');"
                                      placeholder="请输入验证码"/>
                        </el-form-item>
                        <el-button round
                            type="success"
                            icon="mars-icons mars-icon-waixingren2"
                            @click="onRegister($event,'registerFormRef')"
                        > Ready 4 Register
                        </el-button>
                        <el-button round
                            type="primary"
                            icon="mars-icons mars-icon-email"
                            @click="handleSendEmailCode"
                        > Send Email AuthCode
                        </el-button>
                    </el-form>
                </el-main>
                <el-footer>
                    <register-footer-comp></register-footer-comp>
                </el-footer>
            </el-container>
        </div>
    </div>
</template>
<script>
    import {BaseRegisterCompApi} from './_BaseRegisterCompApi.js'
    import RegisterFooterComp from '../footer/RegisterFooterComp'
    export default {
        name: "BaseRegisterComp",
        components:{
            RegisterFooterComp
        },
        props: {},
        data() {
            return {
                rules: {
                    nickname: {
                        required: true,
                        message: '昵称不能为空',
                        trigger: 'blur'
                    },
                    account: {
                        required: true,
                        message: '账号不能为空',
                        trigger: 'blur'
                    },
                    password: {
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    },
                    email: [
                        {
                            required: true, type: 'email',message: '邮箱不能为空',trigger: 'blur'
                        },{
                            type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']
                        }
                    ]
                },
                dialogVisible: false,
                registerModel:{
                    nickname: '测试账号',
                    account: 'ceshi10',
                    password: '123456',
                    sex:1,
                    email:'695605813@qq.com',
                    telephone:'',
                    validateCode:''
                },
                register:{
                    validateFlag:false
                },
                proxyInputShow:true
            }
        },
        methods: {
            onRegister(e, formName) {
                var _this = this;
                var tempRegisterModel = _this.registerModel;
                var validateCode = tempRegisterModel.validateCode ;
                validateCode = validateCode.toString() ;
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //console.log(validateCode);
                        console.log(validateCode.length);
                        if(validateCode == '' || validateCode.length != 6) {
                            _this.$commonEleNotice.notification.handleShowWarningNotify("请输入6位纯数字验证码！",3000);
                            return false;
                        }   else if(!_this.$BeeUtil.StringUtils.isNumeric(validateCode)){
                            _this.$commonEleNotice.notification.handleShowWarningNotify("请输入6位纯数字验证码！",3000);
                            return false;
                        }
                        //交给父组件处理
                        this.$emit('register-submit', _this.registerModel);
                    } else {
                        this.dialogVisible = true;
                        return false;
                    }
                })
            },
            handleSendEmailCode(e){
                var _this = this ;
                var validateFlag  = _this.register.validateFlag ;
                _this.$refs['registerFormRef'].validate(function (flag,obj) {
                    _this.handleRegisterFormValidateCallBack(flag,obj)
                });
                if(validateFlag == true){
                    //发送验证码邮件
                    _this.$emit("register-send-email-action",_this.registerModel);
                }
            },
            handleRegisterFormValidateCallBack(flag, obj){
                var _this = this ;
                //表单验证回调
                var validateFlag = _this.register.validateFlag;
                if(flag == false) {
                    _this.$commonEleNotice.notification.handleShowWarningNotify("请先完成注册表单！",3000);
                    validateFlag = false;
                }   else {
                    validateFlag = true;
                }
                _this.register.validateFlag = validateFlag;
            }
        },
        mounted() {
        }
    }
</script>
<style scoped lang="stylus">
    @import '_BaseRegisterComp.styl'
</style>
