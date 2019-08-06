<template>
    <div :style="tagListCompRootStyle" class="tagListCompRootCls">
        <el-row :gutter="20">
            <el-col :span="tagListCardColSize">
                <el-card shadow="hover" class="tagListCardCls" >
                    <div slot="header" >
                        <div style="display: inline-block;"
                             @click="handleTagCardHeadClick"
                        >
                            <i class="mars-icons mars-icon-bookmark" ></i>
                            <span>我的标签1</span>
                        </div>
                        <el-button type="primary" round size="small"
                                   class="tagListCardHeaderCls"
                                   style="margin-top: -5px"
                                   @click="handleTagCardDelete"
                        >
                            删除
                        </el-button>
                    </div>
                    <div @click="handleTagCardContentClick">
                        <span class="tagListCardContentCls">任务数量(0)</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="tagListCardColSize">
                <el-card shadow="hover" class="tagListCardCls" >
                    <div slot="header" >
                        <div style="display: inline-block;"
                             @click="handleTagCardHeadClick"
                        >
                            <i class="mars-icons mars-icon-bookmark" ></i>
                            <span>我的标签1</span>
                        </div>
                        <el-button type="primary" round size="small"
                                   class="tagListCardHeaderCls"
                                   style="margin-top: -5px"
                                   @click="handleTagCardDelete"
                        >
                            删除
                        </el-button>
                    </div>
                    <div @click="handleTagCardContentClick">
                        <span class="tagListCardContentCls">任务数量(0)</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="tagListCardColSize">
                <el-card shadow="hover" class="tagListCardCls" >
                    <div slot="header" >
                        <div style="display: inline-block;"
                             @click="handleTagCardHeadClick"
                        >
                            <i class="mars-icons mars-icon-bookmark" ></i>
                            <span>我的标签1</span>
                        </div>
                        <el-button type="primary" round size="small"
                                   class="tagListCardHeaderCls"
                                   style="margin-top: -5px"
                                   @click="handleTagCardDelete"
                        >
                            删除
                        </el-button>
                    </div>
                    <div @click="handleTagCardContentClick">
                        <span class="tagListCardContentCls">任务数量(0)</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="tagListCardColSize">
                <el-card shadow="hover" class="tagListCardCls" >
                    <div slot="header" >
                        <div style="display: inline-block;"
                             @click="handleTagCardHeadClick"
                        >
                            <i class="mars-icons mars-icon-bookmark" ></i>
                            <span>我的标签1</span>
                        </div>
                        <el-button type="primary" round size="small"
                                   class="tagListCardHeaderCls"
                                   style="margin-top: -5px"
                                   @click="handleTagCardDelete"
                        >
                            删除
                        </el-button>
                    </div>
                    <div @click="handleTagCardContentClick">
                        <span class="tagListCardContentCls">任务数量(0)</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="tagListCardColSize">
                <el-card shadow="hover" class="tagListCardCls" >
                    <div slot="header" >
                        <div style="display: inline-block;"
                             @click="handleTagCardHeadClick"
                        >
                            <i class="mars-icons mars-icon-bookmark" ></i>
                            <span>我的标签1</span>
                        </div>
                        <el-button type="primary" round size="small"
                                   class="tagListCardHeaderCls"
                                   style="margin-top: -5px"
                                   @click="handleTagCardDelete"
                        >
                            删除
                        </el-button>
                    </div>
                    <div @click="handleTagCardContentClick">
                        <span class="tagListCardContentCls">任务数量(0)</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="tagListCardColSize">
                <el-card shadow="hover" class="tagListCardCls" >
                    <div slot="header" >
                        <div style="display: inline-block;"
                             @click="handleTagCardHeadClick"
                        >
                            <i class="mars-icons mars-icon-bookmark" ></i>
                            <span>我的标签1</span>
                        </div>
                        <el-button type="primary" round size="small"
                                   class="tagListCardHeaderCls"
                                   style="margin-top: -5px"
                                   @click="handleTagCardDelete"
                        >
                            删除
                        </el-button>
                    </div>
                    <div @click="handleTagCardContentClick">
                        <span class="tagListCardContentCls">任务数量(0)</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: "TagListComp",
        props: {
            isBaseTagItemTaskListCompShow:Boolean
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
            handleTagCardDelete(event) {
                //删除card事件处理
                console.log(event) ;
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
                //父组件更新
                console.log("changle ") ;
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
