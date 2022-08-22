<template>
  <div class="dashboard-container">
    1111
    <div class="dashboard-text">name: {{ name }}</div>
    <myPagination :total="total" :current-page="currentPage" @changePage="change" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import myPagination from '@/components/myPagination'
export default {
  name: 'Dashboard',
  components: {
    myPagination
  },
  data() {
    return {
      total: 30,
      currentPage: 1
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
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
