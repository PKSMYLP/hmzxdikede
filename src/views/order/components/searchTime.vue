<template>
  <div>
    <el-card shadow="naver">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item v-if="searchName==='order'" label="订单管理：">
          <el-input v-model="search.orderNo" placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item v-if="searchName==='report'" label="合作商：">
          <el-select v-model="search.partnerName" placeholder="请选择">
            <el-option label="金燕龙合作商" value="金燕龙合作商" />
            <el-option label="天华物业" value="天华物业" />
            <el-option label="金燕龙物业" value="金燕龙物业" />
            <el-option label="北京合作商" value="北京合作商" />
          </el-select>

        </el-form-item>
        <el-form-item :label="datas">
          <el-date-picker
            v-model="search.startDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="center"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchProlicy">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { formatDates } from '@/filters'
import SearchNames from '@/assets/constant/radar'
export default {
  props: {
    showcomments: {
      type: String,
      default: ''
    },
    time: {
      type: Object,
      default: () => [{}]
    }
  },
  data() {
    return {
      search: {
        orderNo: '',
        startDate: [],
        endDate: '',
        partnerName: ''
      },
      searchName: '',
      datas: ''
    }
  },
  computed: {
    searchs() {
      return {
        orderNo: this.search.orderNo,
        startDate: formatDates(this.search.startDate[0]),
        endDate: formatDates(this.search.startDate[1]),
        partnerName: this.search.partnerName
      }
    }
  },
  created() {
    SearchNames.searchName.find(ele => {
      if (ele.name === this.showcomments) {
        this.searchName = ele.name
        this.datas = ele.data
      }
    })
    this.changetime()
  },
  mounted() {
  },
  methods: {
    searchProlicy() {
      this.searchs.startDate = this.searchs.startDate === 'NaN-aN-aN' ? '' : this.searchs.startDate
      this.searchs.endDate = this.searchs.endDate === 'NaN-aN-aN' ? '' : this.searchs.endDate
      this.$emit('searchProlicy', this.searchs)
    },
    changetime() {
      this.search.startDate[0] = this.time.start
      this.search.startDate[1] = this.time.end
    }
  }
}
</script>

  <style scoped>
  .el-form-item {
      margin-bottom: 0;
    }
  </style>

