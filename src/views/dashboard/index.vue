<template>
  <div class="dashboard-container">
    主页
    <!-- 分页组件 -->
    <!-- <myPagination :total="total" :current-page="currentPage" @changePage="change" /> -->

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称" prop="c">
        <el-select v-model="form.c" placeholder="请选择">
          <el-option
            v-for="item in list"
            :key="item.value"
            :label="item.a"
            :value="item.b"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

// import myPagination from '@/components/myPagination'
export default {
  name: 'Dashboard',
  components: {
    // myPagination
  },
  data() {
    return {
      total: 30,
      currentPage: 1,
      form: {
        c: '',
        d: ''
      },
      list: [
        { a: '大', b: 2 }, { a: '啊啊', b: 4 }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },

  methods: {
    change(val) {
      this.currentPage = val
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin:0, 30px,30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
