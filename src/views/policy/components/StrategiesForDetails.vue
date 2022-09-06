<template>
  <el-dialog
    title="策略详情"
    :visible.sync="strategiesfordetails"
    width="40%"
    :before-close="handleClose"
  >
    <el-form ref="strategies" label-width="120px">
      <el-form-item label="策略名称:">
        <span>{{ policyName }}</span>
      </el-form-item>
      <el-form-item label="策略方案:">
        <el-table
          :data="policyData"
          style="width: 100%"
        >
          <el-table-column
            height="20px"
            type="index"
            label="序号"
            width="100"
          />
          <el-table-column
            height="20px"
            prop="nodeName"
            label="点位名称"
            width="200"
          />
          <el-table-column
            height="20px"

            prop="innerCode"
            label="设备编号"
            width="200"
          />
        </el-table>
      </el-form-item>
    </el-form>
    <MyPage
      :total="policpage.totalCount"
      :current-page="policpage.pageIndex"
      :page-size="policpage.pageSize"
      @changePage="changePage"
    />
  </el-dialog>
</template>
<script>
import MyPage from '@/components/myPage/index.vue'
export default {
  components: { MyPage },
  props: {
    strategiesfordetails: {
      type: Boolean,
      default: false
    },
    policyData: {
      type: Array,
      default: () => []
    },
    policpage: {
      type: Object,
      default: () => {}
    },
    policyName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClose() {
      this.$parent.strategiesfordetails = false
    },
    changePage(val) {
      this.policpage.pageIndex = val
      this.$parent.getPolicy()
    }
  }
}

</script>
  <style lang="scss" scoped>
    :v-deep(.el-table td, .el-table th){
    padding:none !important
    }
  </style>

