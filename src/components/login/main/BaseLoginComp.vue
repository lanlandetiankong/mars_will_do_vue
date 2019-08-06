<template>
    <div>
        <div>
            <el-form ref="loginForm" :model="formModel" :rules="rules" label-width="80px" class="login-box">
                <h3>欢迎登录 </h3>
                <el-form-item label="账号" prop="username">
                    <el-input type="text"
                              prefix-icon="el-icon-user" placeholder="请输入账号"
                              v-model="formModel.username"/>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        type="password"
                        prefix-icon="el-icon-view"
                          v-model="formModel.password"
                          show-password
                          placeholder="请输入密码"/>
                </el-form-item>
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
                <el-button type="primary" @click="onsubmit($event,'loginForm')">提交</el-button>
            </el-form>
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
                dialogVisible: false
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

            }
        },
        mounted() {
        }
    }
</script>
<style scoped lang="stylus">
    @import './_BaseLoginComp.styl'
</style>
