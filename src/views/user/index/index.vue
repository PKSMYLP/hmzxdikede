<template>
  <div>
    <!-- 头顶搜索栏 -->
    <el-card class="header" >
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="人员搜索：">
      <el-input  v-model="input" type="text" clearable  placeholder="请输入" ></el-input>
      </el-form-item>  
       <el-form-item>
      <el-button size="medium" style="background-color: #5f84ff;color:#fff" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>  
      </el-form>
    </el-card>
    <!-- 人员列表栏 -->
    <el-card class="main">
      <el-row>
         <el-button size="medium" style="background: linear-gradient(135deg,#ff9743,#ff5e20);color:#fff;margin-bottom:10px" icon="el-icon-circle-plus-outline">新建</el-button>
         <el-table border :data="list" v-loading="loading">
        <el-table-column label="序号" sortable="" width="100" type="index"  />
        <el-table-column label="人员名称" prop="userName" />
        <el-table-column label="归属区域" prop="regionName" />
        <el-table-column label="角色" prop="role.roleName" />
        <el-table-column label="联系电话" prop="mobile" />
        <el-table-column label="操作" fixed="right" width="280">
          <template>
            <el-button type="text" size="medium">修改</el-button>
            <el-button type="text" size="medium" style="color: red">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </el-row>
       <!-- 分页组件 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination 
        layout="total,prev,pager,next,sizes"
        v-if='total>0'
        :current-page.sync="page.pageIndex"
        :page-size.sync="page.pageSize"
        :page-sizes="[5,10,20,30]"
        background
        :total="total"
        @current-change="getEmployeeList"
        @size-change="getEmployeeList"
         />
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {getEmployeeList} from "@/api/person"
export default {
  name: 'Index',
  components: {},
  data() {
    return {
      input: '',
      loading: false,
        list: [],
        total: 0,
      page: {
        pageIndex: 1,//当前页数
        pageSize: 10
      },
    }
  },
  computed: {},
  watch: {},
  created() {
      this.getEmployeeList()
  },
  mounted() {

  },
  methods: {
    onSubmit() {
      console.log(1);
    },
    async getEmployeeList() {
      try {
        this.loading = true;
        const res = await getEmployeeList(this.page)
        console.log(res);
        this.list = res.data.currentPageRecords
        //console.log(this.list);
      
        this.total=res.data.totalCount
        //console.log(this.total);
        //将字符串转换成数字
        this.total = parseInt(this.total);
        //console.log(this.total);

        if (this.total !== 0 && res.length === 0) {
        this.page.pageIndex = this.page.pageIndex -1
        this.getEmployeeList()
      }
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style scoped>
 .header {
  height: 80px;
 }
 .main {
  margin-top:20px
 }
 :deep(.el-table .cell) {
  text-align: center;
 }
</style>
