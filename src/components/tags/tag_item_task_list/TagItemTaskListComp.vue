<template>
    <div class="tagListCompRootCls" :style="tagListCompRootStyle">
        <el-container>
            <el-header>
                <el-tag hit="true" size="medium">标签"xxx"的任务</el-tag>
            </el-header>
            <el-main>
                <el-timeline>
                    <el-timeline-item
                        v-for="(activity, index) in activities"
                        :key="index"
                        :icon="activity.icon"
                        :type="activity.type"
                        :color="activity.color"
                        :size="activity.size"
                        :timestamp="activity.timestamp">
                        <div >{{activity.content}}</div>
                    </el-timeline-item>
                </el-timeline>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    export default {
        name: "TagListComp",
        data() {
            return {
                tagListCompRootStyle:{
                    width:"75%"
                },
                activities: [{
                    content: '支持使用图标',
                    timestamp: '2018-04-12 20:46',
                    size: 'large',
                    type: 'primary',
                    icon: 'el-icon-more'
                }, {
                    content: '支持自定义颜色',
                    timestamp: '2018-04-03 20:46',
                    color: '#0bbd87'
                }, {
                    content: '支持自定义尺寸',
                    timestamp: '2018-04-03 20:46',
                    size: 'large',
                    type: 'primary',
                    icon:'mars-icons mars-icon-bookmark'
                }, {
                    content: '默认样式的节点',
                    timestamp: '2018-04-03 20:46'
                }]
            }
        },
        methods:{

        }
    }
</script>
<style scoped lang="stylus">
    @import './_TagItemTaskList.styl'
</style>
