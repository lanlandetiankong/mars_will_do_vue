<template>
    <div class="baseTaskCompRootCls">
        <el-container class="baseTaskCompRootContainerCls">
            <el-header>
                <el-date-picker
                    size="large"
                    :editable=false
                    type="datetimerange"
                    align="left"
                    prefix-icon="mars-icons mars-icon-clock"
                    :clearable=true
                    :unlink-panels=false
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    :picker-options="baseTasksPickOption"
                    v-model="baseTasksPickDate"
                    @change="handleBaseTasksDatePickChange"
                >
                </el-date-picker>
                <div class="baseTaskCompShowOptionsSelectCls">
                    <el-select
                        size="small"
                        placeholder="进度筛选"
                        v-model="baseTasksCompleteRate">
                        <el-option
                            v-for="item of baseTasksCompleteRateFilterOptions"
                            :key="item.id"
                            :value="item.value"
                            :label="item.label"></el-option>
                    </el-select>
                    <el-button round
                               type="primary"
                               size="mini"
                               icon="mars-icons mars-icon-add"
                               @click="handleAddTaskForm"
                    >
                    </el-button>
                    <el-button round
                               type="primary"
                               size="mini"
                               icon="el-icon-refresh"
                               :loading="taskTableListLoading"
                               @click="handleGetTaskTableList"
                    >
                        刷新列表
                    </el-button>
                </div>
            </el-header>
            <el-main>
                <task-quadrant-show-comp
                    :tableList="taskTableList"
                    @action-edit="handleEditTaskForm"
                    @action-refresh="handleGetTaskTableList"
                >
                </task-quadrant-show-comp>
            </el-main>
        </el-container>
        <task-create-form-comp
            :isFormDialogVisible="isFormDialogVisible"
            :isNewForm="isNewForm"
            :taskFormTempModel="taskFormTempModel"
            @edit-form-close="handleAddTaskFormDialogClose"
        >
        </task-create-form-comp>
    </div>
</template>
<script>
    import {BaseTaskCompApi} from './_BaseTasksComp'

    import TaskQuadrantShowComp from '../quadrant_show/TasksQuadrantShowComp'
    import TaskCreateFormComp from '../form/create/TaskCreateFormComp'

    export default {
        name: "BaseTasksComp",
        components: {
            TaskQuadrantShowComp,
            TaskCreateFormComp
        },
        data() {
            return {
                baseTasksPickDate: new Date(),
                baseTasksPickOption: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                baseTasksShowType: '',
                baseTasksCompleteRate: '',
                baseTasksCompleteRateFilterOptions: [
                    {
                        id: 'completeRate1',
                        label: '全部',
                        value: 'type1'
                    },
                    {
                        id: 'completeRate2',
                        label: '已完成',
                        value: 'type2'
                    },
                    {
                        id: 'completeRate3',
                        label: '未完成',
                        value: 'type3'
                    }
                ],
                isNewForm:true,
                isFormDialogVisible:false,
                defaultTaskFormModel:{
                    id:''
                },
                taskFormModel:{
                    id:'',
                    name: '',
                    hurryLevel: '',
                    activityProjectId:'',
                    taskLevel:'',
                    planDate:[],
                    description:'',
                    progressRate:0,
                    presenter:'',
                    participant:'',
                    firstNote: '',
                    secondNote: '',
                    thirdNote:''
                },
                taskFormTempModel: {
                    id: '',
                    name: '',
                    description:'',
                    progressRate:0,
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
                searchModel:{
                    content:''
                },
                taskTableList:[],
                taskTableListLoading:true
            }
        },
        methods: {
            handleBaseTasksDatePickChange(val) {
                console.log(val);
            },
            handleAddTaskForm(e) {
                this.isFormDialogVisible = true ;
                this.isNewForm = true ;
                this.taskFormTempModel = JSON.parse(JSON.stringify(this.defaultTaskFormModel));
            },
            handleEditTaskForm(item){
                this.isFormDialogVisible = true ;
                this.isNewForm = false ;
                this.taskFormTempModel = item ;
                this.taskFormTempModel = JSON.parse(JSON.stringify(item));
                var itemPlanStartDateStr = item.planStartDateStr;
                var itemPlanEndDateStr = item.planEndDateStr;
                var itemPlanDateStrArr = [itemPlanStartDateStr,itemPlanEndDateStr] ;
                console.log(item) ;
                this.taskFormTempModel.planDate = itemPlanDateStrArr ;
            },
            handleAddTaskFormDialogClose(e,isSubmit) {
                this.isFormDialogVisible = false ;
                this.taskFormTempModel = JSON.parse(JSON.stringify(this.defaultTaskFormModel ));
                if(isSubmit == true) {
                    this.handleGetTaskTableList(e);
                }
            },
            handleGetTaskTableList(e) {
                var _this = this ;
                _this.taskTableListLoading = true;
                BaseTaskCompApi.doGetAllMyTasks(_this.searchModel).then(res => {
                    _this.taskTableList = res.resultList ;
                })
                _this.taskTableListLoading = false;
            },
        },
        mounted(){
            this.handleGetTaskTableList();
        }
    }
</script>
<style scoped lang="stylus">
    @import './_BaseTasksComp.styl'
</style>
