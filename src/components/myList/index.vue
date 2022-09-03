<template>
  <el-card class="box-card">
    <el-row>
      <div style="margin-bottom: 20px">
        <!-- 后面的插槽 -->
        <slot name="after" />
      </div>
      <!-- 表格 -->
      <slot name="table" />
    </el-row>
    <!-- 分页组件 -->
    <slot name="myPagination" />
  </el-card>
</template>

<script>

export default {
  name: '',
  components: {},
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
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
</style>
