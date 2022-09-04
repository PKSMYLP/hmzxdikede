<template>
  <div>
    <!-- 头顶搜索栏 -->
    <el-card class="header">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="人员搜索：">
          <el-input
            focus
            v-model="page.userName"
            type="text"
            clearable
            placeholder="请输入"
            @keyup.enter.native="onSubmit()"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="medium"
            type="primary"
            icon="el-icon-search"
            @click="onSubmit()"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 人员列表栏 -->
    <el-card class="main">
      <el-row>
        <el-button
          size="medium"
          type="warning"
          style="margin-bottom: 10px"
          icon="el-icon-circle-plus-outline"
          @click="addFn"
          >新建</el-button
        >
        <el-table
          border
          :data="list"
          v-loading="loading"
          :header-cell-style="{
            'text-align': 'center',
            'background-color': '#eff3f6',
          }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column label="序号" sortable="" width="100" type="index" />
          <el-table-column label="人员名称" prop="userName" />
          <el-table-column label="归属区域" prop="regionName" />
          <el-table-column label="角色" prop="role.roleName" />
          <el-table-column label="联系电话" prop="mobile" />
          <el-table-column label="操作" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="medium" @click="edit(row)"
                >修改</el-button
              >
              <el-button
                type="text"
                size="medium"
                style="color: red"
                @click="delEmployee(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination
          layout="total,prev,pager,next,sizes"
          v-if="total > 0"
          :current-page.sync="page.pageIndex"
          :page-size.sync="page.pageSize"
          :page-sizes="[5, 10, 20, 30]"
          background
          :total="total"
          @current-change="getEmployeeList"
          @size-change="getEmployeeList"
        />
      </el-row>
    </el-card>
    <!-- 新建弹窗 -->
    <AddEmployer
      ref="AddEmployer"
      :show-dialog.sync="showDialog"
      @refsher="getEmployeeList"
    />
  </div>
</template>

<script>
import AddEmployer from "./components/addEmployer.vue";
import { getEmployeeList, removeEmployee } from "@/api/person";
export default {
  name: "Index",
  components: {},
  data() {
    return {
      showDialog: false,
      loading: false,
      list: [],
      total: 0,
      page: {
        pageIndex: 1, //当前页数
        pageSize: 10,
        userName: "",
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getEmployeeList();
  },
  mounted() {},
  components: { AddEmployer },
  methods: {
    // 搜索
    onSubmit() {
      //添加非空校验
      // if (this.keywords.trim().length == '') {
      //   this.keywords = ''
      //   return this.$message.warning('请输入关键字')
      // }
      this.getEmployeeList(this.page);
    },
    async getEmployeeList() {
      try {
        this.loading = true;
        const res = await getEmployeeList(this.page);
        //console.log(res);
        this.list = res.data.currentPageRecords;
        //console.log(this.list);
        //搜索结果列表
        this.searchList = this.list;
        //console.log(this.searchList);

        this.total = res.data.totalCount;
        //console.log(this.total);
        //将字符串转换成数字
        this.total = parseInt(this.total);
        //console.log(this.total);

        if (this.total !== 0 && res.length === 0) {
          this.page.pageIndex = this.page.pageIndex - 1;
          this.getEmployeeList();
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    // 新增
    addFn() {
      this.showDialog = true;
    },
    // 编辑
    edit(row) {
      this.showDialog = true;
      //浅拷贝
      this.$refs.AddEmployer.formData = { ...row };
    },
    // 删除
    async delEmployee(id) {
      try {
        await this.$confirm("您确定要删除该员工么？", "提示", {
          type: "warning",
        });
        await removeEmployee(id);
        this.getEmployeeList();
        this.$message.success("删除员工成功");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style scoped>
.header {
  height: 80px;
}
.main {
  margin-top: 20px;
}
.el-button--primary:hover {
  background-color: #5f84ff;
}

.el-button--warning:hover {
  background-color: #ff5e20;
}
</style>
