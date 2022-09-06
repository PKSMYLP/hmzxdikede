<template>
  <div>
    <el-card shadow="naver">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="策略搜索：">
          <el-input v-model="search" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchProlicy">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card></div>
</template>

<script>
export default {

  data() {
    return {
      search: ''
    }
  },
  methods: {
    searchProlicy() {
      this.$emit('searchProlicy', this.search)
    }
  }
}
</script>

  <style scoped>
  .el-card{
    margin-top: 20px;
    height: 80px;
    text-align: left;
  }
  .el-form-item{
      margin-bottom: 0;
    }
  </style>

