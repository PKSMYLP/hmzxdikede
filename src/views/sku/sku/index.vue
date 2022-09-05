<template>
  <div>
    <!-- 搜索 -->
    <div class="search" style="margin:0 0 20px">
      <el-card class="inptcard" body-style="padding:0px" shadow="never" style="border:none">
        <el-form :inline="true" class="demo-form-inline formCard" size="medium">
          <el-form-item label="区域搜索：" style="line-height:58.8px">
            <el-input v-model="page.skuName" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getGoodsList">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <!-- 列表 -->
    <el-card>

      <el-button class="tableBtn" type="warning" icon="el-icon-circle-plus-outline" @click="add">新建</el-button>
      <el-button class="tableBtns" type="warning" @click="importData">导入数据</el-button>

      <AreaTabel
        :thead="thead"
        :area-list="currentPageRecords"
        :width="width"
        :is-show="isShow"
        :total-count="totalCount"
        :page-index="page.pageIndex"
        :total-page="totalPage"
        @paging="paging"
      >
        <template #amend="{ row }">
          <el-button type="text" @click="amend(row)">修改</el-button>
        </template>
      </AreaTabel>
    </el-card>

    <!-- 新建 -->
    <addGoodsManagement ref="addGoodsManagement" :dialog-visible.sync="dialogVisible" :row-obj="rowObj" />
    <!-- 导入数据 -->
    <importData :dialog-visible.sync="importDataDialogVisible" />
  </div>
</template>

<script>
import AreaTabel from '@/components/AreaTabel'
import addGoodsManagement from './components/addGoodsManagement.vue'
import importData from './components/importData.vue'
import { getGoodsList } from '@/api/permission'
export default {
  name: 'GoodsManagement',
  components: { AreaTabel, addGoodsManagement, importData },
  data() {
    return {
      isShow: true,
      width: '100',
      thead: [
        { label: '品牌', props: 'brandName' },
        { label: '规格', props: 'unit' },
        { label: '商品价格', props: 'price' },
        { label: '商品类型', props: 'skuClass.className' },
        { label: '创建日期', props: 'createTime' }
      ],
      page: {
        pageIndex: 1,
        pageSize: 10,
        className: null,
        classId: null,
        skuName: null
      },
      currentPageRecords: [], // 列表数据
      totalCount: null, // 总数
      totalPage: null, // 总页数
      dialogVisible: false, // 添加弹出
      rowObj: {}, // 修改的数据
      importDataDialogVisible: false
    }
  },
  mounted() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      const { data: { currentPageRecords, pageIndex, pageSize, totalCount, totalPage }} = await getGoodsList(this.page)
      currentPageRecords.forEach(ele => {
        console.log(ele)
        // 去除时间的T和-
        ele.createTime = ele.createTime.toLocaleString().replace(/T/g, ' ').replace(/-/g, '.')
      })
      this.currentPageRecords = currentPageRecords
      this.page.pageIndex = pageIndex
      this.page.pageSize = pageSize
      this.totalCount = totalCount
      this.totalPage = totalPage
    },

    // 新建
    add() {
      this.dialogVisible = true
    },

    // 修改
    amend(row) {
      console.log('🚀 ~ file: index.vue ~ line 86 ~ amend ~ row', row)
      this.rowObj = row
      this.$refs.addGoodsManagement.formData = { ...this.$refs.addGoodsManagement.formData, ...row }
      this.dialogVisible = true
    },
    // 导入数据
    importData() {
      this.importDataDialogVisible = true
    },
    // 翻页
    paging(val) {
      // console.log('🚀 ~ file: index.vue ~ line 95 ~ paging ~ val', val)
      if (val === 0) {
        this.page.pageIndex = +(this.page.pageIndex) - 1
        this.getGoodsList()
      } else {
        this.page.pageIndex = +(this.page.pageIndex) + 1
        this.getGoodsList()
      }
    }
  }
}
</script>

<style scoped>
.tableBtns {
  position: absolute;
  top: 120px;
  left: 290px;
  width: 80px !important;
  height: 36px;
  padding: 0;
  background-color: #fbf4f0 !important;
  border: none;
  color: #655b56 !important;
}

.tableBtn {
  display: flex;
  margin-bottom: 20px;
  width: 80px;
  height: 36px;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
}

.formCard {
  height: 58.8px !important;
  padding: 0 0 0 17px;
}

.el-form-item--medium>>>.el-form-item__content {
  line-height: 60px !important;
}

.el-form--inline>>>.el-form-item__label {
  font-weight: 400;
}
.tableBtns{
  top: 100px;
    left: 120px;
}
</style>
