<template>
  <el-card class="box-card">
    <el-row type="flex" align="middle">

      <!-- 定义前面得插槽 -->
      <slot name="before" />

    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'MyHeader',
  components: {},
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
 .box-card{
  width: 100%;

 }
 ::v-deep .el-card__body {
    padding: 10px;
}
</style>
