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
                               @click="handleAddTask"
                    >
                    </el-button>
                </div>
            </el-header>
            <el-main>
                <task-quadrant-show-comp>
                </task-quadrant-show-comp>
            </el-main>
        </el-container>
        <task-create-form-comp
            :isFormDialogVisible="isFormDialogVisible"
            :isNewForm="isNewForm"
            :taskFormModel="taskFormModel"
        >
        </task-create-form-comp>
    </div>
</template>
<script>
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
                isFormDialogVisible:true,
                taskFormModel:{
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
                }
            }
        },
        methods: {
            handleBaseTasksDatePickChange(val) {
                console.log(val);
            },
            handleAddTask(e) {

            }
        }
    }
</script>
<style scoped lang="stylus">
    @import './_BaseTasksComp.styl'
</style>
