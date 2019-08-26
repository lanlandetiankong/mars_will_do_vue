<template>
    <div>
        <div>
            <el-container>
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
                        <el-button round
                            type="primary"
                            icon="mars-icons mars-icon-Hold"
                            @click="onsubmit($event,'loginForm')"
                        > 登陆</el-button>
                    </el-form>
                    <el-dialog
                        title="温馨提示"
                        :visible.sync="dialogVisible"
                        width="30%"
                    >
                        <span>请输入账号和密码</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        </span>
                    </el-dialog>
                </el-main>
                <el-footer>
                    <login-footer-comp></login-footer-comp>
                </el-footer>
            </el-container>
        </div>
    </div>
</template>
<script>
    //js
    import {BaseLoginCompApi} from './_BaseLoginCompApi.js'
    import LoginFooterComp from '../footer/LoginFooterComp'

    export default {
        name: "BaseLoginComp",
        components: {LoginFooterComp},
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
            }
        },
        mounted() {
        }
    }
</script>
<style scoped lang="stylus">
    @import './_BaseLoginComp.styl'
</style>
