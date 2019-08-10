<template>
    <div>
        <el-dialog width="40%" title="编辑便签" center
                   :modal=true
                   :close-on-click-modal=false
                   :visible.sync="editDialog.isVisibleSync"
        >
            <el-form>
                <el-form-item>
                    <el-input type="textarea"
                              :autosize="{minRows:2,maxRows:5}"
                              v-model="editForm.content">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="handleUpdateEditForm"
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
    import './_MyShortNotesEditFormComp.styl'
    import {MyShortNotesEditFormCmopApi} from './_MyShortNotesEditFormComp.js'

    export default {
        name: "MyShortNotesEditFormComp",
        props: {
            editForm: Object,
            editDialog: {
                isVisibleSync: Boolean,
            }
        },
        data() {
            return {}
        },
        methods: {
            handleUpdateEditForm(e) {
                var _this = this;
                MyShortNotesEditFormCmopApi.doUpdateMyShortNote(_this.editForm).then(res => {
                    _this.$handleShowSimpleNotify.handleShowSuccessNotify(res.info, 3000);
                })
                this.$emit('edit-form-submit', e);
            },
        }
    }
</script>

<style scoped>

</style>
