<template>
  <el-dialog
    title="订单详情"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose"
  >
    <div v-if="orderList.payStatus === 0" class="order-status">
      <img src="@/assets/image/未支付1.png" alt="">
      <i>未支付</i>
      <img src="@/assets/image/未支付2.png">
    </div>
    <div v-else class="order-status">
      <img src="@/assets/image/支付成功1.png" alt="">
      <i>出货成功</i>
      <img src="@/assets/image/支付成功2.png">
    </div>
    <el-form
      :inline="true"
      :model="orderList"
      class="demo-form-inline"
    >
      <el-row :gutter="20" type="flex" justify="start" align="center">
        <el-col :span="12">
          <el-form-item label="订单编号:">
            {{ orderList.orderNo }}
          </el-form-item></el-col>
        <el-col :span="8">
          <el-form-item label="商品名称:">
            {{ orderList.skuName }}
          </el-form-item></el-col>
      </el-row>
      <el-row :gutter="20" type="flex" justify="start" align="center">
        <el-col :span="12">
          <el-form-item label="订单金额:">
            {{ Number(orderList.price).toFixed(2) }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备编号:">
            {{ orderList.innerCode }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" justify="start" align="center">
        <el-col :span="12">
          <el-form-item label="创建时间:">
            {{ orderList.createTime | formatDate }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="完成时间:">
            {{ orderList.updateTime | formatDate }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" justify="start" align="center">
        <el-col :span="12">
          <el-form-item label="支付方式:">
            {{ orderList.payType == 1 ? '支付宝' : '微信支付' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备地址:" prop="addr">
            {{ orderList.addr }}
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    orderList: {
      type: Object,
      default: () => [{}]
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  created() {
    console.log(this.tableData)
  },
  methods: {
    handleClose() {
      this.$emit('close', false)
    }
  }
}
</script>

  <style scoped>
  .order-status{
      padding-left: 30px;
      padding-right: 70px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 54px;
      margin-bottom: 30px;
      background-color: hsla(0,0%,92.5%,.39);
  }
  .el-form-item__content {
    width: 140px ;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
  </style>
  <style scoped>

  </style>

