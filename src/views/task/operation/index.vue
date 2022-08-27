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
export default {
  name: 'Operation',
  components: { myList, myHeader },
  data() {
    return {

    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
  .search{
    margin-bottom: 20px;
  }
</style>
