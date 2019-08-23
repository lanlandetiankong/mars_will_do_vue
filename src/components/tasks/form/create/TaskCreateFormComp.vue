<template>
    <div>
        <el-dialog width="50%"
                   :visible.sync="isFormDialogVisible"
                   :title="dialogTitle"
                   :close-on-click-modal=false
        >
            <el-form
                label-width="100px"
                v-model="taskFormTempModel">
                <el-form-item label="任务名" prop="name">
                    <el-input v-model="taskFormTempModel.name"></el-input>
                </el-form-item>
                <el-form-item label="归属项目" prop="activityProjectId">
                    <el-select v-model="taskFormTempModel.activityProjectId">
                        <el-option
                            v-for="taskProject of taskProjectList"
                            :key="taskProject.id"
                            :value="taskProject.id"
                            :label="taskProject.name"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="任务级别" prop="taskLevel">
                    <el-select v-model="taskFormTempModel.taskLevel">
                        <el-option
                            v-for="taskHurryLevelItem of taskHurryLevelList"
                            :key="taskHurryLevelItem.key"
                            :value="taskHurryLevelItem.value"
                            :label="taskHurryLevelItem.label"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea"
                        v-model="taskFormTempModel.description"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="任务时间安排" prop="planDate">
                    <el-date-picker
                        type="datetimerange"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        v-model="taskFormTempModel.planDate"
                        :validate-event=true
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="任务进度" prop="progressRate">
                    <el-col :span=12>
                        <el-input-number
                            :min=0 :max=100
                            v-model="taskFormTempModel.progressRate"
                        >
                        </el-input-number>
                    </el-col>
                    <el-col :span=12>
                        <el-progress :percentage="taskFormTempModel.progressRate"></el-progress>
                    </el-col>
                </el-form-item>
                <el-form-item label="任务是否异常" prop="progressIsException">
                    <el-switch
                        v-model="taskFormTempModel.progressIsException"
                        :active-value=1
                        :inactive-value=0
                    >
                    </el-switch>
                </el-form-item>
                <el-form-item label="异常情况" prop="progressExceptionNote" v-show="isProgressException">
                    <el-input type="textarea"
                        v-model="taskFormTempModel.progressExceptionNote"></el-input>
                </el-form-item>
                <el-form-item label="更多表单设置">
                    <el-switch
                        v-model="isFormShowMore">
                    </el-switch>
                </el-form-item>


                <el-form-item label="提出者" prop="presenter" v-show="isFormShowMore">
                    <el-input v-model="taskFormTempModel.presenter"></el-input>
                </el-form-item>
                <el-form-item label="参与者" prop="participant" v-show="isFormShowMore">
                    <el-input v-model="taskFormTempModel.participant"></el-input>
                </el-form-item>
                <el-form-item label="便签1" prop="firstNote" v-show="isFormShowMore">
                    <el-input v-model="taskFormTempModel.firstNote"></el-input>
                </el-form-item>
                <el-form-item label="便签2" prop="secondNote" v-show="isFormShowMore">
                    <el-input v-model="taskFormTempModel.secondNote"></el-input>
                </el-form-item>
                <el-form-item label="便签3" prop="thirdNote" v-show="isFormShowMore">
                    <el-input v-model="taskFormTempModel.thirdNote"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="handleSubmitTaskForm"
                    >
                        确定
                    </el-button>
                    <el-button
                        @click="handleCloseFormDialog">
                        取消
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {TaskCreateFormCompApi} from './_TaskCreateFormComp'
    import {TaskBindParamApi} from '~ApiPath/bind/TaskBindParamApi'

    export default {
        name: "TaskCreateFormComp",
        props: {
            taskFormTempModel: {
                id: '',
                name: '',
                description:'',
                progressRate:0,
                progressIsException:0,
                hurryLevel: '',
                activityProjectId: '',
                taskLevel: '',
                planDate: [],
                presenter: '',
                participant: '',
                firstNote: '',
                secondNote: '',
                thirdNote: ''
            },
            isNewForm: Boolean,
            isFormDialogVisible: Boolean
        },
        data() {
            return {
                taskHurryLevelList: [],
                taskProjectList: [],
                isFormShowMore: false
            }
        },
        computed: {
            dialogTitle() {
                return this.isNewForm ? "新建任务" : "编辑任务";
            },
            isProgressException() {
                var _this = this ;
                return _this.taskFormTempModel.progressIsException == 1 ? true : false ;
            }
        },
        methods: {
            handleGetTaskHurryLevelList() {
                //任务紧急级别
                var _this = this;
                TaskBindParamApi.doGetTaskHurryLevelBindParam().then(res => {
                    _this.taskHurryLevelList = res.enumList;
                })
            },
            handleGetTaskProjectList() {
                //用户的项目
                var _this = this;
                TaskCreateFormCompApi.doGetActivityProject().then(res => {
                    _this.taskProjectList = res.resultList;
                    //console.log(_this.taskProjectList);
                })
            },
            handleSubmitTaskForm(e) {
                var _this = this;
                //新增
                if(_this.isNewForm == true) {
                    TaskCreateFormCompApi.doAddActivityProjectByFormModel(_this.taskFormTempModel).then(res => {
                        _this.$commonEleNotice.notification.handleShowSuccessNotify(res.info);
                        _this.handleCloseFormDialog(e,true);
                    })
                }   else {
                    console.log("_this.taskFormTempModel ==> " ,_this.taskFormTempModel);
                    //更新
                    TaskCreateFormCompApi.doEditActivityProjectByFormModel(_this.taskFormTempModel).then(res => {
                        _this.$commonEleNotice.notification.handleShowSuccessNotify(res.info);
                        _this.handleCloseFormDialog(e,true);
                    })
                }
            },
            handleCloseFormDialog(e,isSubmit) {
                var _this = this ;
                if(typeof isSubmit == "undefined") {
                    isSubmit = false ;
                }
                this.$emit('edit-form-close',e,isSubmit);
            }
        },
        mounted() {
            this.handleGetTaskHurryLevelList();
            this.handleGetTaskProjectList();
        }
    }
</script>

<style scoped>
    @import "./_TaskCreateFormComp.styl";
</style>
