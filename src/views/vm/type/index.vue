<template>
  <div style="margin-top:20px">
    <!-- 顶部搜索框 -->
    <div class="search">
      <MyHeader :shwo-search="shwoSearch=true" @submit="submitSearch" />
    </div>
    <!-- 底部表格及分页 -->
    <div>
      <MyList :list="list">
        <!-- 新增、批量处理 -->
        <template slot="after">
          <el-button type="warning" icon="el-icon-circle-plus-outline" style="margin-right: 10px" @click="add">新增</el-button>
        </template>

        <!-- table -->
        <template slot="table">
          <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column label="序号" type="index" show-overflow-tooltip />
            <el-table-column prop="name" label="型号名称" show-overflow-tooltip />
            <el-table-column prop="model" label="型号编码" show-overflow-tooltip />
            <el-table-column prop="picture" label="设备图片" show-overflow-tooltip>
              <template slot-scope="{row}">
                <el-image style="width: 50px; height: 50px border-radius: 25px;" :src="row.image" />
              </template>
            </el-table-column>
            <el-table-column prop="vmRow" label="货道行" show-overflow-tooltip />
            <el-table-column prop="vmCol" label="货道列" show-overflow-tooltip />
            <el-table-column prop="channelMaxCapacity" label="设备容量" show-overflow-tooltip />
            <el-table-column prop="right" label="操作" width="140">
              <template slot-scope="{row}">
                <el-button type="text" size="small">
                  <span @click="taskInfo(row.edit)">修改</span>
                </el-button>
                <el-button type="text" size="small" style="color:red">
                  <span @click="taskInfo(row.del)">删除</span>
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
        <!-- Form -->
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
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>

  </div>
</template>

<script>
import MyHeader from '../components/myHeader.vue'
import { getVmTypeSearch, getSkuCollect } from '@/api'
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
      form: {
        type: '',
        regionAddress: ''
      },
      formLabelWidth: '120px',
      typeData: ['饮料机', '综合机', '零食机', '果蔬机', '电子产品', '果汁机', '灯具', '茶叶机'],
      addressData: ['北京悦荟广场', '凯德MALL', '枫蓝国际购物中心', '西单大悦城', '龙旗购物中心', '三旗百汇购物中心', '上品折扣', '华联商厦', , '路劲世界城广场', '新世纪商城', '八达岭奥特莱斯', '翠微百货', '金燕龙写字楼一层', '金燕龙写字楼二层', '金燕龙写字楼三层', '金燕龙写字楼四层', '阿迪斯发的', '华联商厦', '123'],
      rules: {
        typeData: [{ require: true, trigger: 'blur', message: '无匹配数据' }],
        addressData: [{ require: true, trigger: 'blur', message: '无匹配数据' }]
      },
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'

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
      const { data } = await getVmTypeSearch(this.pageInfo)
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
        item.name
        item.model
        item.image
        item.vmRow
        item.vmCol
        item.channelMaxCapacity
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
        // console.log(ele.name)
        if (ele.name.includes(value.taskCode)) {
          return ele.name
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
    batchBtn() { },
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
</style>
