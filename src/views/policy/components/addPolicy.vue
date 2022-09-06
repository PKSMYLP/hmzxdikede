<template>
  <el-dialog
    :title="`${formPolicy.policyId ? '修改' : '新增'}成功`"
    :visible="dialogVisible"
    width="40%"
    :before-close="handleClose"
  >
    <el-form ref="addEmployeeDialog" label-width="150px" :model="formPolicy" :rules="rules">
      <el-form-item label="策略名称：" prop="policyName">
        <el-input v-model="formPolicy.policyName" style="width:80%" maxlength="15" placeholder="请输入" show-word-limit />
      </el-form-item>
      <el-form-item label="策略方案：" prop="discount">
        <el-input v-model="formPolicy.discount" style="width:80%" placeholder="请输入">
          <template slot="suffix" style="width:20%">
            <div class="arrows">
              <button class="el-icon-arrow-up" @click="update" />
              <button ref="down" class="el-icon-arrow-down" @click="downData" /></div>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitaddPolicy">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addPolicyApi, changePolicy } from '@/api/policy'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formPolicy: {
        createTime: '',
        policyName: '',
        discount: '',
        policyId: '',
        updateTime: ''
      },
      rules: {
        policyName: [{ required: true, message: '策略名称必须填写', trigger: 'blur' }],
        discount: [{ required: true, message: '策略方案必须填写', trigger: 'blur' }]
      }
    }
  },
  methods: {
    update() {
      this.formPolicy.discount++
      this.$refs.down.style.background = '#f8fafd'
      this.$refs.down.style.cursor = 'pointer'
    },
    downData() {
      if (this.formPolicy.discount < 2) {
        this.$refs.down.style = 'disabled'
        this.$refs.down.style.background = '#f8fafd'
        this.$refs.down.style.cursor = 'no-drop'
        this.formPolicy.discount = 1
      } else {
        this.formPolicy.discount--
      }
    },
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.addEmployeeDialog.resetFields()
      this.formPolicy = {
        policyNamde: '',
        discount: ''
      }
    },
    async submitaddPolicy() {
      try {
        await this.$refs.addEmployeeDialog.validate()
        this.formPolicy.policyId ? await changePolicy(this.formPolicy) : await addPolicyApi(this.formPolicy)
        this.$message.success(`${this.formPolicy.policyId ? '修改' : '修改'}成功`)
        this.$emit('refresh')
        this.handleClose()
      } catch (e) {
        console.log(1)
      }
    }

  }
}
</script>

  <style scoped>
      .el-button--default{
          background: #f3e7e1;
      }
  .el-button--primary{
      margin-left: 40px;
      background: #ff6525;
  }
  .arrows {
    position: relative;
    width: 40px;
    border: 1px solid #dadfe4;
  }
  .el-icon-arrow-up{
    height:20px;
    width: 40px;
    background: #f8fafd;
    /* background: red; */
    position: absolute;
    border-radius: 3px;
    top:0px;
    border: 1px solid #dadfe4;
    right: -5px;
    cursor: pointer;
  }

  .el-icon-arrow-down{
    width: 40px;
    border: 1px solid #dadfe4;
    height:20px;
    background: #f8fafd;
    /* background: red; */
    border-radius: 3px;
    position: absolute;
    top:18px;
    right: -5px;
    cursor: pointer;
  }

  </style>
  <style>
      .el-dialog__footer {
      text-align: center;
  }
  .el-input--suffix .el-input__inner {
    text-align: center !important;
  }
  </style>

