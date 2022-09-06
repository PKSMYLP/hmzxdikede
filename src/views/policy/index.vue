<template>
  <div>
    <Search @searchProlicy="searchProlicy" />
    <el-card>
      <el-button icon="el-icon-circle-plus-outline" class="newbtn" @click="dialogVisible = true">新建</el-button>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          type="index"
          width="80"
        />
        <el-table-column
          prop="policyName"
          label="策略名称"
          width="300"
        />
        <el-table-column
          prop="discount"
          label="策略方案"
          width="300"
        />
        <el-table-column
          prop="createTime"
          label="创建日期"
          width="300"
        >
          <template slot-scope="scope">
            {{ scope.row.createTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="{row}">
            <el-button @click="getPolicy(row.policyId,row.policyName)">查看详情</el-button>
            <el-button @click="changePolicy(row,row.policyId)">修改</el-button>
            <el-button class="del" @click="del(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <AddPolicy
      ref="addPolicy"
      :dialog-visible.sync="dialogVisible"
      :table-data="tableData"
      @refresh="getSearchLists"
    />
    <MyPage
      :total="totalCount"
      :current-page="page.pageIndex"
      :page-size="page.pageSize"
      @changePage="changePage"
    />
    <StrategiesForDetails
      :strategiesfordetails="strategiesfordetails"
      :policy-data="policyData"
      :policpage="policpage"
      :policy-name="policyName"
    />
  </div>
</template>

<script>
import { getSearchList, getPolicy, deletePolicy } from '@/api/policy/index'
import Search from './components/Search.vue'
import AddPolicy from './components/addPolicy.vue'
import MyPage from '@/components/myPage'
import StrategiesForDetails from './components/StrategiesForDetails.vue'
export default {
  name: '',
  components: { Search, AddPolicy, MyPage, StrategiesForDetails },
  data() {
    return {
      tableData: [],
      search: '',
      dialogVisible: false,
      page: {
        pageIndex: 1,
        pageSize: 10,
        policyName: ''
      },
      totalCount: '0',
      strategiesfordetails: false,
      policyData: [],
      policpage: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: ''
      },
      policyid: '',
      policyName: '',
      policyShow: 'policy'
    }
  },
  computed: {
    // list() {
    //   return this.tableData.filter(item => {
    //     if (item.policyName !== null && item.policyName.indexOf(this.search) > -1) {
    //       return item
    //     }
    //   })
    // }
  },
  watch: {},
  created() {
    this.getSearchLists()
  },
  mounted() {
  },
  methods: {
    async getSearchLists() {
      try {
        const res = await getSearchList(this.page)
        this.tableData = res.data.currentPageRecords
        this.totalCount = res.data.totalCount
      } catch (e) { console.log(e) }
    },
    async searchProlicy(val) {
      try {
        this.page.policyName = val
        const res = await getSearchList(this.page)
        this.tableData = Number(res.data.totalCount)
      } catch (e) {
        console.log(e)
      }
    },
    async changePage(val) {
      try {
        this.page.pageIndex = val
        this.getSearchLists()
      } catch (e) {
        console.log(e)
      }
    },
    async getPolicy(id = this.policyid, val = this.policyName) {
      try {
        this.policyid = id
        this.policyName = val
        this.strategiesfordetails = true
        const res = await getPolicy(this.policyid, this.policpage.pageIndex, this.policpage.pageSize)
        this.policyData = res.data.currentPageRecords
        this.policpage.totalCount = res.data.totalCount
      } catch (e) {
        console.log(e)
      }
    },
    changePolicy(val) {
      try {
        this.dialogVisible = true
        this.$refs.addPolicy.formPolicy = val
      } catch (e) {
        console.log(e)
      }
    },
    async del(id) {
      try {
        await deletePolicy(id)
        this.$message.success('删除成功')
        this.getSearchLists()
      } catch (e) {
        console.log(e)
        this.$message.error('删除失败')
      }
    }
  }
}

</script>
<style >
body{
  background-color: #f8fafd;
}
.newbtn {
    background: linear-gradient(135deg,#ff9743,#ff5e20);
    color: #fff;
    margin-bottom: 20px;
  }
  .el-card {
    margin-top: 20px;
  }
  .el-table td{
    border-bottom: none
  }
  .el-table td, .el-table th{
   border-bottom: none !important
   }
   .el-table th{
    background: #f3f6fb !important;
   }
   .el-button{
    border: none;
   }
   .del{
    color:red
   }

</style>
