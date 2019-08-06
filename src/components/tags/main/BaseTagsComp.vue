<template>
    <div style="height: 100%">
        <div>
            <el-button type="primary" size="small"  round
                       icon="mars-icons mars-icon-add"
                       @click="handleAddTagsBtnClick('add',$event)">
                添加标签
            </el-button>
            <el-tooltip content="点击开关切换是否显示任务列表">
                <el-tag>
                    任务列表
                    <el-switch
                        size="medium"
                        v-model="isTagItemTaskListCompShow"
                    >
                    </el-switch>
                </el-tag>
            </el-tooltip>
        </div>
       <el-tabs v-model="tabsActiveTabName" @tab-click="handleTagsTabClick">
           <el-tab-pane label="我的标签" name="myDefineTabs">
               <tag-list-comp :isBaseTagItemTaskListCompShow="isTagItemTaskListCompShow"></tag-list-comp>
               <tag-item-task-list-comp v-show="isTagItemTaskListCompShow"></tag-item-task-list-comp>
           </el-tab-pane>
       </el-tabs>
    </div>
</template>
<script>
    //components
    import TagListComp from '../tag_list/TagListComp'
    import TagItemTaskListComp from '../tag_item_task_list/TagItemTaskListComp'
    export default {
        name: "BaseTagsComp",
        data() {
            return {
                tabsActiveTabName:'myDefineTabs',
                isTagItemTaskListCompShow:false,
            }
        },
        components:{
            TagListComp,
            TagItemTaskListComp
        },
        methods:{
            handleTagsTabClick(tab,event) {
                //tab 切换事件监听
                //console.log(tab, event);
            },
            handleAddTagsBtnClick(type,e) {
                console.log(type);
            },
            handleToggerTagItemTaskListShow() {
                //控制是否 [标签对应的任务列表] 的显示
                this.isTagItemTaskListCompShow = !this.isTagItemTaskListCompShow ;
            }
        }
    }
</script>
<style scoped lang="stylus">
    @import './_BaseTagsComp.styl'
</style>
