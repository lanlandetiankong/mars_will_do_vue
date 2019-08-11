<template>
    <div class="baseTagsCompRoot">
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
               <tag-list-comp
                   :isBaseTagItemTaskListCompShow="isTagItemTaskListCompShow"
                   :tagsList="tagsList"
                   @refresh-tags-list="handleGetTagsList"
               ></tag-list-comp>
               <tag-item-task-list-comp v-show="isTagItemTaskListCompShow"></tag-item-task-list-comp>
           </el-tab-pane>
       </el-tabs>
        <tags-form-comp
            :tagFormModel="tagsFormModel"
            :isNewForm="isNewForm"
            :isFormDialogVisible="isFormDialogVisible"
            @edit-form-submit="handleEditFormSubmit"
            @edit-form-close="handleEditFormClose"
        >
        </tags-form-comp>
    </div>
</template>
<script>
    import {BaseTagsCompApi} from './_BaseTagsComp'
    //components
    import TagListComp from '../tag_list/TagListComp'
    import TagItemTaskListComp from '../tag_item_task_list/TagItemTaskListComp'
    import TagsFormComp from  '../form/TagsFormComp'
    export default {
        name: "BaseTagsComp",
        data() {
            return {
                tabsActiveTabName:'myDefineTabs',
                isTagItemTaskListCompShow:false,
                searchModel:{
                    name:''
                },
                defaultFormModel:{
                    id:'',
                    name:''
                },
                tagsFormModel:{
                    id:'',
                    name:''
                },
                tagsList:[],
                isNewForm:true,
                isFormDialogVisible:false
            }
        },
        components:{
            TagListComp,
            TagItemTaskListComp,
            TagsFormComp
        },
        methods:{
            handleTagsTabClick(tab,event) {
                //tab 切换事件监听
                //console.log(tab, event);
            },
            handleAddTagsBtnClick(type,e) {
                var _this = this ;
                _this.isNewForm = true ;
                _this.isFormDialogVisible = true ;
                _this.tagsFormModel  = _this.defaultFormModel ;
            },
            handleToggerTagItemTaskListShow(e) {
                //控制是否 [标签对应的任务列表] 的显示
                this.isTagItemTaskListCompShow = !this.isTagItemTaskListCompShow ;
            },
            handleEditFormSubmit(e) {
                this.handleEditFormClose(e);
                this.handleGetTagsList(e) ;
            },
            handleEditFormClose(e){
                this.tagsFormModel = this.defaultFormModel ;
                this.isFormDialogVisible = false ;
            },
            handleGetTagsList() {
                console.log("handleGetTagsList");
                var _this = this ;
                BaseTagsCompApi.doGetAllMyTags(_this.searchModel).then(res => {
                    _this.tagsList = res.resultList ;
                })
            }
        },
        mounted(){
            var _this = this ;
            _this.handleGetTagsList() ;
        }
    }
</script>
<style scoped lang="stylus">
    @import './_BaseTagsComp.styl'
</style>
