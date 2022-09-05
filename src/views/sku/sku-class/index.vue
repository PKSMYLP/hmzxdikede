<template>
  <div>
    <!-- 搜索 -->
    <div class="search" style="margin:0 0 20px">
      <el-card class="inptcard" body-style="padding:0px" shadow="never" style="border:none">
        <el-form :inline="true" class="demo-form-inline formCard" size="medium">
          <el-form-item label="区域搜索：" style="line-height:58.8px">
            <el-input v-model="page.className" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getSkuClassSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <!-- 列表 -->
    <el-card>
      <el-button class="tableBtn" type="warning" icon="el-icon-circle-plus-outline" @click="add">新建</el-button>

      <AreaTabel :thead="thead" :area-list="currentPageRecords">
        <template #amend="{ row }">
          <el-button type="text" @click="amend(row)">修改</el-button>
        </template>
        <template #del="{ row }">
          <el-button style="color:red" type="text" @click="del(row)">
            删除
          </el-button>
        </template>
      </AreaTabel>
    </el-card>

    <!-- //新建 -->
    <addGoodstype ref="addGoodstype" :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import AreaTabel from '@/components/AreaTabel'
import addGoodstype from './components/addGoodstype.vue'
import { getSkuClassSearch } from '@/api/permission'
export default {
  name: 'GoodsType',
  components: { AreaTabel, addGoodstype },
  data() {
    return {
      thead: [
        { label: '商品类型名称', props: 'className' }
      ],
      page: {
        pageIndex: 1,
        pageSize: 10,
        className: null
      },
      currentPageRecords: [], // 列表数据
      totalCount: null, // 总数
      totalPage: null, // 总页数
      dialogVisible: false // 添加弹出
    }
  },
  mounted() {
    this.getSkuClassSearch()
  },
  methods: {
    async getSkuClassSearch() {
      const { data: { currentPageRecords, pageIndex, pageSize, totalCount, totalPage }} = await getSkuClassSearch(this.page)
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
      console.log(row)
      this.$refs.addGoodstype.formData = { ...row }
      this.dialogVisible = true
    },

    // 删除
    del() {
      const h = this.$createElement

      this.$notify({
        iconClass: 'el-icon-warning',
        title: '提示',
        message: h('i', { style: 'color: #000' }, '演示系统，不支持此操作')
      })
    }
  }
}
</script>

<style scoped>

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
</style>
