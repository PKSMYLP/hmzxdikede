<template>
  <div>
    <search-time ref="search" :showcomments="orderShow" :time="time" @searchProlicy="searchProlicy" />
    <el-card>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
        />
        <el-table-column
          prop="orderNo"
          label="订单编号"
          width="300"
        />
        <el-table-column
          prop="skuName"
          label="商品名称"
          width="240"
        />
        <el-table-column
          prop="price"
          label="订单金额(元)"
          width="200"
        >
          <template slot-scope="scope">
            {{ tableData[scope.$index].price.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="innerCode"
          label="设备编号"
          width="200"
        />
        <el-table-column
          prop="payStatus"
          label="订单状态"
          width="150"
        >
          <template slot-scope="scope">
            {{ tableData[scope.$index].payStatus === 0 ? '未支付' : '出货成功' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="订单日期"
          width="300"
        >
          <template slot-scope="scope">
            {{ tableData[scope.$index].createTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button @click="details(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <MyPage
        :total="totalCount"
        :current-page="page.pageIndex"
        :page-size="page.pageSize"
        @changePage="changePage"
      />
      <Details :order-list="orderList" :dialog-visible="dialogVisible" @close="closeDetails" />
    </el-card></div>
</template>
<script>
import SearchTime from './components/searchTime.vue'
import { orderSearch } from '@/api/order'
import MyPage from '@/components/myPage/index.vue'
import Details from './components/details.vue'
export default {
  name: '',
  components: { SearchTime, MyPage, Details },
  data() {
    return {
      tableData: [],
      search: [],
      totalCount: '0',
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      orderList: {},
      dialogVisible: false,
      orderShow: 'order',
      time: {}
    }
  },
  computed: {

  },
  watch: {},
  created() {
    this.getOrder()
  },
  mounted() {
    // await this.$parent.orderSearch(this.searchs)
  },
  methods: {
    async getOrder() {
      try {
        const { data } = await orderSearch(this.page)
        this.tableData = data.currentPageRecords
        this.totalCount = data.totalCount
      } catch (e) {
        console.log(e)
      }
    },
    async orderSearch(val) {
      try {
        console.log(val)
        const { data } = await orderSearch(val)
        this.tableData = data.currentPageRecords
        // console.log(this.tableData, '===')
        this.totalCount = data.totalCount
      } catch (e) {
        console.log(e)
      }
    },
    changePage(val) {
      this.page.pageIndex = val
      this.getOrder()
    },
    details(row) {
      this.orderList = row
      this.dialogVisible = true
    },
    closeDetails(val) {
      this.dialogVisible = val
    },
    searchProlicy(val) {
      this.orderSearch(val)
    }
  }
}
</script>
  <style >
    body{
    background-color: #f8fafd;
  }
  .el-table th {
    background: #f3f6fb !important;
  }
  .el-table td, .el-table th{
     border-bottom: none !important
     }
     .el-button{
      border: none;
     }
  </style>
  <style scoped>
     .el-button{
      color: #678cff !important;
     }
  </style>

