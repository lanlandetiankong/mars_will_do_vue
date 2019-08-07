<template>
    <div class="projectActivityListCompRootCls">
        <el-container>
            <el-header>
                <el-row type="flex" justify="end">
                    <el-col :span=2 :offset=1>
                        <el-button
                            type="primary" size="small" icon="el-icon-plus"
                            @click="handleAddActivityProjectClick"
                        >
                            新建项目
                        </el-button>
                    </el-col>
                    <el-col :span=6 :offset=1>
                        <el-input style="width: 80%"
                                  v-model="mySearch.projectName"
                                  placeholder="输入要查询的项目名"
                        >
                        </el-input>
                        <el-button round
                                   type="primary"
                                   size="small"
                                   icon="el-icon-search"
                                   @click="handleGetActivityProjectList"
                        >
                        </el-button>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
            </el-header>
            <el-main>
                <el-row :gutter=1>
                    <el-col :span=8 v-for="item of activityProjectList" :key="item.id">
                        <div class="projectActivityListCompContainerCls"
                             @dblclick="handleProjectActivityItemDblClick($event,item.id)"
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
                                            <el-dropdown-item  @click.native="handleActivityItemEditClick($event,item.id)">编辑</el-dropdown-item>
                                            <el-dropdown-item @click.native="handleActivityItemDeleteClick($event,item.id)">删除</el-dropdown-item>
                                            <el-dropdown-item @click.native="handleActivityItemToArchiveClick($event,item.id)">归档</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </el-header>
                                <el-main class="projectActivityListCompContainerMainCls">
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
                <create-activity-project-comp
                    :config="createDialogConfig"
                    @dialog-submit-close="handleCreateDialogSubmitClose"
                >
                </create-activity-project-comp>
            </el-main>
        </el-container>
        <el-dialog
            center
            :modal=true
            :close-on-click-modal=false
            width="60%"
            :title="showActivityProjectDetailModel.name"
            :visible.sync="detailDialogConfig.isVisibleSync"
        >
            <el-collapse>
                <el-collapse-item>
                    <template slot="title">
                        <el-tag effect="dark">简介</el-tag>
                    </template>
                    {{showActivityProjectDetailModel.description}}
                </el-collapse-item>
                <el-collapse-item >
                    <template slot="title">
                        <el-tag effect="dark">目标</el-tag>
                    </template>
                    {{showActivityProjectDetailModel.goal}}
                </el-collapse-item>
                <el-collapse-item  v-if="showActivityProjectDetailModel.startDateShow && showActivityProjectDetailModel.endDateShow">
                    <template slot="title">
                        <el-tag effect="dark">日期规划</el-tag>
                    </template>
                     <el-tag  size="medium" effect="dark" type="success"
                             :disable-transitions=true :hit=true
                     >
                         {{showActivityProjectDetailModel.startDateShow}}
                     </el-tag>
                            ===>
                    <el-tag size="medium" effect="dark"
                            type="success"
                        :disable-transitions=true :hit=true
                    >
                        {{showActivityProjectDetailModel.endDateShow}}
                    </el-tag>
                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <el-tag effect="dark">便签1</el-tag>
                    </template>
                    {{showActivityProjectDetailModel.firstNote}}
                </el-collapse-item>
                <el-collapse-item >
                    <template slot="title">
                        <el-tag effect="dark">便签2</el-tag>
                    </template>
                    {{showActivityProjectDetailModel.secondNote}}
                </el-collapse-item>
            </el-collapse>
        </el-dialog>
    </div>
</template>
<script>
    import CreateActivityProjectComp from '../form/CreateActivityProjectComp'
    import {ProjectsActivityListCmopApi} from './_ProjectsActivityListComp'
    export default {
        name: "ProjectsActivityListComp",
        components:{
            CreateActivityProjectComp
        },
        data() {
            return {
                mySearch:{
                    projectName:''
                },
                createDialogConfig :{
                    isVisibleSync : false,
                    projectId: '',
                    isCreate:false
                },
                detailDialogConfig:{
                    isVisibleSync:false
                },
                activityProjectList:[],
                showActivityProjectDetailModel:{}
            }
        },
        methods:{
            handleAddActivityProjectClick(e) {
                //显示 新建弹窗
                this.createDialogConfig.projectId = '';
                this.createDialogConfig.isCreate = true;
                this.createDialogConfig.isVisibleSync = true;
            },
            handleGetActivityProjectList() {
                var _this = this ;
                const searchParam = {
                    value:_this.mySearch.projectName
                };
                ProjectsActivityListCmopApi.doGetActivityProject((searchParam)).then(res => {
                    if(res.resultList) {
                        _this.activityProjectList = res.resultList ;
                    }
                })
            },
            handleProjectActivityItemDblClick(e,id){
                var _this = this ;
                _this.showActivityProjectDetailModel = _this.activityProjectList.filter(val => val.id == id)[0] ;
                if(_this.showActivityProjectDetailModel.id){
                    if(_this.showActivityProjectDetailModel.startDate) {
                        //取得显示的开始日期
                        _this.showActivityProjectDetailModel.startDateShow = _this.$formatDateUtil.formatYMDDateForShow(_this.showActivityProjectDetailModel.startDate);
                    }
                    if(_this.showActivityProjectDetailModel.endDate) {
                        //取得显示的日期
                        _this.showActivityProjectDetailModel.endDateShow = _this.$formatDateUtil.formatYMDDateForShow(_this.showActivityProjectDetailModel.endDate);
                    }

                    _this.detailDialogConfig.isVisibleSync = true ;
                }
                console.log(_this.showActivityProjectDetailModel);
            },
            handleActivityItemEditClick(e,id) {
                //项目编辑
                this.createDialogConfig.projectId = id ;
                this.createDialogConfig.isCreate = false;
                this.createDialogConfig.isVisibleSync = true ;
            },
            handleActivityItemDeleteClick(e,id) {
                var _this = this ;
                _this.$handleSimpleConfirm.handleShowSimpleWarningConfirm("是否确认要删除该项目？").then(() => {
                    ProjectsActivityListCmopApi.doDeleteActivityById(id).then(data => {
                        _this.$handleShowSimpleNotify.handleShowSuccessNotify(data.info);
                        _this.handleGetActivityProjectList();
                    })
                }).catch(() => {
                    console.log("取消删除") ;
                })
            },
            handleActivityItemToArchiveClick(e,id){
                var _this = this ;
                _this.$handleSimpleConfirm.handleShowSimpleWarningConfirm("是否确认要归档该项目？").then(() => {
                    ProjectsActivityListCmopApi.doProjectTranslateToArchiveById(id).then(data => {
                        _this.$handleShowSimpleNotify.handleShowSuccessNotify(data.info);
                        _this.handleGetActivityProjectList();
                    })
                }).catch(() => {
                    console.log("取消归档") ;
                })
                console.log("归档",id) ;
                //项目归档
            },
            handleCreateDialogSubmitClose() {
                var _this = this ;
                //关闭弹窗
                _this.createDialogConfig.isVisibleSync = false;
                //刷新列表
                _this.handleGetActivityProjectList();
            }
        },
        mounted() {
            var _this = this ;
            if(_this.activityProjectList.length == 0) {
                _this.handleGetActivityProjectList()  ;
            }
        }
    }
</script>
<style scoped lang="stylus">
    @import './_ProjectsActivityListComp.styl'
</style>
