<template>
  <div style="margin-top:20px">
    <!-- 顶部搜索框 -->
    <div class="search">
      <MyHeader @submit="submitSearch" />
    </div>
    <!-- 底部表格及分页 -->
    <div>
      <MyList :list="list">
        <!-- 新增、批量处理 -->
        <template slot="after">
          <el-button type="warning" icon="el-icon-circle-plus-outline" style="margin-right: 10px" @click="add">新增</el-button>

          <el-button type="info" @click="batchBtn([list])">批量处理</el-button>
        </template>

        <!-- table -->
        <template slot="table">
          <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column v-model="checkbox" type="selection" width="55" @click="toggleSelection" />
            <el-table-column label="序号" type="index" show-overflow-tooltip />
            <el-table-column prop="innerCode" label="设备编号" show-overflow-tooltip />
            <el-table-column prop="type" label="设备型号" show-overflow-tooltip />
            <el-table-column prop="address" label="地址" show-overflow-tooltip />
            <el-table-column prop="ownerName" label="合作商" show-overflow-tooltip />
            <el-table-column prop="status" label="设备状态" show-overflow-tooltip />
            <el-table-column label="操作" width="140">
              <template slot-scope="{row}">
                <el-button type="text" size="small">
                  <span @click="taskCargo(row)">货道</span>
                </el-button>
                <el-button type="text" size="small">
                  <span @click="taskTactics(row)">策略</span>
                </el-button>
                <el-button type="text" size="small">
                  <span @click="taskEdit(row)">修改</span>
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
      <div>
        <!-- 新增设备弹窗 -->
        <el-dialog title="新增设备" :visible.sync="dialogFormVisible" width="630px">
          <el-form ref="infoForm" :model="form" :rules="rules">
            <el-form-item label="设备编号 " width="530px" :label-width="formLabelWidth">
              <div>：系统自动生成</div>
            </el-form-item>
            <el-form-item props="type" label="选择型号" width="530px" :label-width="formLabelWidth">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option v-for="(item,index) in typeData" :key="index" :label="item" :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item props="regionAddress" label="选择点位" :label-width="formLabelWidth">
              <el-select v-model="form.regionAddress" placeholder="请选择">
                <el-option v-for="(item,index) in addressData" :key="index" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-form>
          <template v-slot:footer>
            <el-row type="flex" justify="center">
              <el-col :span="6">
                <el-button size="small" @click="handleFormClose">取消</el-button>
                <el-button type="primary" size="small" @click="btnAddVmOK">确定</el-button>
              </el-col>
            </el-row>
          </template>
        </el-dialog>
        <!-- 货道弹窗 -->
        <el-dialog title="货道设置" :visible.sync="dialogCargoVisible" width="1078px">
          <el-form ref="infoForm" :model="form" :rules="rules">
            <el-form-item width="530px" :label-width="formLabelWidth">
              <el-row>
                <el-col class="cargoTop">
                  <span>货道行数：{{ cargoTopData.vmRow }}</span>
                  <span>货道列数：{{ cargoTopData.vmCol }}</span>
                  <span>货道容量（个）：{{ cargoTopData.vmCol }}</span>
                  <el-button type="primary" @click="cargoSort">智能排序</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-carousel>
              <el-carousel-item>
                <el-form-item props="type" :label-width="formLabelWidth">
                  <el-row :gutter="20">
                    <el-col v-for="(item, index) in cargoBottomData" :key="index" :span="6">
                      <el-card :body-style="{ padding: '1px'}">
                        <img :src="item.skuImage" class="image">
                        <div style="padding: 14px;">
                          <span>{{ item.skuName }}</span>
                          <div class="bottom clearfix button">
                            <el-button type="text" class="button1">添加</el-button>
                            <el-button type="text" class="button2">删除</el-button>
                          </div>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-carousel-item>
            </el-carousel>
          </el-form>
          <template v-slot:footer>
            <el-row type="flex" justify="center">
              <el-col :span="4">
                <!-- <el-button size="small" @click="handleCargoClose">取消</el-button> -->
                <el-button type="warning" size="small" @click="dialogCargoVisible = false">确定</el-button>
              </el-col>
            </el-row>
          </template>
        </el-dialog>
        <!-- 策略弹窗 -->
        <el-dialog title="批量策略管理" :visible.sync="dialogTacticsVisible" width="630px">
          <el-form ref="infoFormTactics" :model="form" :rules="rules">
            <el-form-item v-if="!this.TacticsData.policyId" props="tactics" label="选择策略：" :label-width="formLabelWidth">
              <el-select v-model="form.regionAddress" placeholder="请选择">
                <el-option v-for="(item,index) in policyName" :key="index" :label="item" :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item v-else>
              <template>
                <el-row>
                  <el-col class="tacticsRow">
                    <span>机器编号：{{ TacticsData.innerCode }}</span>
                    <span>策略名称：{{ TacticsData.policyName }}</span>
                  </el-col>
                  <el-col class="tacticsRow">
                    <span>策略方案{{ TacticsData.discount }}%</span>
                  </el-col>
                </el-row>
              </template>
            </el-form-item>
          </el-form>
          <template v-if="!this.TacticsData.policyId" v-slot:footer>
            <el-row type="flex" justify="center">
              <el-col :span="6">
                <el-button size="small" @click="handleTacticsClose">取消</el-button>
                <el-button type="warning" size="small" @click="dialogTacticsVisible = false">确定</el-button>
              </el-col>
            </el-row>
          </template>
          <template v-else v-slot:footer>
            <el-row type="flex" justify="center">
              <el-col :span="6">
                <el-button size="small" @click="handleTacticsCancel">取消策略</el-button>
                <!-- <el-button type="warning" size="small" @click="dialogTacticsVisible = false">确定</el-button> -->
              </el-col>
            </el-row>
          </template>
        </el-dialog>
        <!-- 修改弹窗 -->
        <el-dialog title="修改设备" :visible.sync="dialogEditVisible" width="630px">
          <el-form ref="infoForm" :model="form" :rules="rules">
            <el-form-item props="edit" label="机器编号：" :label-width="formLabelWidth">
              <el-row>
                <el-col>{{ EditData.innerCode }}</el-col>
              </el-row>
            </el-form-item>
            <el-form-item props="edit" label="供货时间：" :label-width="formLabelWidth">
              <el-row>
                <el-col>{{ EditData.createTime }}</el-col>
              </el-row>
            </el-form-item>
            <el-form-item props="edit" label="设备类型：" :label-width="formLabelWidth">
              <el-row>
                <el-col>{{ EditData.type }}</el-col>
              </el-row>
            </el-form-item>
            <el-form-item props="edit" label="设备容量：" :label-width="formLabelWidth">
              <el-row>
                <el-col>{{ vmCount }}</el-col>
              </el-row>
            </el-form-item>
            <el-form-item props="edit" label="设备点位：" :label-width="formLabelWidth">
              <el-select v-model="form.regionAddress" placeholder="请选择">
                <el-option v-for="(item,index) in addressData" :key="index" :label="item" :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item props="edit" label="合作商：" :label-width="formLabelWidth">
              <el-row>
                <el-col>{{ EditData.ownerName }}</el-col>
              </el-row>
            </el-form-item>
            <el-form-item props="edit" label="所属区域：" :label-width="formLabelWidth">
              <el-row>
                <el-col>{{ remark }}</el-col>
              </el-row>
            </el-form-item>
            <el-form-item props="edit" label="设备地址：" :label-width="formLabelWidth">
              <el-row>
                <el-col>{{ EditData.address }}</el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <template v-slot:footer>
            <el-row type="flex" justify="center">
              <el-col :span="6">
                <el-button size="small" @click="handleEditClose">取消</el-button>
                <el-button type="warning" size="small" @click="btnEditOk">确定</el-button>
              </el-col>
            </el-row>
          </template>
        </el-dialog>
        <!-- 智能排序 -->
        <el-dialog title="智能排序" :visible.sync="dialogCargoSortVisible" width="1078px">
          <el-form>
            <el-form-item width="530px" :label-width="formLabelWidth">
              <div style="float:left;margin-left:-120px">该区域属于学校商圈适合销售一下商品：</div>
            </el-form-item>
            <el-form-item props="type" width="530px" :label-width="formLabelWidth">
              <el-row :gutter="20">
                <el-col v-for="(item, index) in cargoBottomData" :key="index" :span="4">
                  <el-card :body-style="{ padding: '1px'}">
                    <img :src="item.skuImage" class="image">
                    <div style="padding: 14px;">
                      <span>{{ item.skuName }}</span>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <template v-slot:footer>
            <el-row type="flex" justify="center">
              <el-col :span="4">
                <el-button type="warning" size="small" @click="dialogCargoSortVisible = false">采纳建议</el-button>
              </el-col>
            </el-row>
          </template>
        </el-dialog>
      </div>
    </div>

  </div>
