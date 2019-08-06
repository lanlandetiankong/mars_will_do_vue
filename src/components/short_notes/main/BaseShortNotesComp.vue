<template>
    <div class="baseShortNotesCompRootCls">
        <el-tabs v-model="tasksActiveTabName">
            <el-tab-pane label="我的便签" name="myShortNotesTabName">
                <my-short-notes-comp></my-short-notes-comp>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    //components
    import MyShortNotesComp from  '../my_short_notes/MyShortNotesComp'
    export default {
        name: "BaseShortNotesComp",
        components:{
            MyShortNotesComp
        },
        data() {
            return {
                tasksActiveTabName:'myShortNotesTabName'
            }
        },
        methods:{

        }
    }
</script>
<style scoped lang="stylus">
    @import './_BaseShortNotesComp.styl'
</style>
