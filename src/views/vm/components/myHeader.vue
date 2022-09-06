<template>
  <el-card class="box-card">
    <el-row type="flex" align="middle">

      <!-- 定义前面得插槽 -->
      <!-- <slot name="before" /> -->
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item :label="`${shwoSearch ? '型号搜索' : '设备编号'}`" prop="taskCode">
          <el-input v-model="form.taskCode" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="status">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </el-row>
  </el-card>
</template>

<script>

export default {
  name: 'MyHeader',
  components: {},
  props: {
    allTaskStatusList: {
      type: Array,
      default: () => []
    },
    shwoSearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

      form: {
        taskCode: '',
        status: ''
      }
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.form)
    }
  }

}
</script>
<style scoped lang="scss">
.box-card {
  width: 100%;
}
::v-deep .el-card__body {
  padding: 10px;
}
.el-form-item {
  margin-bottom: 0;
}
</style>
