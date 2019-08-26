<template>
    <div>
        <div>
            <el-row type="flex" justify="center" >
                <el-button round
                           type="primary"
                           icon="mars-icons mars-icon-Hold"
                           @click="handleJumpToLogin"
                > Jump 2 Login
                </el-button>
            </el-row>
        </div>
    </div>
</template>
<script>
    import {RegisterFooterCompApi} from './_RegisterFooterCompApi.js'

    export default {
        name: "RegisterComp",
        props: {},
        data() {
            return {

            }
        },
        methods: {
            handleJumpToLogin(e) {
                this.$router.push("/");
            },
        },
        mounted() {

        }
    }
</script>
<style scoped lang="stylus">
    @import '_RegisterFooterComp.styl'
</style>
