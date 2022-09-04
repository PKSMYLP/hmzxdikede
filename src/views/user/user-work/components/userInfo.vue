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
      <div style="width: 579px; margin: 0px auto">
        <div class="user-work el-row">
          <div class="item el-col el-col-5">日期</div>
          <div class="item el-col el-col-5">总工单数</div>
          <div class="item el-col el-col-5">拒绝工单</div>
          <div class="item el-col el-col-5">完成工单</div>
          <div class="item el-col el-col-5">进行中工单</div>
        </div>
        <div class="user-work el-row">
          <div class="item el-col el-col-5">本周</div>
          <div class="item el-col el-col-5">{{ weekInfo.total }}</div>
          <div class="item el-col el-col-5">{{ weekInfo.cancelCount }}</div>
          <div class="item el-col el-col-5">{{ weekInfo.workCount }}</div>
          <div class="item el-col el-col-5">{{ weekInfo.progressTotal }}</div>
        </div>
        <div class="user-work el-row">
          <div class="item el-col el-col-5">本月</div>
          <div class="item el-col el-col-5">{{ monthInfo.total }}</div>
          <div class="item el-col el-col-5">{{ monthInfo.cancelCount }}</div>
          <div class="item el-col el-col-5">{{ monthInfo.workCount }}</div>
          <div class="item el-col el-col-5">{{ monthInfo.progressTotal }}</div>
        </div>
        <div class="user-work el-row">
          <div class="item el-col el-col-5">本年</div>
          <div class="item el-col el-col-5">{{ yearInfo.total }}</div>
          <div class="item el-col el-col-5">{{ yearInfo.cancelCount }}</div>
          <div class="item el-col el-col-5">{{ yearInfo.workCount }}</div>
          <div class="item el-col el-col-5">{{ yearInfo.progressTotal }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//获取本周的开始与结束时间
import moment from "moment";
let startValue = moment().startOf("week").format("YYYY-MM-DD HH:mm:ss");
//console.log(startValue);
let endValue = moment().endOf("week").format("YYYY-MM-DD HH:mm:ss");
//console.log(endValue);
//获取本月的开始与结束时间
let startValue2 = moment().startOf("month").format("YYYY-MM-DD HH:mm:ss");
//console.log(startValue2);
let endValue2 = moment().endOf("month").format("YYYY-MM-DD HH:mm:ss");
//console.log(endValue2);
//获取本月的开始与结束时间
let startValue3 = moment().startOf("year").format("YYYY-MM-DD HH:mm:ss");
//console.log(startValue3);
let endValue3 = moment().endOf("year").format("YYYY-MM-DD HH:mm:ss");
//console.log(endValue3);
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
      userInfoList: {},
      weekInfo: [],
      monthInfo: [],
      yearInfo: [],
      // 获取本周的工单数据
      page: {
        userId: "",
        start: startValue,
        end: endValue,
      },
      // 获取本月的工单数据
      page2: {
        userId: "",
        start: startValue2,
        end: endValue2,
      },
      // 获取今年的工单数据
      page3: {
        userId: "",
        start: startValue3,
        end: endValue3,
      },
    };
  },
  created() {
    // this.getUserInfo();
  },
  methods: {
    handleClose() {
      this.$emit("update:showDialog", false);
    },
    async getUserInfo(id) {
      try {
        // console.log(id,222);
        const res = await userInfo(id);
        // console.log(id, 222);
        // console.log(res, 1111);
        this.userInfoList = res.data;
        //console.log(this.userInfoList);
        this.page.userId = this.userInfoList.userId;
        this.page2.userId = this.userInfoList.userId;
        this.page3.userId = this.userInfoList.userId;
        // console.log(this.userId, 11111111);
        // console.log(this.page, 11111);
        // 获取本周的工单数据
        const weekdata = await userWorkTotal(this.page);
        this.weekInfo = weekdata.data;
        //console.log(this.weekInfo);
        // 获取本月的工单数据
        const monthdata = await userWorkTotal(this.page2);
        this.monthInfo = monthdata.data;
        //console.log(this.monthInfo);
        // 获取今年的工单数据
        const yeardata = await userWorkTotal(this.page3);
        this.yearInfo = yeardata.data;
        //console.log(this.yearInfo);
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

.user-work .item {
  line-height: 40px;
  border: 1px solid #d8dde3;
  text-align: center;
}
.el-col-5 {
  width: 20%;
}
</style>