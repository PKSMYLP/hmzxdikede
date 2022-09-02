<template>
  <!-- 补货详情 -->
  <el-dialog
    title="补货详情"
    :visible="dialogVisibleDetail"
    width="45%"
    height="60%"
    :before-close="handleClose"
  >
    <el-table
      :data="list2"
      style="width: 100%; "
      max-height="330"
    >
      <el-table-column
        prop="channelCode"
        label="货道编号"
        width="200"
      />
      <el-table-column
        prop="skuName"
        label="商品"
        width="200"
      />
      <el-table-column
        prop="expectCapacity"
        label="补货数量"
        width="200"
      />
    </el-table>

  </el-dialog>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    dialogVisibleDetail: {
      type: Boolean,
      default: false
    },
    list2: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {

  },
  methods: {
    handleClose() {
      this.$parent.dialogVisibleDetail = false
    }
  }
}
</script>
<style scoped>

</style>
