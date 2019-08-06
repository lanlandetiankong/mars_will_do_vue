<template>
    <div class="baseTaskTasksSearchCompRootCls">
        <el-container>
            <el-header>
                <el-row :gutter=10
                        type="flex"
                        justify="end">
                    <el-col :span=8>
                        <el-date-picker
                            type="datetimerange"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            range-separator="至"
                            :picker-options="search.datePicker.options"
                            v-model="search.datePicker.value"
                        >

                        </el-date-picker>
                    </el-col>
                    <el-col :span=4 >
                        <el-input
                            placeholder="输入查询的任务名"
                            v-model="search.taskName"
                        >
                        </el-input>
                    </el-col>
                    <el-col :span=4
                    >
                        <el-button  round
                            type="primary"
                        >
                            查询
                        </el-button>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
            </el-header>
            <el-main>
                <el-table>

                </el-table>
                <el-pagination v-show="isPaginationRender">

                </el-pagination>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    //stylus
    import './_BaseTasksSearchComp.styl'
    import ElPager from "element-ui/packages/pagination/src/pager";
    export default {
        name: "BaseTasksSearchComp",
        components: {ElPager},
        data() {
            return {
                search:{
                    taskName:'',
                    datePicker:{
                        value:new Date(),
                        options:{
                            shortcuts:[{
                                text:'最近一周',
                                onClick(picker) {
                                    const end = new Date() ;
                                    const start = new Date() ;
                                    start.setTime(start.getTime() - 3600 * 1000 * 24 *7 ) ;
                                    picker.$emit('pick',[start,end]) ;
                                }
                            },{
                                text:'最近一个月',
                                onClick(picker) {
                                    const end = new Date() ;
                                    const start = new Date() ;
                                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                    picker.$emit('pick', [start, end]);
                                }
                            },{
                                text:'最近三个月',
                                onClick(picker) {
                                    const end = new Date() ;
                                    const start = new Date() ;
                                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                    picker.$emit('pick', [start, end]);
                                }
                            }]
                        }
                    }
                },
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
        computed:{
           isPaginationRender() {
               return this.veryHurryTableData.length > 0  ;
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
    @import './_BaseTasksSearchComp.styl'
</style>
