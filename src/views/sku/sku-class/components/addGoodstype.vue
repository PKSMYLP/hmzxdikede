<template>
  <el-dialog :title="`${formData.classId?'修改':'添加'}商品类型`" width="40%" :visible="dialogVisible" :before-close="handleClose">

    <el-form ref="addForm" :label-position="labelPosition" label-width="120px" :rules="rules" :model="formData">
      <el-form-item label="区域名称：" style="width:520px" prop="className">
        <el-input v-model="formData.className" placeholder="请输入" show-word-limit maxlength="10" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button style="margin-right:15px" class="primary1" @click="handleClose">取 消</el-button>
      <el-button v-loading="loading" type="primary" class="primary2" @click="subimt">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addGoodsType, amendGoodsType } from '@/api/permission'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      labelPosition: 'right',
      formData: {
        classId: null,
        className: '',
        parentId: null
      },
      rules: { className: [{ required: true, message: '请输入', trigger: 'change' }] }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.addForm.resetFields()
      this.formData = { className: '' }
    },
    // 确定按钮
    async  subimt() {
      try {
        this.loading = true
        this.formData.classId ? await amendGoodsType(this.formData.classId, this.formData) : await addGoodsType(this.formData)
        this.handleClose()
        this.$parent.getSkuClassSearch()
        this.$message.success(`${this.formData.classId ? '修改' : '添加'}成功`)
      } catch (error) {
        console.log('🚀 ~ file: addGoodstype.vue ~ line 49 ~ subimt ~ error', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
    .el-dialog__wrapper>>>.el-dialog{
       border-radius: 10px !important;
   }
   .dialog-footer{
       position: absolute;
       bottom: 20px;
       right: 210px;
       margin-bottom: 5px;
   }
   .primary1{
       background-color: #fbf4f0!important;
       border: none;
   }
   .primary2{
       background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
       border: none;
   }
   </style>
