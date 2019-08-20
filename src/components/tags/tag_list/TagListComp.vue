<template>
    <div :style="tagListCompRootStyle" class="tagListCompRootCls">
        <el-row :gutter="20">
            <el-col
                :span="tagListCardColSize"
                v-for="item of tagsList"
                :key="item.id"
            >
                <el-card shadow="hover" class="tagListCardCls">
                    <div slot="header" >
                        <div style="display: inline-block;"
                             @click="handleTagCardHeadClick"
                        >
                            <i class="mars-icons mars-icon-bookmark" ></i>
                            <span>{{item.name}}</span>
                        </div>
                        <el-button type="primary" round size="small"
                                   class="tagListCardHeaderCls"
                                   style="margin-top: -5px"
                                   @click="handleTagDelete($event,item.id)"
                        >
                            删除
                        </el-button>
                    </div>
                    <div @click="handleTagCardContentClick">
                        <el-tag type="primary">
                            任务数量(0)
                        </el-tag>
                        <el-tag type="danger">
                            任务级别：{{item.hurryLevelShow}}
                        </el-tag>
                    </div>
                    <br>
                    <div>
                        <el-collapse accordion>
                            <el-collapse-item title="便签1">
                                {{item.firstNote}}
                            </el-collapse-item>
                            <el-collapse-item title="便签2">
                                {{item.secondNote}}
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {TagListCompApi} from './_TagListComp'
    export default {
        name: "TagListComp",
        props: {
            isBaseTagItemTaskListCompShow:Boolean,
            tagsList:Array
        },
        data() {
            return {
                tagListCardColSize:6,
                tagListCompRootStyle:{
                    width:"100%"
                }
            }
        },
        computed: {

        },
        methods: {
            handleTagCardHeadClick(event){
                //card 头部点击事件
                console.log(event) ;
            },
            handleTagCardContentClick(event){
                //card 内容点击事件
                console.log(event) ;
            },
            handleTagDelete(event,tagId) {
                var _this = this ;
                _this.$commonEleNotice.msgBox.handleShowSimpleWarningConfirm("是否确认删除该标签？").then(()=>{
                    TagListCompApi.doDeleteMyTagById(tagId).then(res => {
                        _this.$commonEleNotice.notification.handleShowSuccessNotify(res.info,3000) ;
                        _this.handleRefreshTagsList() ;
                    })
                }).catch(() => {
                    console.log("用户取消删除标签");
                })
            },
            handleChange(newVal) {
                //open
                if(newVal){
                    this.tagListCardColSize = 24 ;
                    this.tagListCompRootStyle.width = "25%" ;
                }   else {
                    this.tagListCardColSize =6 ;
                    this.tagListCompRootStyle.width = "100%" ;
                }
            },
            handleRefreshTagsList(e) {
                this.$emit('refresh-tags-list',e);
            }
        },
        watch:{
            //不要使用 => 来定义watch 函数，会使得this指向改变
            isBaseTagItemTaskListCompShow:function(newVal, oldVal) {
                var _this = this ;
                _this.handleChange(newVal) ;
            }
        }
    }
</script>
<style scoped lang="stylus">
    @import './_TagListComp.styl'
</style>
