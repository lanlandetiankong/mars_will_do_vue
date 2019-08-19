<template>
    <div class="taskQuadrantShowCompRootCls">
        <el-timeline>
            <el-timeline-item type="primary" placement="top"
                v-for="item of tableList"
                :key="item.id"
                :timestamp="item.createDateStr"
            >
                <div>
                    <el-card shadow="hover">
                        <template slot="header">
                            <el-row>
                                <el-col :span=23>
                                    <el-tag effect="dark" size="medium" :hit=true
                                            :type="item.vueElType">
                                        <el-icon :class="item.vueElIcon"></el-icon>    {{item.name}}
                                    </el-tag>
                                </el-col>
                                <el-col :span=1>
                                    <el-dropdown @command="handleActionCommandClick($event,item)">
                                        <el-button type="primary" size="small" icon="el-icon-s-tools" circle="" >
                                        </el-button>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item command="edit"><el-icon class="el-icon-edit"></el-icon>编辑</el-dropdown-item>
                                            <el-dropdown-item command="delete"><el-icon class="el-icon-delete"></el-icon>删除</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </el-col>
                            </el-row>
                        </template>
                        <div class="listTagDiv">
                            <el-tag :effect="compConfig.tag.effect">任务描述</el-tag>
                            {{item.description}}
                        </div>
                        <div class="listTagDiv"
                            v-show="item.presenter != ''">
                            <template v-show="item.presenter != ''">
                                <el-tag
                                    :effect="compConfig.tag.effect">
                                    <el-icon class="el-icon-user-solid"></el-icon> 提出者
                                </el-tag>
                                {{item.presenter}}
                            </template>
                        </div>
                        <div class="listTagDiv"
                             v-show="item.participant != '' ">
                            <template v-show="item.participant != ''">
                                <el-tag :effect="compConfig.tag.effect">
                                    <el-icon class="el-icon-user"></el-icon>参与者
                                </el-tag>
                                {{item.participant}}
                            </template>
                        </div>
                        <div class="listTagDiv"
                            v-show="item.firstNote != ''">
                            <el-tag :effect="compConfig.tag.effect">便签1</el-tag>
                            {{item.firstNote}}
                        </div>
                        <div class="listTagDiv"
                            v-show="item.secondNote != ''">
                            <el-tag :effect="compConfig.tag.effect">便签2</el-tag>
                            {{item.secondNote}}
                        </div>
                        <div class="listTagDiv"
                            v-show="item.thirdNote != ''">
                            <el-tag :effect="compConfig.tag.effect">便签3</el-tag>
                            {{item.thirdNote}}
                        </div>
                    </el-card>

                </div>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>
<script>
    import {TasksQuadrantShowCompApi} from './_TasksQuadrantShowComp'
    export default {
        name: "TasksQuadrantShowComp",
        props:{
            tableList:Array
        },
        data() {
            return {
                compConfig:{
                    tag:{
                        effect:'plain'
                    }
                }
            }
        },
        methods: {
            handleActionCommandClick(command,item){
                //操作下拉command跳转方法
                var _this = this ;
                if("edit" == command) {
                    _this.handleEditTaskAction(item);
                }   else if("delete" == command) {
                    _this.handleDeleteTaskAction(item);
                }
            },
            handleEditTaskAction(item) {
                //根据任务id编辑任务
                this.$emit("action-edit",item) ;
            },
            handleDeleteTaskAction(item) {
                //根据任务id删除任务
                var _this = this ;
                _this.$handleSimpleConfirm.handleShowSimpleWarningConfirm("是否确认要删除该任务？").then(() => {
                    TasksQuadrantShowCompApi.doDeleteTaskById(item.id).then(data => {
                        _this.$handleShowSimpleNotify.handleShowSuccessNotify(data.info);
                        _this.doRefreshTaskList();
                    })
                }).catch(() => {
                    console.log("取消删除") ;
                })
            },
            doRefreshTaskList() {
                //重新取得表格数据
                this.$emit("action-refresh");
            }
        },
        mounted(){

        }
    }
</script>
<style scoped lang="stylus">
    @import './_TasksQuadrantShowComp.styl'
</style>
