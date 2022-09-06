<template>
  <div>
    <!-- 搜索 -->
    <div class="search">
      <myHeader :all-task-status-list="allTaskStatusList" @submit="submitSearch" />
    </div>
    <!-- 表单加分页 -->
    <myList>
      <!-- 工单配置 -->
      <template slot="after">
        <!-- 新增按钮 -->
        <el-button type="warning" icon="el-icon-circle-plus-outline" style="margin-right: 10px" @click="add(1)">新建</el-button>
        <el-button type="info" @click="supplyAlertValue">工单配置</el-button>
      </template>
      <!-- 表单 -->
      <template slot="table">
        <el-table
          :data="list"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            width="100"
          />
          <el-table-column
            prop="taskCode"
            label="工单编号"
            width="160"
          />
          <el-table-column
            prop="innerCode"
            label="设备编号"
            width="160"
          />
          <el-table-column
            prop="taskType.typeName"
            label="工单类型"
            width="160"
          />
          <el-table-column
            :formatter="formatcreateType"
            label="工单方式"
            width="160"
          />
          <el-table-column
            prop="taskStatusTypeEntity.statusName"
            label="工单状态"
            width="130"
          />
          <el-table-column
            prop="userName"
            label="运营人员"
            width="130"
          />
          <el-table-column
            :formatter="formatcreateTime"
            label="创建日期"
            width="160"
          />
          <el-table-column
            prop="right"
            label="操作"
            width="100"
          >
            <template slot-scope="{row}">
              <el-button type="text" size="small">
                <span @click="taskInfo(row.taskId)">查看详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页组件 -->
      <template slot="myPagination">
        <myPagination v-show="total>0" :total="total" :total-page="totalPage" :current-page="page.pageIndex" @changePage="changePage" />
      </template>
    </myList>
    <addTask ref="addTask" :dialog-visible.sync="dialogVisible" :refresh="gettaskListApi" />
    <!-- 工单配置 -->
    <el-dialog title="工单配置" :visible="dialogVisible1" width="45%" :before-close="handleClose1">
      <el-form :model="form" width="100%">
        <el-form-item prop="maxValue" label="补货警戒线：" :rules="[{required:true,trigger: 'blur'}]">
          <el-input-number v-model="form.maxValue" size="large" width="100%" controls-position="right" :min="1" :max="form.num" />
        </el-form-item>
      </el-form>
      <!-- Dialog 按钮操作区的内容 -->
      <template v-slot:footer>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="handleClose1">取消</el-button>
            <el-button type="primary" size="small" @click="submit1">确定</el-button>
          </el-col>
        </el-row>
      </template>
    </el-dialog>
    <!--工单详情  -->
    <!--待办  -->
    <el-dialog title="工单详情" :visible="dialogVisible3" width="45%" :before-close="handleClose3">
      <el-row type="flex" class="task-status">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAADQklEQVRIS72WWWyMURTHf3dGSOqB2pWSCGKZllRLPGjsW1GDIUhjQkwrliBiXhpUmkhFEEu0pUIaRAe1xFZUwoOgRKqWILZqa6vlQYPoXLn9Zjrzzfd12hLO4z3/c/73LPecK2hEZFqKDa91FoIRSNkPaO8zqUaIx0iuY6k9JrLzy8K5Eg0p5WLnYITMAsY3dhmfvggp3GLvgXtmeAORdDisRLbeAnIFYGkiiR/mBbGDz9/WCI+nNthWRyRdjjbICA+Ccc0k0MMllxA1DpHr+epX1BPVRdI24vxfk/g9K7IvNZP8kQWIXM5tIFfWXy1hGEy1Q7v2UFUBp05AWan+5rZYSJ4BXbvBp2o4Uwi3bwZhxHaRe2CVOqgj8hX+Tn1Nhg6HRakBg/JXUHIbLp4D6dXOhQUmTIb4BIjuGcDm5cCtG4GaSTFENYhG5FpwUdddmZuhYyf48B4KDkPpPejTF/oPhHYdNCefPsKjB/D0CcQOhtnzAjbpa4MjLxK5BycImbbIhvfXfV1OdubC82eQsxu6RsHcFIjuYd4f5a/hSD5UVULqUujVG5a79FhLixghXc4NINfrNOp2qiZxQyBlIVit4Zuwthby98PdO5Bsh4IjIXiRIWSq8wpSjjZ4Uqla5daTVH+EC2dB1VDpg0WRbcvSUhkqQhSriCpARul0QkD6RugerTd5+QI2ZcB8JySONDp8Uw6Z60DKUF2lkK4F34FWOo3Kszvd6KgxImWRlanVVy8/zIkmJoHd8WdEhR4tvUYik9TNmQ+jTaaQPyLViZGRmivbIBgTNHeLL8HRQyapM2uGaXZISjZGVPkG9mXrz+MSYEoQ9uwpOF2ox/iawdjecfGQuix8SzekzdkFd0tM2tvswbZsBVlbIaJ188hqvoF7Nfz8obezeGPMR5CCqbyrh9scUePqSlGohTaC1KlhqPqhi5dA/LCmUZXchL17QrFegodqHVnomlCHFgtMnwljJzY8htREuHwBTh4Hr2+y19OFrIk6onCLr3MXSBwFA2zaflKi9s/DMrh2Fd69NUbd0OLTovoPq9x/pf/yOQmO/59/t0KTLV3OGGCm9oGkH0hfkUQ1At8H0npMZOeF/UD+BpwnSWqJuP2NAAAAAElFTkSuQmCC" alt="" class="icon">
        <span class="status">{{ form1.statusName }}</span>
        <img src="http://likede2-admin.itheima.net/img/pic_1.834b274c.png" alt="" class="pic">
      </el-row>
      <el-form :model="form1" width="100%">
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备编号：">
              {{ form1.innerCode }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建日期：">
              {{ form1.createTime }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运营人员：：">
              {{ form1.userName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单类型：">
              {{ form1.typeName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="补货数量：">
              <span style="color:#6d8fff;cursor: pointer" @click="taskDetails1()">补货详情</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单方式：">
              {{ form1.createType }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注：">
              {{ form1.desc }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- Dialog 按钮操作区的内容 -->
      <template v-slot:footer>
        <el-row type="flex" justify="center">
          <el-col :span="4">
            <el-button size="small" @click="cancel">取消工单</el-button>
          </el-col>
        </el-row>
      </template>
    </el-dialog>
    <!-- 取消 -->
    <el-dialog title="工单详情" :visible="dialogVisible2" width="45%" :before-close="handleClose2">
      <el-row type="flex" class="task-status">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABqUlEQVRIS72WvUrDUBTH/6cGMjq4qO0DOFgQSocbcBFUnDWvURQER+0oCEpfI+5ii12E3KEEBB18gEZdHNwMxBy5tQ39sr1JaDLmnv/93Xu+7iHM+SzL2gRwxMzbADYArPQlnwBeiegRwK3rui+ztqL/Fi3L2mLmSwB78w7TX28S0Znruk/T7CdAtm0vdbvdK2auEVFBE9IzY+aIiBqlUunUcZyfYe0IqFKpLJum6TDzbhLAuC0RtYIgsD3P+xqsxSB1E9/377JC4o2JWsVi8WBwsxgkhLgGcJzlJlO0N1LKE/W/B1KBj6LI04iJE4ZhTWkMw2gAsGcdTMWsUChUVIL0QEKIe53sCsNwrdPpfChNtVpdNQzjXcMDTSnlPqk6YeZnDQFSgkBEZQW6YOZzHRCARK4bSow6CSEeAOxogtKatRXIB7Cus4OUcqTuhBCsowPwpkDfAEwdQQZQkCsoN9dpJ0MG17UTpXdaEBHVExVsBlA5UQtKCfprQQmbqk4VxDYTTbXfWBf/TChQbg+fguXylA8cm8twMhzphY9b42klhCgT0WHWAfIXFPYBcBvJ9uQAAAAASUVORK5CYII=" alt="" class="icon">
        <span class="status">{{ form1.statusName }}</span>
        <img src="http://likede2-admin.itheima.net/img/pic_3.e8208e34.png" alt="" class="pic">
      </el-row>
      <el-form :model="form1" width="100%">
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备编号：">
              {{ form1.innerCode }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建日期：">
              {{ form1.createTime }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="取消日期：">
              {{ form1.updateTime }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运营人员：：">
              {{ form1.userName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单类型：">
              {{ form1.typeName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="补货数量：">
              <span style="color:#6d8fff;cursor: pointer" @click="taskDetails1()">补货详情</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单方式：">
              {{ form1.createType }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="取消原因：">
              {{ }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- Dialog 按钮操作区的内容 -->
      <template v-slot:footer>
        <el-row type="flex" justify="center">
          <el-col :span="4">
            <el-button size="small" @click="add(2)">重新创建</el-button>
          </el-col>
        </el-row>
      </template>
    </el-dialog>
    <taskDetailsList :dialog-visible-detail.sync="dialogVisibleDetail" :list2="list2" />
  </div>
</template>

<script>
import myPagination from '@/components/myPagination'
import myHeader from '@/components/myHeader'
import myList from '@/components/myList'
import { taskListApi, supplyAlertValue, taskInfo, cancel, allTaskStatus, taskDetails } from '@/api/task'
import addTask from './components/addTask.vue'
import taskDetailsList from './components/taskDetailsList.vue'
export default {
  name: 'Business',
  components: { myList, myHeader, myPagination, addTask, taskDetailsList },
  data() {
    return {
      page: {
        pageIndex: 1, // 当前页码
        pageSize: 10, // 当前页的数据量
        isRepair: false // 是否维修工单
      },
      list: [], // 工单数据
      total: 0, // 总数,
      totalPage: 0, // 总页数,
      dialogVisible: false, // 对话框显示
      name: [],
      taskTypeList: [],
      dialogVisible1: false, // 对话框显示
      dialogVisible2: false, // 详情对话框显示
      dialogVisible3: false, // 详情对话框显示
      dialogVisibleDetail: false,
      form: {
        maxValue: '',
        num: null
      },
      form1: {}, // 查看详情数据
      createType: '',
      allTaskStatusList: [], // 状态表
      list2: [] // 补货数量详情
    }
  },
  computed: {
  },
  watch: {},
  created() {
    this.allTaskStatus()
    this.gettaskListApi()
  },
  mounted() {

  },
  methods: {
    // 状态表
    async allTaskStatus() {
      const { data } = await allTaskStatus()
      this.allTaskStatusList = data
    },
    // 工单列单每页
    async gettaskListApi(val) {
      const { data } = await taskListApi({ ...this.page, ...val })
      // console.log(res)
      this.list = data.currentPageRecords
      // + 转换Number
      this.total = +data.totalCount
      this.totalPage = +data.totalPage
      // // 数组名字
      // res.data.currentPageRecords.forEach(ele => this.name.push(ele.userName))
      // res.data.currentPageRecords.forEach(ele => this.taskTypeList.push(ele.taskType))
      // // 去重
      // this.name = Array.from(new Set(this.name))
      // this.taskTypeList = Array.from(new Set(this.taskTypeList))
      // // console.log(this.name, 1)
    },
    // 工单搜索
    async submitSearch(val) {
      try {
        await this.gettaskListApi(val)
      } catch (error) {
        console.log(error)
      }
    },
    // 格式化工单方式数据
    formatcreateType(row, column, cellValue, index) {
      // console.log(row)
      // console.log(column)
      // console.log(cellValue)
      // console.log(index)
      return row.createType === 1 ? '手动' : '自动'
    },
    // 格式化创建日期数据
    formatcreateTime(row, column, cellValue, index) {
      // 将字符'T' 替换成 ' '
      return row.createTime.replace('T', ' ')
    },
    // 改变页数
    changePage(val) {
      this.page.pageIndex = val
      this.gettaskListApi()
    },
    // 新增
    async add(num) {
      try {
        this.dialogVisible2 = false
        // 显示对话框
        this.dialogVisible = true
        if (num === 1) {
          await this.$refs.addTask.getoperatorList()
        } else {
          this.$refs.addTask.form.assignorId = this.form1.assignorId
          this.$refs.addTask.form.createType = this.createType
          this.$refs.addTask.form.productType = this.form1.productType
          this.$refs.addTask.form.innerCode = this.form1.innerCode
          this.$refs.addTask.getoperatorList()
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 获取补货预警值
    async supplyAlertValue() {
      try {
        this.dialogVisible1 = true
        const res = await supplyAlertValue()
        console.log(res)
        this.form.maxValue = res.data
        this.form.num = res.data
        console.log(this.form.maxValue)
      } catch (error) {
        console.log(error)
      }
    },
    // 关闭
    handleClose1() {
      this.dialogVisible1 = false
    },
    handleClose2() {
      this.dialogVisible2 = false
    },
    handleClose3() {
      this.dialogVisible3 = false
    },
    // 确认
    submit1() {
      // 关闭对话框
      this.handleClose1()
    },
    // 查看详情
    async taskInfo(taskId) {
      const res = await taskInfo(taskId)
      this.form1 = res.data
      console.log(this.form1)
      this.createType = this.form1.createType
      this.form1.createTime = this.form1.createTime.replace('T', ' ')
      this.form1.updateTime = this.form1.updateTime.replace('T', ' ')
      this.form1.createType = this.form1.createType === 0 ? '自动' : '手动'
      this.form1.typeName = this.form1.taskType.typeName
      this.form1.statusName = this.form1.taskStatusTypeEntity.statusName

      if (this.form1.statusName === '待办') {
        this.dialogVisible3 = true
      } else {
        this.dialogVisible2 = true
      }
    },
    // 取消工单
    async cancel() {
      try {
        await this.$confirm('取消工单后，将不能恢复，是否确认取消？', '提示', {
          type: 'warning'
        })
        await cancel({
          taskId: this.form1.taskId,
          desc: this.form1.desc
        })
        // 关闭对话框
        this.handleClose3()
        // 刷新
        this.gettaskListApi()
        // 取消成功
        this.$message.success('取消成功')
      } catch (error) {
        console.log(error)
      }
    },
    async taskDetails1() {
      try {
        const { data } = await taskDetails(this.form1.taskId)
        this.list2 = data
        this.dialogVisibleDetail = true
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.search {
  margin-bottom: 20px;
}
::v-deep.el-table th.is-leaf {
  border-bottom: 0;
}
// 列表表头颜色
::v-deep.el-table th,
.el-table tr {
  background-color: #f3f6fb;
  // background-color: red;
}
.el-input-number {
  width: 450px;
}
.task-status {
  align-items: center;
  height: 54px;
  margin-bottom: 25px;
  background-color: hsla(0, 0%, 92.5%, 0.39);
  .icon {
    margin-left: 22px;
  }
  .status {
    flex: 1;
    margin-left: 16px;
    color: rgba(0, 0, 0, 0.85);
  }
  .pic {
    margin-right: 76px;
    margin-bottom: 7px;
  }
}
</style>
