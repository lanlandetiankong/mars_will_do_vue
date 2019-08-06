<template>
    <div class="taskQuadrantShowCompRootCls">
        <el-row>
            <el-col :span=12>
                <el-alert
                    class="taskQuadrantShowAlertCls"
                    title="很重要-很急"
                    type="error"
                    :center=true
                    :closable=false
                >
                </el-alert>
                <div class="taskQuadrantShowCompContentCls">
                        <el-table
                            ref="veryHurryTable"
                            stripe
                            :show-header=false
                            :highlight-current-row=true
                            empty-text="暂无任务!"
                            :data="veryHurryTableData"
                            :max-height=300
                            @sort-change="handleVeryHurryTableSortChange"
                            @row-click="handleVeryHurryTableRowClick"
                        >
                            <el-table-column
                                type="selection"
                                width="55"
                            >
                            </el-table-column>
                            <el-table-column
                                label="日期"
                                width="120"
                                sortable="custom"
                                current-row-key="id"
                            >
                                <template slot-scope="scope">{{ scope.row.date }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="任务名"
                                show-overflow-tooltip
                            >

                            </el-table-column>
                        </el-table>
                </div>
            </el-col>
            <el-col :span=12>
                <el-alert
                    title="重要-不紧急"
                    type="warning"
                    :center=true
                    :closable=false
                >
                </el-alert>
                <div class="taskQuadrantShowCompContentCls">

                </div>
            </el-col>
            <el-col :span=12>
                <el-alert
                    title="不重要-紧急"
                    type="success"
                    :center=true
                    :closable=false
                >
                </el-alert>
                <div class="taskQuadrantShowCompContentCls">

                </div>
            </el-col>
            <el-col :span=12>
                <el-alert
                    title="不重要-不紧急"
                    type="info"
                    :center=true
                    :closable=false
                >
                </el-alert>
                <div class="taskQuadrantShowCompContentCls">

                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: "TasksQuadrantShowComp",
        data() {
            return {
                veryHurryTableData:[
                    {
                        id:'1',
                        name:'番茄炒蛋',
                        date:'2019-07-23'
                    },
                    {
                        id:'2',
                        name:'蛋炒饭',
                        date:'2019-07-24'
                    },
                    {
                        id:'3',
                        name:'蛋炒饭',
                        date:'2019-07-24'
                    },
                    {
                        id:'4',
                        name:'蛋炒饭',
                        date:'2019-07-24'
                    },
                    {
                        id:'5',
                        name:'蛋炒饭',
                        date:'2019-07-24'
                    },
                    {
                        id:'6',
                        name:'蛋炒饭',
                        date:'2019-07-24'
                    },
                    {
                        id:'7',
                        name:'蛋炒饭',
                        date:'2019-07-24'
                    }
                ]
            }
        },
        methods:{
            handleBaseTasksDatePickChange(val) {
                console.log(val);
            },
            handleVeryHurryTableSortChange(orderParam) {
                console.log(orderParam);
            },
            handleVeryHurryTableRowClick(row, column, event) {
                console.log(row) ;
            }
        }
    }
</script>
<style scoped lang="stylus">
    @import './_TasksQuadrantShowComp.styl'
</style>
