<template>
    <div>
        <el-dialog :title="dialogConfig.dialogConfig"
                   label-width="80px"
                   :close-on-click-modal=false
                   :visible.sync="config.isVisibleSync"
                   @open="handleCreateDialogOpen"

        >
            <el-form
                 ref="createActivityProjectCompFormRef"
                :model="formModel"
                :rules="formRule"
            >
                <el-form-item
                    label="项目名称"
                    prop="name"
                >
                    <el-col :span="20">
                        <el-input
                            autofocus
                            placeholder="请输入项目名"
                            v-model="formModel.name"
                        >
                        </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item
                    label="项目日期规划"
                    required
                >
                        <el-date-picker
                            type="datetimerange"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="formModel.activityPlanDate"
                            :validate-event=true
                        >
                        </el-date-picker>
                </el-form-item>
                <el-form-item
                    label="项目简介"
                >
                    <el-input
                        type="textarea"
                        :rows="2"
                        v-model="formModel.description"
                        prop="description"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="项目目标"
                    prop="goal"
                >
                    <el-col :span="20">
                        <el-input
                            v-model="formModel.goal"
                        >
                        </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item required
                    label="紧急级别">
                    <el-select filterable
                               placeholder="请选择"
                               v-model="formModel.hurryLevel"
                    >
                        <el-option
                            v-for="item of hurryLevels"
                            :key="item.key"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="便签1"
                >
                    <el-col :span="20">
                        <el-input
                            v-model="formModel.firstNote"
                        >

                        </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item
                    label="便签2"
                >
                    <el-col :span="20">
                        <el-input
                            v-model="formModel.secondNote"
                        >
                        </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item
                    label="备注"
                >
                    <el-col :span="20">
                        <el-input type="textarea"
                            v-model="formModel.remark"
                        >
                        </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="排序">
                    <el-col :span="20">
                        <el-input-number
                            :min="0"
                            controls-position="right"
                            v-model="formModel.sort"
                        >
                        </el-input-number>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="handleSubmitForm"
                    >
                        确定
                    </el-button>
                    <el-button
                        @click="handleCloseCreateActivityProjectForm"
                    >
                        取消
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import {CreateActivityProjectCompApi} from  './_CreateActivityProjectCompApi'
    import {ProjectBindParamApi} from '~ApiPath/bind/ProjectBindParamApi'
    export default {
        name: "CreateActivityProjectComp",
        props:{
              config:{
                  isVisibleSync:Boolean,
                  projectId:String,
                  isCreate:Boolean
              },
        },
        data() {
            return {
                dialogConfig:{
                   title:"创建项目"
                },
                formModel:{
                    id:'',
                    name:'',
                    activityPlanDate:[],
                    goal:'',
                    hurryLevel:'',
                    description:'',
                    firstNote:'',
                    secondNote:'',
                    sort:0,
                    remark:''
                },
                formRule:{
                    name:[
                        {required:true,message:'请输入项目名称',trigger:'blur'},
                        {min:3,max:100,message:'请输入3到100个字符',trigger:'blur'}
                    ],
                    goal:[
                        {required:true,message:'请输入项目目标',trigger:'blur'}
                    ],
                    description:[
                        {required:true,message:'请输入项目简介',trigger:'blur'}
                    ]
                },
                hurryLevels:[]
            }
        },
        computed:{
            createActivityProjectCompFormRef() {
                return this.$refs['createActivityProjectCompFormRef'] ;
            }
        },
        methods:{
            handleSubmitForm() {
                var _this = this ;
                if(_this.config.isCreate) {
                    _this.createActivityProjectCompFormRef.validate((valid) => {
                        //表单验证通过时，提交[新建]申请
                        if(valid) {
                            CreateActivityProjectCompApi.doCreateActivityProjectByForm(this.formModel).then(res => {
                                console.log(res) ;
                                _this.createActivityProjectCompFormRef.resetFields() ;
                                _this.handleCloseCreateActivityProjectForm();
                            }) ;
                        }
                    }) ;
                }   else {
                    _this.createActivityProjectCompFormRef.validate((valid) => {
                        //表单验证通过时，提交[编辑]申请
                        if(valid) {
                            CreateActivityProjectCompApi.doUpdateActivityProjectByForm(this.formModel).then(res => {
                                console.log(res) ;
                                _this.createActivityProjectCompFormRef.resetFields() ;
                                _this.handleCloseCreateActivityProjectForm();
                            }) ;
                        }
                    }) ;
                }
            },
            doGetProjectHurryLevelBind() {
                //取得 项目[紧急级别]
                var _this = this ;
                ProjectBindParamApi.doGetProjectHurryLevelBindParam().then(res => {
                    _this.hurryLevels = res.enumList ;
                });
            },
            handleCloseCreateActivityProjectForm(){
                //关闭弹窗
                this.$emit("dialog-submit-close") ;
            },
            handleCreateDialogOpen(e){
                //弹窗开启事件
                var _this = this ;
                debugger;
                //projectId不为空， 即代表是[编辑]，需要渲染
                if(!_this.$paramValidateDefine.checkParamIsBlank(_this.config.projectId)) {
                    _this.dialogConfig.dialogConfig = "编辑项目" ;
                    CreateActivityProjectCompApi.doGetActivityProjectById(_this.config.projectId).then(res => {
                        const resultBean = res.bean;
                        if(resultBean) {
                            _this.formModel = resultBean ;
                            var startDateTime = _this.$formatDateUtil.formatDateTimeForShow(resultBean.startDate) ;
                            var endDateTime = _this.$formatDateUtil.formatDateTimeForShow(resultBean.endDate) ;
                            //var activityPlanDate = ['2019-08-05 12:00:00','2019-08-05 13:00:00'];
                            var activityPlanDate = [startDateTime,endDateTime] ;
                            _this.formModel.activityPlanDate = activityPlanDate ;
                        }
                    })
                }   else {
                    _this.dialogConfig.dialogConfig = "创建新项目" ;
                    //传入默认值
                    _this.formModel = {
                        sort:1
                    }
                }
            },
        },
        mounted(){
            var _this = this ;
            if(_this.hurryLevels.length == 0 ) {
                //取得[任务紧急级别]
                _this.doGetProjectHurryLevelBind();
            }
        }
    }
</script>

<style scoped>

</style>
