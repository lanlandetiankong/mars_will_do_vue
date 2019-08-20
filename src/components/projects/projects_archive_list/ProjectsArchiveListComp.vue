<template>
    <div class="projectArchiveListCompRootCls">
        <el-container>
            <el-header>
                <el-row type="flex" justify="end">
                    <el-col :span=6 :offset=1>
                        <el-input
                            v-model="mySearch.projectName"
                            style="width: 80%"
                            placeholder="输入要查询的项目名"
                        >
                        </el-input>
                        <el-button round
                                   type="primary"
                                   size="small"
                                   icon="el-icon-search"
                                   @click="handleGetArchiveProjectList"
                        >
                        </el-button>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
            </el-header>
            <el-main>
                <el-row :gutter=1>
                    <el-col :span=8 v-for="item of archiveProjectList" :key="item.id">
                        <div class="projectArchiveListCompContainerCls"
                             @dblclick="handleProjectArchiveItemDblClick($event,item.id)"
                        >
                            <el-container>
                                <el-header height="25px">
                                    <span>{{item.name}}</span>
                                    <el-dropdown style="float: right;margin-top: -8px">
                                        <el-button
                                            icon="mars-icons mars-icon-down"
                                            size="mini"
                                            type="primary"
                                        >
                                        </el-button>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item @click.native="handleArchiveItemDeleteClick($event,item.id)">删除</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </el-header>
                                <el-main class="projectArchiveListCompContainerMainCls">
                                    <el-row>
                                        <el-tag>总任务：99</el-tag>
                                        <el-tag>已完成：100</el-tag>
                                        <el-tag>进度数：100%</el-tag>
                                    </el-row>
                                </el-main>
                            </el-container>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
        <el-dialog
            center
            :modal=true
            :close-on-click-modal=false
            width="60%"
            :title="showArchiveProjectDetailModel.name"
            :visible.sync="detailDialogConfig.isVisibleSync"
        >
            <el-collapse>
                <el-collapse-item>
                    <template slot="title">
                        <el-tag effect="dark">简介</el-tag>
                    </template>
                    {{showArchiveProjectDetailModel.description}}
                </el-collapse-item>
                <el-collapse-item >
                    <template slot="title">
                        <el-tag effect="dark">目标</el-tag>
                    </template>
                    {{showArchiveProjectDetailModel.goal}}
                </el-collapse-item>
                <el-collapse-item  v-if="showArchiveProjectDetailModel.startDateShow && showArchiveProjectDetailModel.endDateShow">
                    <template slot="title">
                        <el-tag effect="dark">日期规划</el-tag>
                    </template>
                    <el-tag  size="medium" effect="dark" type="success"
                             :disable-transitions=true :hit=true
                    >
                        {{showArchiveProjectDetailModel.startDateShow}}
                    </el-tag>
                    ===>
                    <el-tag size="medium" effect="dark"
                            type="success"
                            :disable-transitions=true :hit=true
                    >
                        {{showArchiveProjectDetailModel.endDateShow}}
                    </el-tag>
                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <el-tag effect="dark">便签1</el-tag>
                    </template>
                    {{showArchiveProjectDetailModel.firstNote}}
                </el-collapse-item>
                <el-collapse-item >
                    <template slot="title">
                        <el-tag effect="dark">便签2</el-tag>
                    </template>
                    {{showArchiveProjectDetailModel.secondNote}}
                </el-collapse-item>
            </el-collapse>
        </el-dialog>
    </div>
</template>
<script>
    import {ProjectsArchiveListCmopApi} from './_ProjectsArchiveListComp'
    export default {
        name: "ProjectArchiveListComp",
        data() {
            return {
                mySearch:{
                   projectName:''
                },
                detailDialogConfig:{
                    isVisibleSync:false
                },
                archiveProjectList:[],
                showArchiveProjectDetailModel:{}
            }
        },
        methods:{
            handleGetArchiveProjectList() {
                var _this = this ;
                const searchParam = {
                    value:_this.mySearch.projectName
                };
                ProjectsArchiveListCmopApi.doGetArchiveProject((searchParam)).then(res => {
                    if(res.resultList) {
                        _this.archiveProjectList = res.resultList ;
                    }
                })
            },
            handleProjectArchiveItemDblClick(e,id){
                var _this = this ;
                _this.showArchiveProjectDetailModel = _this.archiveProjectList.filter(val => val.id == id)[0] ;
                if(_this.showArchiveProjectDetailModel.id){
                    if(_this.showArchiveProjectDetailModel.startDate) {
                        //取得显示的开始日期
                        _this.showArchiveProjectDetailModel.startDateShow = this.$BeeUtil.DateUtils.formatDatePatternShow(_this.showArchiveProjectDetailModel.startDate);

                    }
                    if(_this.showArchiveProjectDetailModel.endDate) {
                        //取得显示的日期
                        _this.showArchiveProjectDetailModel.endDateShow = this.$BeeUtil.DateUtils.formatDatePatternShow(_this.showArchiveProjectDetailModel.endDate);

                    }

                    _this.detailDialogConfig.isVisibleSync = true ;
                }
                console.log(_this.showArchiveProjectDetailModel);
            },
            handleArchiveItemDeleteClick(e,id) {
                var _this = this ;
                _this.$commonEleNotice.msgBox.handleShowSimpleWarningConfirm("是否确认要删除该归档项目？").then(() => {
                    ProjectsArchiveListCmopApi.doDeleteArchiveById(id).then(data => {
                        _this.$commonEleNotice.notification.handleShowSuccessNotify(data.info);
                        _this.handleGetArchiveProjectList();
                    })
                }).catch(() => {
                    console.log("取消删除归档项目") ;
                })
            },
            handleCreateDialogSubmitClose() {
                var _this = this ;
                //刷新列表
                _this.handleGetArchiveProjectList();
            }
        },
        mounted() {
            var _this = this ;
            if(_this.archiveProjectList.length == 0) {
                _this.handleGetArchiveProjectList()  ;
            }
        }
    }
</script>
<style scoped lang="stylus">
    @import './_ProjectsArchiveListComp.styl'
</style>
