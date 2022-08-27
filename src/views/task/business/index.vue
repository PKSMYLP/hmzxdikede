<template>
  <div>
    <div class="search">
      <myHeader />
    </div>
    <myList />
  </div>
</template>

<script>
import myHeader from '@/components/myHeader'
import myList from '@/components/myList'
import { taskListApi } from '@/api/task'
export default {
  name: 'Business',
  components: { myList, myHeader },
  data() {
    return {
      page: {
        pageIndex: 1, // 当前页码
        pageSize: 10, // 当前页的数据量
        isRepair: false // 是否维修工单
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.gettaskListApi()
  },
  mounted() {

  },
  methods: {
    // 工单列单每页
    async gettaskListApi() {
      const res = await taskListApi(this.page)
      console.log(res)
    }
  }
}
</script>
<style scoped lang="scss">
  .search{
    margin-bottom: 20px;
  }
</style>
