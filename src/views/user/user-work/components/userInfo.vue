<template>
  <div>
    <el-dialog
      title="人员详情"
      :visible="showDialog"
      :before-close="handleClose"
      width="40%"
    >
      <div class="top">
        <span>人员名称：{{ userInfoList.userName }}</span>
        <span>角色：{{ userInfoList.roleName }}</span>
        <span>联系电话:{{ userInfoList.mobile }}</span>
        <span>负责区域：{{ userInfoList.regionName }}</span>
      </div>
      <el-table
        border
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'd8dde3',
        }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column />
        <el-table-column label="总工单数" />
        <el-table-column label="拒绝工单" />
        <el-table-column label="完成工单" />
        <el-table-column label="进行中工单" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { userInfo, userWorkTotal } from "@/api/person";
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userInfoList: [],
      weekInfo: [],
      week: {
        userId: "",
        start: "2020-10-01 00:00:00	",
        end: "2020-10-31 00:00:00	",
      },
    };
  },
  methods: {
    handleClose() {
      this.$emit("update:showDialog", false);
    },
    async getUserInfo(id) {
      try {
        const res = await userInfo(id);
        //console.log(res);
        this.userInfoList = res.data;
        this.userId = res.data.userId;
        console.log(this.userId);
        //console.log(this.userInfoList);
        const weekInfo = await userWorkTotal(this.week);
        console.log(weekInfo);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.top {
  background-color: #f3f6fb;
  height: 86px;
  line-height: 86px;
}
span {
  padding: 0 8px;
}
.el-row:after,
.el-row:before {
  display: table;
  content: "";
}
</style>