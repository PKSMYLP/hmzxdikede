<template>
  <div>
    <div class="header">
      <el-row :gutter="12">
        <el-col :span="12">
          <el-card shadow="hover" class="topbox-left">
            <div class="title">运营人员（当天）</div>
            <div class="body">
              <div class="stats">
                <div class="item">
                  <div class="num color1 text-shadow1">{{todayUserInfoList.total}}</div>
                  <div class="text color2">工单总数（个）</div>
                </div>
              </div>
              <div class="stats">
                <div class="item">
                  <div class="num color1 text-shadow1">{{todayUserInfoList.completedTotal}}</div>
                  <div class="text color2">完成工单（个）</div>
                </div>
              </div>
              <div class="stats">
                <div class="item">
                  <div class="num color1 text-shadow1">{{todayUserInfoList.cancelTotal}}</div>
                  <div class="text color2">拒绝工单（个）</div>
                </div>
              </div>
              <div class="stats">
                <div class="item">
                  <div class="num color1 text-shadow1">{{todayUserInfoList.workerCount}}</div>
                  <div class="text color2">运营人员数（个）</div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover" class="topbox-right">
            <div class="title">运维人员（当天）</div>
            <div class="body2">
              <div class="stats">
                <div class="item">
                  <div class="num color1 text-shadow2">{{todayUserInfoList1.total}}</div>
                  <div class="text color3">工单总数（个）</div>
                </div>
              </div>
              <div class="stats">
                <div class="item">
                  <div class="num color1 text-shadow2">{{todayUserInfoList1.completedTotal}}</div>
                  <div class="text color3">完成工单（个）</div>
                </div>
              </div>
              <div class="stats">
                <div class="item">
                  <div class="num color1 text-shadow2">{{todayUserInfoList1.cancelTotal}}</div>
                  <div class="text color3">拒绝工单（个）</div>
                </div>
              </div>
              <div class="stats">
                <div class="item">
                  <div class="num color1 text-shadow2">{{todayUserInfoList1.workerCount}}</div>
                  <div class="text color3">运营人员数（个）</div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="bottom">
      <el-row :gutter="12">
        <el-col :span="18">
          <el-card shadow="hover" class="bottom-left">
            <div class="title">
              <span>工单状态</span>
              <el-date-picker
                v-model="value"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
              >
              </el-date-picker>
            </div>
            <div class="empty">
              <img src="../../../assets/common/人员列表3.png" alt="" />
            </div>
            <div class="tips">暂无数据</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="bottom-right">
            <div class="title">
              人效排名（月度）
              <el-select
                v-model="value"
                style="width: 50%"
                placeholder="全部"
                size="small"
              >
                <el-option
                  v-for="item in regionList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
            <div class="empty">
              <img src="../../../assets/common/人员列表3.png" alt="" />
            </div>
            <div class="tips">暂无数据</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
//获取当天的开始与结束时间
import moment from "moment";
let startValue = moment().startOf("day").format("YYYY-MM-DD HH:mm:ss");
//console.log(startValue);
let endValue = moment().endOf("day").format("YYYY-MM-DD HH:mm:ss");
//console.log(endValue);
import { todayUserInfo } from "@/api/person";
import { regionNameList } from "@/api/region";
export default {
  name: "UserTaskStats",
  components: {},
  data() {
    return {
      todayUserInfoList:"",
      todayUserInfoList1:"",
      value: "",
      regionList: "",
      page: {
        pageIndex: 1, //当前页数
        pageSize: 100000,
        // name: "",
      },
      time: {
        start: startValue,
        end: endValue,
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.regionNameList();
    this.getTodayUserInfo();
  },
  methods: {
    async regionNameList() {
      const res = await regionNameList(this.page);
      this.regionList = res.data.currentPageRecords;
    },
    async getTodayUserInfo() {
      const res = await todayUserInfo(this.time);
      //console.log(res);
       this.todayUserInfoList= res.data[0]
      //console.log(todayUserInfoList);
       this.todayUserInfoList1= res.data[1]
      //console.log(todayUserInfoList1);
    },
  },
};
</script>
<style scoped>
.header {
  margin-top: 20px;
}
.title {
  -webkit-box-flex: 1;
  flex: 1;
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333;
}
.topbox-left {
  min-height: 166px;
  border-radius: 20px;
}
.topbox-left {
  background-color: #e9f3ff;
  background-repeat: no-repeat, no-repeat;
  background-position: 0 0, calc(100% - 12px) 100%;
  background-image: url("../../../assets/common/人员列表1.png"),
    url("../../../assets/common/人员列表11.png");
}
.topbox-right {
  min-height: 166px;
  border-radius: 20px;
}
.topbox-right {
  background: #fbefe8 url("../../../assets/common/人员列表2.png") no-repeat
    calc(100% - 12px) 100%;
}
.bottom {
  margin-top: 20px;
}
.bottom-left {
  min-height: 542px;
  border-radius: 20px;
}
.bottom-right {
  min-height: 542px;
  border-radius: 20px;
}
.el-range-editor.el-input__inner {
  margin-left: 400px;
}

.text-shadow1 {
  height: 50px;
  font-size: 36px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  line-height: 50px;
  text-shadow: 2px 4px 7px rgba(85, 132, 255, 0.5);
}
.color2 {
  height: 17px;
  margin-top: 3px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #91a7dc;
  line-height: 17px;
}
.body {
  display: flex;
  flex: 1;
  justify-content: space-around;
  margin-top: 10px;
}

.text-shadow2 {
  height: 50px;
  font-size: 36px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  line-height: 50px;
  color: #ff5757;
  text-shadow: 2px 4px 7px rgba(255, 99, 85, 0.5);
}
.color3 {
  height: 17px;
  margin-top: 3px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ff5757;
  line-height: 17px;
}
.body2 {
  display: flex;
  flex: 1;
  justify-content: space-around;
  margin-top: 10px;
}
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  margin-top: 150px;
}
.tips {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
  