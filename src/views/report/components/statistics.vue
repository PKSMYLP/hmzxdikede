<template>
  <div>
    <el-row type="flex" justify="center" align="center">
      <el-col>
        <div class="datestatistics">
          <img class="dateimg" src="@/assets/image/日统计图片1.png">
          <img class="dateimg2" src="@/assets/image/日统计图片2.png">
          <p class="title">日销售统计</p>
          <el-row class="statistics" type="flex" align="center">
            <el-col>
              <p class="dataNbumber">{{ dateData.orderCount }}</p>
              <span>当日销售量（个）</span>
            </el-col>
            <el-col>
              <p class="dataNbumber">{{ dateData.orderAmount/100 }}</p>
              <span>当日销售额（元）</span>
            </el-col>
            <el-col>
              <p class="dataNbumber">{{ dateData.totalBill/100 }}</p>
              <span>当日分成（元）</span>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col><div class="datestatisticstwo">
        <img class="dateimg2" src="@/assets/image/日统计图片3.png">
        <p class="title">月销售统计</p>
        <el-row class="statistics" type="flex" align="center">
          <el-col class="dataHight">
            <p class="dataNbumber">{{ monthData.orderCount }}</p>
            <span>当月销售量（个）</span>
          </el-col>
          <el-col>
            <p class="dataNbumber">{{ monthData.orderAmount/100 }}</p>
            <span>当月销售额（元）</span>
          </el-col>
          <el-col>
            <p class="dataNbumber">{{ monthData.totalBill/100 }}</p>
            <span>当月分成（元）</span>
          </el-col>
        </el-row>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    monthData: {
      type: Object,
      default: () => [{}]
    },
    dateData: {
      type: Object,
      default: () => [{}]
    }
  }
}
</script>

  <style scoped>
    .el-col-24{
      margin-left: 10px;
    }
  .datestatistics {
    height: 200px;
    position: relative;
    padding-left:10px ;
    margin-top: 20px;
    background: #e9f3ff;
    background-position: 0 0,calc(100% - 12px) 100%;
    border-radius: 30px;
    overflow: hidden;
  }
  .datestatisticstwo{
    height: 200px;
    position: relative;
    padding-left:10px ;
    margin-top: 20px;
    background: #fbefe8;
    background-position: 0 0,calc(100% - 12px) 100%;
    border-radius: 30px;
    overflow: hidden;
  }
  .statistics{
    text-align: center;
  }
  .dateimg{
    position: absolute;
    left: 0;
    width:200px;

  }
  .dateimg2{
    position: absolute;
    right: 10px;
    bottom: 0;
    width:100px
  }
  .title{
      font-weight: 600;
      color: #333;
      font-size: 16px;
      padding-left: 10px;
  }
  .dataNbumber{
    height:20px;
    font-size: 36px;
      text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
      font-weight: 600;
      line-height: 50px;
  }
  .statistics span {
   font-size: 12px;
   text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
  }
  </style>

