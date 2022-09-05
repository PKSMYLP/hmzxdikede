<template>
  <div>
    <el-table style="width: 100%" :data="areaList">
      <el-table-column type="index" label="序号" />
      <el-table-column v-if="isShow" prop="skuName" label="商品名称" />
      <el-table-column v-if="isShow" prop="" label="商品图片">
        <template slot-scope="{row}">
          <img :src="row.skuImage" alt="" style="width:24px">
        </template>
      </el-table-column>
      <el-table-column v-for="(item,index) in thead" v-show="!isShow" :key="index" :prop="item.props" :label="item.label" />
      <el-table-column v-if="isDone" prop="address" label="操作" :width="width">
        <template slot-scope="{row}">
          <slot name="reset" :row="row" />
          <slot name="detail" :row="row" />
          <slot name="amend" :row="row" />
          <slot name="del" :row="row" />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div v-show="totalCount > 10 " class="page">
      <div>
        <span>共{{ totalCount }}条记录</span>
        <span> 第{{ pageIndex }}/{{ totalPage }}页</span>
      </div>
      <div>
        <el-button :disabled="pageIndex == 1" size="small" @click="changePage(0)">上一页</el-button>
        <el-button :disabled="pageIndex == totalPage" size="small" @click="changePage(1)">下一页</el-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'AreaTabel',
  props: {
    thead: { // 标头
      type: Array,
      default: () => []
    },
    areaList: { // 列表数据
      type: Array,
      default: () => []
    },
    // isDone: { // 是否有操作这个列表
    //   type: String,
    //   default: '操作'
    // },
    isDone: {
      type: Boolean,
      default: true
    },
    totalCount: { // 总数
      type: [String, Number],
      default: 0
    },
    pageIndex: {
      type: [String, Number],
      default: 1
    },
    totalPage: {
      type: [String, Number],
      default: 1
    },
    width: {
      type: String,
      default: '250'
    },
    isShow: {
      type: Boolean,
      default: false
    }

  },
  methods: {
    changePage(val) {
      console.log(val)
      this.$emit('paging', val)
    }
  }
}
</script>

<style scoped lang="scss">
.tableBtn {
  display: flex;
  margin-bottom: 20px;
  width: 80px;
  height: 36px;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
}

.page {
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 16px !important;
    color: #dbdfe5 !important;
  }

  .el-button {
    background-color: #d5ddf8;
  }
}
</style>
