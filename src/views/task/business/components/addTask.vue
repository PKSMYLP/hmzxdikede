<template>
  <div>
    <el-dialog width="45%" title="新增工单" :visible="dialogVisible" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="设备编号：" prop="innerCode">
          <el-input v-model="form.innerCode" style="width:80%" placeholder="请输入" type="text" maxlength="15" show-word-limit @blur="getoperatorList" />
        </el-form-item>

        <el-form-item label="工单类型：" prop="productType">
          <el-select v-model="form.productType" placeholder="请选择" style="width:80%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="补货数量:">
          <el-button type="text" icon="el-icon-edit-outline" @click="channelList">补货清单</el-button>
        </el-form-item>
        <el-form-item label="运营人员：" prop="assignorId">
          <el-select v-model="form.assignorId" placeholder="请选择" style="width:80%">
            <el-option v-for="(item,index) in operatorList" :key="index" :label="item.userName" :value="item.userId" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注：" prop="desc">
          <el-input v-model="form.desc" type="textarea" placeholder="请输入备注（不超过40字）" style="width:80%" maxlength="40" show-word-limit />
        </el-form-item>
      </el-form>
      <!-- footer插槽 -->
      <template v-slot:footer>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="handleClose">取消</el-button>
            <el-button type="primary" size="small" @click="submit">确定</el-button>
          </el-col>
        </el-row>
      </template>
    </el-dialog>
    <!-- 补货详情 -->
    <el-dialog
      title="补货详情"
      :visible="dialogVisible1"
      width="45%"
      height="60%"
      :before-close="handleClose1"
    >
      <el-table
        :data="list1"
        style="width: 100%; "
        max-height="330"
      >
        <el-table-column
          prop="channelCode"
          label="货道编号"
          width="80"
        />
        <el-table-column
          prop="skuName"
          label="商品名称"
          width="100"
        />
        <el-table-column
          prop="currentCapacity"
          label="当前数量"
          width="100"
        />
        <el-table-column
          prop="addCapacity"
          label="还可添加"
          width="100"
        />
        <el-table-column
          label="补满数量"
          width="200"
        >
          <template slot-scope="{row}">

            <el-input-number v-if="row.sku" v-model="row.expectCapacity" controls-position="right" :min="0" :max="row.addCapacity" />
            <span v-else>货道暂无商品</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- footer插槽 -->
      <template v-slot:footer>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="handleClose1">取消</el-button>
            <el-button type="primary" size="small" @click="submit1">确定</el-button>
          </el-col>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { addListItemApi, operatorList, channelListApi } from '@/api/task'
export default {
  name: '',
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        innerCode: '', // 设备编号
        desc: '', // 备注
        createType: 1, // 创建类型
        userId: 1, // 用户id
        productType: null, // 工单类型
        assignorId: '',
        details: []
      },
      options: [{
        value: 2,
        label: '补货工单'
      }],
      // 规则
      rules: {
        innerCode: [{ required: true, trigger: 'blur', message: '请输入' }],
        createType: [{ required: true, trigger: 'blur', message: '请选择' }],
        userName: [{ required: true, trigger: 'blur', message: '请选择' }],
        desc: [{ required: true, trigger: 'blur', message: '请输入' }]
      },
      operatorList: [], //
      dialogVisible1: false, // 补货详情对话框
      list1: [], // 补货详情列表
      addnum: {
        expectCapacity: '',
        skuName: '',
        addCapacity: ''
      }, // 可添加数量
      isChange: false,
      list2: []
    }
  },
  // computed: {
  //   details() {
  //     return this.list2.filter(ele => ele.sku !== null).map(ele => {
  //       if (this.isChange) {
  //         ele.skuImage = ele.sku?.skuImage
  //         delete ele.channelId
  //         delete ele.createTime
  //         delete ele.currentCapacity
  //         delete ele.innerCode
  //         delete ele.lastSupplyTime
  //         delete ele.maxCapacity
  //         delete ele.price
  //         delete ele.sku
  //         delete ele.updateTime
  //         delete ele.vmId
  //         delete ele.num
  //         delete ele.addCapacity
  //         return ele
  //       }
  //     })
  //   }
  // },
  watch: {},
  created() {
  },
  mounted() {

  },
  methods: {
    // 关闭对话框
    handleClose() {
      this.$emit('update:dialogVisible', false)
      // 重置表单
      this.$refs.form.resetFields()
      // 数据初始化
      this.form = {
        innerCode: '', // 设备编号
        desc: '', // 备注
        createType: 1, // 创建类型
        userId: 1, // 用户id
        productType: null, // 工单类型
        assignorId: ''
      }
      //
      // this.operatorList = []
    },
    // 关闭补货详情对话框
    handleClose1() {
      this.dialogVisible1 = false
      this.list1 = []
    },
    // 新增
    async submit() {
      try {
        // console.log(this.details1, 1111)
        // const details = this.details1
        // console.log(1)
        await addListItemApi(this.form)
        // console.log(res)
        this.isChange = false
        this.$message.success('新增工单成功')
        // 触发父组件重新刷新
        this.$emit('refresh')
        // 关闭弹窗
        this.handleClose()
      } catch (error) {
        this.$message.error(error.response.data)
      }
    },
    // 补货详情
    submit1() {
      this.isChange = true
      this.form.details = this.list2.filter(ele => ele.sku !== null).map(ele => {
        if (this.isChange) {
          ele.skuImage = ele.sku?.skuImage
          delete ele.channelId
          delete ele.createTime
          delete ele.currentCapacity
          delete ele.innerCode
          delete ele.lastSupplyTime
          delete ele.maxCapacity
          delete ele.price
          delete ele.sku
          delete ele.updateTime
          delete ele.vmId
          delete ele.num
          delete ele.addCapacity
          return ele
        }
      })
      this.handleClose1()
    },
    // 获取运营人员列表
    async getoperatorList() {
      try {
        if (this.form.innerCode) {
          const res = await operatorList(this.form.innerCode)
          this.operatorList = res.data
          // console.log(2)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 补货清单
    async channelList() {
      try {
        if (this.form.innerCode) {
          this.dialogVisible1 = true
          const res = await channelListApi(this.form.innerCode)
          // console.log(res)
          this.list1 = res.data
          // console.log(1)
          // console.log(this.list1, 123456)
          this.list1 = this.list1.map(ele => {
            if (ele.sku === null) {
              ele.currentCapacity = '-'
              this.addnum.skuName = '-'
              this.addnum.addCapacity = '-'
              return { ...ele, ...this.addnum }
            } else {
              this.addnum.addCapacity = ele.maxCapacity - ele.currentCapacity
              this.addnum.skuName = ele.sku?.skuName
              this.addnum.expectCapacity = this.addnum.addCapacity
              return { ...ele, ...this.addnum }
            }
          })
          this.list2 = this.list1
          // console.log(this.list2)
        }
      } catch (error) {
        console.log(error.response.data)
      }
    }

  }
}
</script>
<style scoped lang="scss">

</style>