</template>

<script>
import MyHeader from '../components/myHeader.vue'
import { getVmSearch, getVmTypeSearch, getPolicy, searchVmPolicy, addVm, getNode, getChannelListC, getVmTypeDetail, cacancelPolicy, editVmNode } from '@/api'
import MyList from '@/components/myList/index.vue'
import MyPagination from '@/components/myPagination/index.vue'
import VmType from '@/api/constant/vm'
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
      dialogTacticsVisible: false,
      dialogEditVisible: false,
      dialogCargoVisible: false,
      dialogCargoSortVisible: false,
      form: {
        type: '',
        regionAddress: ''
      },
      formLabelWidth: '120px',
      typeData: [],
      addressData: [],
      rules: {
        typeData: [{ require: true, trigger: 'blur', message: '无匹配数据' }],
        addressData: [{ require: true, trigger: 'blur', message: '无匹配数据' }]
      },
      policyName: [],
      TacticsData: [],
      EditData: [],
      AddVmData: [],
      cargoTopData: [],
      cargoBottomData: [],
      vmCount: '',
      remark: '',
      nodeId: [],
      vmType: []
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
        item.status = objStatus
      })
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
    // 打开新增弹窗并数据回显
    async getVmTypeSearch() {
      try {
        const { data: { currentPageRecords } } = await getVmTypeSearch({
          pageIndex: 1,
          pageSize: 100000
        })
        currentPageRecords.forEach(ele => {
          this.typeData.push(ele.name)
        })
        const { data: { currentPageRecords: addressData } } = await getNode({
          pageIndex: 1,
          pageSize: 100000
        })
        addressData.forEach(ele => {
          this.addressData.push(ele.name)
        })
      } catch (error) {
        console.log(error)
      }
    },
    async add() {
      this.dialogFormVisible = true
      this.getVmTypeSearch()
    },
    // 点击新建
    async btnAddVmOK() {
      const { data } = await getVmSearch(
        { pageIndex: this.pageInfo.pageIndex, pageSize: 10000 }
      )
      for (const key in this.pageInfo) {
        this.pageInfo[key] = parseInt(data[key])
      }
      // 提取数据相关信息
      this.AddVmData = data.currentPageRecords
      // console.log(this.form.regionAddress)
      this.AddVmData.some(ele => {
        // console.log(ele)
        if (ele.type.name === this.form.type && ele.node.name === this.form.regionAddress) {
          this.nodeId.push(ele.nodeId)
          this.vmType.push(ele.vmType)
        }
        console.log(this.nodeId)
        console.log(this.vmType)
      })
      // this.nodeId = this.nodeId[0]
      // this.vmType = parseInt(this.vmType[0])
      // console.log(this.nodeId)
      // console.log(this.vmType)
      const res = await addVm({
        createUserId: 1,
        nodeId: 1,
        vmType: 2
      })
      console.log(res)
      // this.$message.success('新增成功')
      // this.dialogFormVisible = false
      // await this.$refs.infoForm.validate()
    },
    // 货道
    async taskCargo(value) {
      this.dialogCargoVisible = true
      const res = await getVmTypeDetail(value.vmType)
      this.cargoTopData = res.data
      const { data } = await getChannelListC(value.innerCode)
      data.forEach(ele => {
        if (ele.sku) {
          this.cargoBottomData.push(ele.sku)
        }
      })
      // console.log(this.cargoBottomData)
    },
    // 货道---智能排序
    cargoSort() {
      this.dialogCargoSortVisible = true
    },
    async taskTactics(value) {
      this.dialogTacticsVisible = true
      try {
        const res = await searchVmPolicy(value.innerCode)
        if (!res.data.policyId) {
          const { data } = await getPolicy({
            innerCodeList: value.innerCode,
            policyId: value.id
          })
          // console.log(data)
          data.forEach(ele => {
            this.policyName.push(ele.policyName)
          })
        } else {
          this.TacticsData = res.data
          // console.log(this.TacticsData)
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.$refs.infoFormTactics.resetFields()
      }
    },
    async taskEdit(value) {
      this.dialogEditVisible = true
      this.EditData = value
      this.vmCount = this.EditData.node.vmCount
      this.remark = this.EditData.region.remark
      this.getVmTypeSearch()
      // console.log('this.EditData', this.addressData)
    },
    handleFormClose() {
      this.dialogFormVisible = false
    },
    handleCargoClose() {
      this.dialogCargoVisible = false
    },
    handleTacticsClose() {
      this.policyName = []
      this.dialogTacticsVisible = false
    },
    async handleTacticsCancel(val) {
      this.taskTactics()
      try {
        await cacancelPolicy(
          this.TacticsData.innerCode,
          this.TacticsData.policyId
        )
        this.$message.success('取消策略成功')
      } catch (error) {
        this.$message.error('取消策略失败，请重试')
      } finally {
        this.dialogTacticsVisible = false
      }
    },
    handleEditClose() {
      this.dialogEditVisible = false
    },
    // 批量处理
    async btnEditOk() {
      console.log('form', this.EditData)
      try {
        await editVmNode(this.EditData.id, this.EditData.nodeId)
        this.$message.success('修改成功')
      } catch (error) {
        this.$message.error('该设备正在运营')
      } finally {
        this.handleEditClose()
      }
    },
    btnTacticsOk() {
      this.handleTacticsClose()
    },
    batchBtn(row) {
      if (!this.multipleSelection.length) {
        this.$message.error('请勾选售货机')
      } else {
        this.taskTactics()
      }
      console.log(row)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style scoped lang="scss">
.search {
  margin-bottom: 20px;
  // background-image: ;
}
.el-select {
  width: 400px;
}
.tacticsRow {
  display: flex;
  align-content: space-between;
  align-items: center;
  // margin-left: 30px;
  span {
    padding-left: 150px;
    padding-top: 25px;
  }
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  margin: 0 auto;
}
.button1 {
  color: #5f84ff;
}
.button2 {
  color: red;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
.cargoTop {
  background-color: #f3f6fb;
  span {
    padding-left: 20px;
  }
  .el-button {
    float: right;
  }
}
</style>
