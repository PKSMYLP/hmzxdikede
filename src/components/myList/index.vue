<template>
  <el-card class="box-card">
    <el-row>
      <div style="margin-bottom: 20px">
        <!-- 新增按钮 -->
        <el-button type="warning" icon="el-icon-circle-plus-outline">新建</el-button>
        <!-- 后面的插槽 -->
        <slot name="after" />
      </div>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="date"
          label="序号"
          width="60"
        />
        <el-table-column
          prop="name"
          label="工单编号"
          width="140"
        />
        <el-table-column
          prop="province"
          label="设备编号"
          width="140"
        />
        <el-table-column
          prop="city"
          label="工单类型"
          width="140"
        />
        <el-table-column
          prop="address"
          label="工单方式"
          width="140"
        />
        <el-table-column
          prop="zip"
          label="工单状态"
          width="140"
        />
        <el-table-column
          fixed="right"
          label="运维人员"
          width="140"
        />
        <el-table-column
          fixed="right"
          label="创建日期"
          width="140"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="90"
        />
      </el-table>
    </el-row>
    <myPagination />
  </el-card>
</template>

<script>
import myPagination from '../myPagination'
export default {
  name: '',
  components: { myPagination },
  data() {
    return {
      tableData: []
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style scoped lang="scss">

::v-deep.el-table th.is-leaf {
    border-bottom: 0;
}
// 列表表头颜色
 ::v-deep.el-table th, .el-table tr {
  background-color:#f3f6fb
 }
</style>
