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
          <el-button type="warning" icon="el-icon-circle-plus-outline" style="margin-right: 10px" @click="taskEdit">新增</el-button>
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
                  <span @click="taskEdit(row)">修改</span>
                </el-button>
                <el-button type="text" size="small" style="color:red">
                  <span @click="taskDel(row)">删除</span>
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
        <!-- 修改弹窗 -->
        <el-dialog :title="titleTypeData" :visible.sync="dialogFormVisible" width="630px">
          <el-form :model="form">
            <el-form-item class="maxValue" prop="name" label="型号名称:" :rules="[{required:true,trigger: 'blur'}]">
              <el-input v-model="form.name" size="large" placeholder="请输入" />
            </el-form-item>
            <el-form-item class="maxValue" prop="model" label="型号编码:" :rules="[{required:true,trigger: 'blur'}]">
              <el-input v-model="form.model" size="large" placeholder="请输入（限制数字、字母、中划线、下划线）" />
            </el-form-item>
            <el-form-item prop="vmRow" label="货道行数:" :rules="[{required:true,trigger: 'blur'}]">
              <el-input-number v-model="form.vmRow" size="large" width="100%" controls-position="right" :min="1" :max="form.num" />
            </el-form-item>
            <el-form-item prop="vmCol" label="货道列数:" :rules="[{required:true,trigger: 'blur'}]">
              <el-input-number v-model="form.vmCol" size="large" width="100%" controls-position="right" :min="1" :max="form.num" />
            </el-form-item>
            <el-form-item prop="channelMaxCapacity" label="货道容量:" :rules="[{required:true,trigger: 'blur'}]">
              <el-input-number v-model="form.channelMaxCapacity" size="large" width="100%" controls-position="right" :min="1" :max="form.num" />
            </el-form-item>
            <el-form-item label="设备图片：">
              <!-- 放置上传图片 -->
              <UploadImg ref="staffPhoto" :img-url="form.image" @click="headerSuccess" />
              <span style="text-align: center;">支持扩展名：jpg、png，文件不得大于100kb</span>
            </el-form-item>
          </el-form>
          <!-- Dialog 按钮操作区的内容 -->
          <template v-slot:footer>
            <el-row type="flex" justify="center">
              <el-col :span="6">
                <el-button size="small" @click="dialogFormVisible = false">取消</el-button>
                <el-button type="warning" size="small" @click="dialogFormVisible = false">确定</el-button>
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
import { getVmTypeSearch, getSkuCollect, deleteVmType, getVmTypeDetail } from '@/api'
import MyList from '@/components/myList/index.vue'
import MyPagination from '@/components/myPagination/index.vue'
import VmType from '@/api/constant/vm'
import UploadImg from '../../../components/uploadImg/index.vue'
export default {
  // name: 'Index',
  components: { MyHeader, MyList, MyPagination, UploadImg },
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
        name: '',
        model: '',
        image: '',
        vmRow: '',
        vmCol: '',
        channelMaxCapacity: ''
      },
      // form: [],
      formLabelWidth: '120px',
      typeData: ['饮料机', '综合机', '零食机', '果蔬机', '电子产品', '果汁机', '灯具', '茶叶机'],
      addressData: ['北京悦荟广场', '凯德MALL', '枫蓝国际购物中心', '西单大悦城', '龙旗购物中心', '三旗百汇购物中心', '上品折扣', '华联商厦', , '路劲世界城广场', '新世纪商城', '八达岭奥特莱斯', '翠微百货', '金燕龙写字楼一层', '金燕龙写字楼二层', '金燕龙写字楼三层', '金燕龙写字楼四层', '阿迪斯发的', '华联商厦', '123'],
      rules: {
        typeData: [{ require: true, trigger: 'blur', message: '无匹配数据' }],
        addressData: [{ require: true, trigger: 'blur', message: '无匹配数据' }]
      },
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      titleTypeData: '新增设备类型'

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
        if (ele.name.includes(value.taskCode)) {
          return ele.name
        }
        return
      })
    },
    // titleTypeData: '新增设备类型'
    async taskEdit(value) {
      this.dialogFormVisible = true
      if (value.typeId) {
        this.titleTypeData = '修改设备类型'
        const res = this.list.filter(ele => ele.typeId === value.typeId)
        this.form.name = res[0].name
        this.form.model = res[0].model
        this.form.vmRow = res[0].vmRow
        this.form.vmCol = res[0].vmCol
        this.form.channelMaxCapacity = res[0].channelMaxCapacity
        this.form.image = res[0].image

        getVmTypeDetail(value.typeId)
        // console.log('form', this.form)
      } else {
        // const res = await addVm({

        // })
      }
      // await this.$refs.infoForm.validate()
    },
    async taskDel(value) {
      try {
        const res = await deleteVmType(value.typeId)
        this.$message.success('删除成功')
        console.log(res)
      } catch (error) {
        this.$message.error('该售货机类型在使用')
      }
    },
    headerSuccess() {
      this.$refs.staffPhoto.imgUrl = this.form.image
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
.el-input-number {
  width: 400px;
}
.maxValue {
  display: flex;
  .el-input {
    width: 400px;
  }
}
</style>
