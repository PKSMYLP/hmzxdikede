<template>

  <div class="pagination-container">
    <div class="myPagination">
      <div class="total">
        共{{ total }}条记录  第 {{ currentPage }}/{{ totalPage }} 页
      </div>
      <div>
        <button :disabled="currentPage<=1" @click="handlePre">上一页</button>
        <button :disabled="currentPage >= totalPage" @click="handleNext">下一页</button>
      </div>
    </div>
  </div>

</template>
<script>
// 需求：完成分页组件的封装
// 分析组件需要的功能
// 1. 可以显示 数据总数
// 2. 可以显示 当前处于第几页
// 3. 每页可以放下多少条数据 pageSize
// 4. 根据总数 和 pageSize 确定总共有多少页
// 5. 点击上一页和下一页
// 6. 上一页 上一页按钮 当当前页 小于等于1时 按钮变成不可点击
// 7. 下一页 上一页按钮 当当前页 大于等于最后一页时 按钮变成不可点击
export default {
  name: 'MyPagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  methods: {
    handlePre() {
      console.log(111)
      this.$emit('changePage', this.currentPage - 1)
    },
    handleNext() {
      console.log('xxx')
      this.$emit('changePage', this.currentPage + 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container{
  background: #fff;
  padding: 32px 16px;
  .myPagination {
  display: flex;
  justify-content:space-between;
  font-size: 16px;
  padding: 0;
  button {
    width: 70px;
    margin: 0 16px;
    border-radius: 2px;
    background-color: #d5ddf8;
    outline: none;
    border:none;
    color: #606266;
    height: 32px;
    line-height:32px;
  }
  button:disabled {
    background: #edf0f9;
    color: #d8dde3;
    cursor: no-drop;
  }
  .total {
    margin-right: 10px;
    font-weight: 400;
    color: #dbdfe5;
    height: 32px;
    line-height:32px;
  }
}
}

</style>
