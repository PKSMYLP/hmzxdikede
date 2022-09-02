<template>
<div>
  <div class="header">
    <el-row :gutter="12">
  <el-col :span="12">
    <el-card shadow="hover" class="topbox-left">
      <div class="title">运营人员（当天）</div>
    </el-card>
  </el-col>
  <el-col :span="12">
    <el-card shadow="hover" class="topbox-right">
      <div class="title">运维人员（当天）</div>
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
              :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
      </div>
    </el-card>
  </el-col>
  <el-col :span="6">
    <el-card shadow="hover" class="bottom-right">
      <div class="title">人效排名（月度）</div>
    </el-card>
  </el-col>
</el-row>
  </div>
</div>
</template>

<script>
export default {
  name: 'UserTaskStats',
  components: {},
  data() {
    return {
      value: ''
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
<style scoped>
.header {
  margin-top: 20px;
}
.title {
    -webkit-box-flex: 1;
    flex: 1;
    font-size: 16px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    color: #333;
}
.topbox-left {
  min-height: 166px;
  border-radius: 20px;
}
.topbox-left{
  background-color: #e9f3ff;
  background-repeat: no-repeat,no-repeat;
  background-position: 0 0,calc(100% - 12px) 100%;
  background-image:url('../../../assets/common/人员列表1.png'),url('../../../assets/common/人员列表11.png')
}
.topbox-right {
  min-height: 166px;
  border-radius: 20px;
}
.topbox-right{
  background: #fbefe8 url('../../../assets/common/人员列表2.png') no-repeat calc(100% - 12px) 100%;
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


</style>
  