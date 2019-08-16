<template>
    <div>
        <el-dialog  width="50%"
            :visible.async="isFormDialogVisible"
            :title="dialogTitle">
            <el-form
                label-width="100px"
                v-model="taskFormModel">
                <el-form-item label="任务名" prop="name">
                    <el-input v-model="taskFormModel.name"></el-input>
                </el-form-item>
                <el-form-item label="归属项目" prop="activityProjectId">
                    <el-select v-model="taskFormModel.activityProjectId">
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
                    <el-select v-model="taskFormModel.taskLevel">
                        <el-option
                            v-for="taskHurryLevelItem of taskHurryLevelList"
                            :key="taskHurryLevelItem.key"
                            :value="taskHurryLevelItem.value"
                            :label="taskHurryLevelItem.label"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述" prop="description" >
                    <el-input v-model="taskFormModel.description"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="任务时间安排" prop="planDate">
                    <el-date-picker
                        type="datetimerange"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        v-model="taskFormModel.planDate"
                        :validate-event=true
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="更多表单设置">
                    <el-switch
                        v-model="isFormShowMore">
                    </el-switch>
                </el-form-item>


                <el-form-item label="提出者" prop="presenter" v-show="isFormShowMore">
                    <el-input v-model="taskFormModel.presenter"></el-input>
                </el-form-item>
                <el-form-item label="参与者" prop="participant" v-show="isFormShowMore">
                    <el-input v-model="taskFormModel.participant"></el-input>
                </el-form-item>
                <el-form-item label="便签1" prop="firstNote" v-show="isFormShowMore">
                    <el-input v-model="taskFormModel.firstNote"></el-input>
                </el-form-item>
                <el-form-item label="便签2" prop="secondNote" v-show="isFormShowMore">
                    <el-input v-model="taskFormModel.secondNote"></el-input>
                </el-form-item>
                <el-form-item label="便签3" prop="thirdNote">
                    <el-input v-model="taskFormModel.thirdNote"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="handleSubmitTagsForm"
                    >
                        确定
                    </el-button>
                    <el-button
                        @click="$emit('edit-form-close',$event)">
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
            taskFormModel: {
                id:'',
                name: '',
                hurryLevel: '',
                activityProjectId:'',
                taskLevel:'',
                planDate:[],
                presenter:'',
                participant:'',
                firstNote: '',
                secondNote: '',
                thirdNote:''
            },
            isNewForm: Boolean,
            isFormDialogVisible: Boolean,
            isFormShowMore:false
        },
        data() {
            return {
                taskHurryLevelList:[],
                taskProjectList:[]
            }
        },
        computed: {
            dialogTitle() {
                return this.isNewForm ? "新建任务" : "编辑任务" ;
            }
        },
        methods: {
            handleGetTaskHurryLevelList() {
                //任务紧急级别
                var _this = this ;
                TaskBindParamApi.doGetTaskHurryLevelBindParam().then(res => {
                    _this.taskHurryLevelList = res.enumList ;
                })
            },
            handleGetTaskProjectList() {
                //用户的项目
                var _this = this ;
                TaskCreateFormCompApi.doGetActivityProject().then(res => {
                    _this.taskProjectList = res.resultList ;
                    console.log(_this.taskProjectList);
                })
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
