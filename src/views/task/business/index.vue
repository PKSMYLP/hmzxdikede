<template>
  <div>
    <myHeader>
      <template slot="before">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="工单编号:">
            <el-input v-model="formInline.user" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="工单状态:">
            <el-select v-model="formInline.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-form>
      </template>

    </myHeader>
    <myPagination />
  </div>
</template>

<script>
import myHeader from '@/components/myHeader'
import myPagination from '@/components/myPagination'
export default {
  name: 'Business',
  components: { myPagination, myHeader },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
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
      console.log('submit!')
    }
  }
}
</script>
<style scoped>
  .el-form-item{
    margin-bottom: 0;
  }
</style>
