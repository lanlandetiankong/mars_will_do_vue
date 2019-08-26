<template>
    <div class="forget-password-page-root">
        <div>
            <base-forget-password-comp>
            </base-forget-password-comp>
        </div>
    </div>
</template>
<script>
    import {ForgetPasswordPageApi} from './_ForgetPasswordPage.js'
    import BaseForgetPasswordComp from '~Components/user/center/password/forget/main/BaseForgetPasswordComp'
    export default {
        name: "ForgetPasswordPage",
        components:{
            BaseForgetPasswordComp
        },
        data() {
            return {

            }
        },
        methods:{

        },
        computed:{

        },
        mounted() {
        }
    }
</script>
<style scoped lang="stylus">
    @import '_ForgetPasswordPage.styl'
</style>
