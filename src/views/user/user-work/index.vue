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
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色：">
          <el-select placeholder="请选择角色" v-model="page.roleId">
            <el-option
              v-for="item in rolesList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
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
        <el-table
          border
          :data="userWorkList"
          v-loading="loading"
          :header-cell-style="{
            'text-align': 'center',
            'background-color': '#eff3f6',
          }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column label="序号" sortable="" width="100" type="index" />
          <el-table-column label="人员名称" prop="userName" />
          <el-table-column label="角色" prop="roleName" />
          <el-table-column label="联系电话" prop="mobile" />
          <el-table-column label="完成工单（本月）" prop="workCount" />
          <el-table-column label="进行中工单" prop="progressTotal" />
          <el-table-column label="拒绝工单（本月）" prop="cancelCount" />
          <el-table-column label="操作" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="medium" @click="checkInfo(row)"
                >查看详情</el-button
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
          @current-change="getSearchUserWork"
          @size-change="getSearchUserWork"
        />
      </el-row>
    </el-card>
    <!-- 弹窗信息 -->
    <userInfo ref="userInfo" :show-dialog.sync="showDialog" />
  </div>
</template>

<script>
import { searchUserWork, getRolesList } from "@/api/person";
import userInfo from "./components/userInfo.vue";
export default {
  name: "UserWork",
  components: { userInfo },
  data() {
    return {
      id: "",
      showDialog: false,
      total: 0,
      loading: false,
      userWorkList: [],
      rolesList: "",
      page: {
        pageIndex: 1, //当前页数
        pageSize: 10,
        userName: "",
        roleId: "",
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getRolesList();
    this.getSearchUserWork();
  },
  methods: {
    //获取角色信息
    async getRolesList() {
      const res = await getRolesList();
      //console.log(res);
      this.rolesList = res.data;
      //console.log(this.rolesList);
    },
    //查询列表
    onSubmit() {
      this.getSearchUserWork(this.page);
    },
    //获取工作量列表
    async getSearchUserWork() {
      try {
        this.loading = true;
        const res = await searchUserWork(this.page);
        //console.log(res);
        this.userWorkList = res.data.currentPageRecords;
        //console.log(this.userWorkList);
        this.total = res.data.totalCount;
        this.total = parseInt(this.total);
        if (this.total !== 0 && res.length === 0) {
          this.page.pageIndex = this.page.pageIndex - 1;
          this.getSearchUserWork();
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    //打开弹窗
    async checkInfo(row) {
      this.showDialog = true;
      // console.log(row,111);
      // console.log(typeof(row.userId));
      // this.id = row.userId;
      // console.log(this.id);
      // console.log(typeof(this.id));
      await this.$refs.userInfo.getUserInfo(row.userId);
      // console.log(row.userId,457);
      // console.log(row);
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
</style>
