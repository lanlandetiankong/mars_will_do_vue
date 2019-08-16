<template>
    <div class="taskQuadrantShowCompRootCls">
        <el-timeline>
            <el-timeline-item type="primary" placement="top"
                v-for="item of veryHurryTableData"
                :key="item.id"
                :timestamp="item.date">
                <div>
                    <el-card shadow="hover">
                        <template slot="header">
                            {{item.name}}
                        </template>
                        <div>
                            {{item.name}}{{item.date}}
                        </div>
                    </el-card>

                </div>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>
<script>
    export default {
        name: "TasksQuadrantShowComp",
        data() {
            return {
                veryHurryTableData: [
                    {
                        id: '1',
                        name: '番茄炒蛋',
                        date: '2019-07-23'
                    },
                    {
                        id: '2',
                        name: '蛋炒饭',
                        date: '2019-07-24'
                    },
                    {
                        id: '3',
                        name: '蛋炒饭',
                        date: '2019-07-24'
                    },
                    {
                        id: '4',
                        name: '蛋炒饭',
                        date: '2019-07-24'
                    },
                    {
                        id: '5',
                        name: '蛋炒饭',
                        date: '2019-07-24'
                    },
                    {
                        id: '6',
                        name: '蛋炒饭',
                        date: '2019-07-24'
                    },
                    {
                        id: '7',
                        name: '蛋炒饭sss',
                        date: '2019-07-24'
                    },
                    {
                        id: '8',
                        name: '蛋炒饭sss',
                        date: '2019-07-24'
                    },
                    {
                        id: '9',
                        name: '蛋炒饭sss',
                        date: '2019-07-24'
                    },
                    {
                        id: '10',
                        name: '蛋炒饭sss',
                        date: '2019-07-24'
                    }
                ]
            }
        },
        methods: {
            handleBaseTasksDatePickChange(val) {
                console.log(val);
            },
            handleVeryHurryTableSortChange(orderParam) {
                console.log(orderParam);
            },
            handleVeryHurryTableRowClick(row, column, event) {
                console.log(row);
            }
        }
    }
</script>
<style scoped lang="stylus">
    @import './_TasksQuadrantShowComp.styl'
</style>
