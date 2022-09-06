<template>
  <div style="margin-top:20px">
    <!-- 顶部搜索框 -->
    <div class="search">
      <MyHeader @submit="submitSearch" />
    </div>
    <!-- 底部表格及分页 -->
    <div>
      <MyList :list="list">
        <!-- table -->
        <template slot="table">
          <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column width="80" label="序号" type="index" show-overflow-tooltip />
            <el-table-column width="160" prop="innerCode" label="设备编号" show-overflow-tooltip />
            <el-table-column width="160" prop="type" label="设备型号" show-overflow-tooltip />
            <el-table-column width="160" prop="address" label="地址" show-overflow-tooltip />
            <el-table-column prop="vmStatus" label="运营状态" width="150" />
            <el-table-column prop="status" label="设备状态" show-overflow-tooltip>
              <el-row>
                <el-button type="warning" round>离线</el-button>
                <el-button type="success" round>货道</el-button>
                <el-button type="success" round>传动轴</el-button>
              </el-row>

            </el-table-column>
            <el-table-column prop="right" label="操作" width="140">
              <template slot-scope="{row}">
                <el-button type="text" size="small">
                  <span @click="taskInfo(row.innerCode)">查看详情</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

        <!-- 分页 -->
        <template slot="myPagination">
          <MyPagination v-show="total>0" :total="pageInfo.totalCount" :total-page="pageInfo.totalPage" :current-page="pageInfo.pageIndex" @changePage="changePage" />
        </template>
      </MyList>

      <el-dialog title="设备详情" :visible.sync="dialogVisible" width="30%">
        <div>
          <ul>
            <li>
              <span>销售量：<i>{{ FormData.salesVolume }}个</i></span>
            </li>
            <li>
              <span>销售额：<i>{{ FormData.sales }}个</i></span>
            </li>
            <li>
              <span>补货次数：<i>{{ FormData.replenishmentTimes }}次</i></span>
            </li>
            <li>
              <span>维修次数：<i>{{ FormData.maintenanceTimes }}次</i></span>
            </li>
          </ul>
        </div>
        <div style="margin-top:20px">
          <span>商品销售（月）</span>
          <el-table empty-text="当前设备未销售商品" border style="width: 100%; margin-top: 20px">
            <!-- <el-table-column prop="amount1" label="数值 1（元）">
          </el-table-column> -->
          </el-table>
        </div>
      </el-dialog>
      <div />
    </div>

  </div>
</template>

<script>
import MyHeader from '../components/myHeader.vue'
import { getVmSearch, getSkuCollect } from '@/api'
import MyList from '@/components/myList/index.vue'
import MyPagination from '@/components/myPagination/index.vue'
import VmType from '@/api/constant/vm'
import dayjs from 'dayjs'
export default {
  // name: 'Index',
  components: { MyHeader, MyList, MyPagination },
  data() {
    return {
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
        totalPage: 1
      },

      multipleSelection: [],
      list: [],
      total: 0,
      VmType,
      dialogFormVisible: false,
      form: {
        type: '',
        regionAddress: ''
      },
      formLabelWidth: '120px',
      dialogVisible: false,
      FormData: {
        salesVolume: '',
        sales: '',
        replenishmentTimes: '',
        maintenanceTimes: ''
      }

    }
  },
  computed: {},
  watch: {},
  created() {
    this.getFirstPage()
  },
  mounted() {

  },
  methods: {
    async getFirstPage() {
      const { data } = await getVmSearch(
        { pageIndex: this.pageInfo.pageIndex, pageSize: this.pageInfo.pageSize }
      )
      for (const key in this.pageInfo) {
        this.pageInfo[key] = parseInt(data[key])
      }
      // 提取数据相关信息
      this.list = data.currentPageRecords
      this.total = data.totalCount
      // console.log(this.list)
      // 处理数据
      this.handleListData()
    },
    // 处理数据
    handleListData() {
      // this.tableData.innerCode = this.currTasks.innerCode
      this.list.forEach(item => {
        // console.log(item)
        // 处理设备编号
        if (!item.innerCode) return
        item.innerCode
        item.type = item.type.name
        item.address = item.node.name
        item.ownerName
        const objStatus = []
        VmType.equipmentType.find(ele => {
          if (ele.id == item.vmStatus) {
            objStatus.push(ele.value)
          }
        })
        item.vmStatus = objStatus
        const obj = []
        Object.keys(item.status).forEach(ele => {
          VmType.equipmentStatus.find(item => {
            if (item.id === ele) {
              obj.push(item.value)
            }
          })
        })
        item.status = obj
        // console.log(item.status)
      })
      // console.log(this.currTasks)
    },
    changePage(value) {
      this.pageInfo.pageIndex = value
      this.getFirstPage()
    },
    async submitSearch(value) {
      // console.log(value.taskCode)
      // const res = await getVmTypeSearch({
      //   pageIndex: this.pageInfo.pageIndex,
      //   pageSize: this.pageInfo.pageSize,
      //   name: value.taskCode
      // })
      this.list = this.list.filter(ele => {
        if (ele.innerCode.includes(value.taskCode)) {
          return ele.innerCode
        }
        return
      })
    },
    async add() {
      this.dialogFormVisible = true
      await this.$refs.infoForm.validate()
      const res = await addVm({

      })
      console.log(res)
    },
    async taskInfo(val) {
      this.dialogVisible = true
      // let start = new Date()
      let start = dayjs().subtract(2, 'day')
      start = dayjs(start).format('YYYY.MM.DD')
      console.log(start)
      // let end = dayjs().add(1, 'day')
      const end = dayjs(end).format('YYYY.MM.DD')

      const res = await getSkuCollect(val, start, end)
      console.log(res)
    },
    handleSelectionChange() { }
  }
}
</script>
<style scoped lang="scss">
.search {
  margin-bottom: 20px;
}
.el-select {
  width: 400px;
}
ul,
li {
  list-style: none;
  font-style: normal;
}
ul {
  display: flex;
  height: 50px;
  line-height: 50px;
  margin-top: 5px;
  padding-left: 0px;
  background-color: #ccc;
  li {
    margin-left: 10px;
    i {
      font-style: normal;
    }
  }
}
</style>
