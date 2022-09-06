template<template>
  <div>
    <statistics :month-data="monthData" :date-data="dateData" />
    <search-time ref="searchTime" :showcomments="reportShow" :time="time" @searchProlicy="searchProlicy" />
    <el-card>
      <div class="statistics">
        <span>笔数统计:</span>
        <i>{{ monthData.orderCount }}</i>
        <span>个</span>
        <span>收入统计:</span>
        <i>{{ monthData.orderAmount }}</i>
        <span>元</span>
        <span>分成统计:</span>
        <i>{{ monthData.totalBill }}</i>
        <span>元</span>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="订单日期"
          width="180"
        >
          <template slot-scope="scope">
            {{ scope.row.date | formatDates }}
          </template>
        </el-table-column>

        <el-table-column
          prop="ownerName"
          label="合作商"
          width="180"
        />
        <el-table-column
          prop="ratio"
          label="分成比例"
        >
          <template slot-scope="scope">
            {{ scope.row.ratio }}%
          </template>
        </el-table-column>
        <el-table-column
          prop="orderTotalMoney"
          label="收入(元)"
          width="180"
        >
          <template slot-scope="scope">
            +{{ scope.row.orderTotalMoney/100 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="orderCount"
          label="笔数"
          width="180"
        />
        <el-table-column
          prop="totalBill"
          label="分成金额(元)"
          width="180"
        >
          <template slot-scope="scope">
            +{{ scope.row.totalBill/100 }}
          </template>
        </el-table-column>
      </el-table>
      <MyPage
        :total="totalCount"
        :current-page="page.pageIndex"
        :page-size="page.pageSize"
        @changePage="changePage"
      />
    </el-card>
  </div>
</template>

<script>
import { formatDate, formatDates } from '@/filters'
import SearchTime from '../order/components/searchTime.vue'
import statistics from './components/statistics.vue'
import { getorderCount, getorderAmount, gettotalBill, getpartnerCollect } from '@/api/report'
import MyPage from '@/components/myPage/index.vue'
export default {
  name: '',
  components: { statistics, SearchTime, MyPage },
  data() {
    return {
      reportShow: 'report',
      tableData: [],
      time: {
        partnerName: '',
        start: new Date(),
        end: new Date()
      },
      datetime: {
        partnerName: '',
        start: new Date(),
        end: new Date()
      },
      monthData: {
        orderCount: 0,
        orderAmount: 0,
        totalBill: 0
      },
      dateData: {
        orderCount: 0,
        orderAmount: 0,
        totalBill: 0
      },
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      totalCount: ''
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {
    this.getnewDate()
    this.getOrderCountData()
    this.getorderAmount()
    this.gettotalBill()
    this.getpartnerCollect()
  },
  methods: {
    getOrderCountData() {
      this.getMonth()
      this.getorderCount()
    },
    getMonth() {
      const year = new Date().getFullYear()
      const month = new Date().getMonth()
      this.time.start = new Date(year, month, 1)
    },
    // 获取一定时间范围之内的订单总数
    async getorderCount() {
      this.time.start = formatDate(this.time.start)
      this.time.end = formatDate(this.time.end)
      const res = await getorderCount({ ...this.time })
      this.monthData.orderCount = res.data
    },
    // 获取一定时间范围之内的收入
    async getorderAmount() {
      const res = await getorderAmount({ ...this.time, ...this.page })
      // console.log(res
      this.monthData.orderAmount = res.data
    },
    // 获取一定时间范围之内的分成总数
    async gettotalBill() {
      const res = await gettotalBill({ ...this.time })
      // console.log(res)
      this.monthData.totalBill = res.data
    },
    async getpartnerCollect() {
      this.getMonth()
      this.time.start = formatDates(this.time.start)
      this.time.end = formatDates(this.time.end)
      const res = await getpartnerCollect({ ...this.time, ...this.page })
      this.tableData = res.data.currentPageRecords
      console.log(res)
      this.totalCount = res.data.totalCount
    },
    async searchProlicy(val) {
      console.log(val)
      this.time.start = formatDates(val.startDate)
      this.time.end = formatDates(val.endDate)
      const res = await getpartnerCollect({ ...this.time, ...this.page })
      this.tableData = res.data.currentPageRecords
      this.totalCount = res.data.totalCount
    },
    changePage(val) {
      this.page.pageIndex = val
      this.$refs.searchTime.searchProlicy()
    },
    async getnewDate() {
      this.datetime.start = formatDate(this.datetime.start)
      this.datetime.end = formatDate(this.datetime.end)
      const res = await getorderCount({ ...this.datetime })
      this.dateData.orderCount = res.data
      const mount = await getorderAmount({ ...this.datetime, ...this.page })
      this.dateData.orderAmount = mount.data
      const bill = await gettotalBill({ ...this.datetime })
      this.dateData.totalBill = bill.data
    }
  }
}
</script>
<style scoped>
  ::v-deep .el-table td, .el-table th.is-leaf{
    border-bottom: 0;
  }
.statistics span {
  background-color: #fff;
    padding: 10px
}
.statistics i {
  font-size: 20px;
    color: #ff5757;
    font-weight: 500;
}

</style>

