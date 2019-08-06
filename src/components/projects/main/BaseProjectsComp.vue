<template>
    <div style="height: 100%">
        <el-tabs v-model="tasksActiveTabName">
            <el-tab-pane label="活动项目" name="activityProject">
                <projects-activity-list-comp ></projects-activity-list-comp>
            </el-tab-pane>
            <el-tab-pane label="归档项目" name="archiveProject">
                <project-archive-list-comp></project-archive-list-comp>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import ProjectArchiveListComp from '../projects_archive_list/ProjectsArchiveListComp'
    import ProjectsActivityListComp from '../projects_activity_list/ProjectsActivityListComp'
    export default {
        name: "BaseProjectsComp",
        components:{
            ProjectArchiveListComp,
            ProjectsActivityListComp
        },
        data() {
            return {
                tasksActiveTabName:'activityProject'
            }
        },
        methods:{

        }
    }
</script>
<style scoped lang="stylus">
    @import './_BaseProjectsComp.styl'
</style>
