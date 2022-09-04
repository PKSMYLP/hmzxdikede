<template>
  <div ref="myDiv3" class="chart" />
</template>

<script>
import * as echarts from 'echarts'

import { nodeCollect } from '@/api/home'
export default {
  name: '',
  components: {},
  data() {
    return {
      data1: [],
      data: { value: '', name: '' }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.nodeCollect()
  },
  mounted() {

  },
  methods: {
    async nodeCollect() {
      try {
        const res = await nodeCollect()
        // res.data.map(ele => {
        //   this.data.value = ele.value
        //   this.data.name = ele.name
        //   return this.data1.push(this.data)
        // })
        this.data1 = res.data
        console.log(this.data1)
        const option = {
          tooltip: {
            formatter: ' {b} <br /> 总占比： {d}%'
          },
          label: {
            formatter: ' {b} \n {d}%'
          },
          series: [
            {
              type: 'pie',
              radius: [40, 100],
              center: ['50%', '50%'],
              roseType: 'radius',
              data: this.data1
            }
          ]
        }
        const myChart = echarts.init(this.$refs.myDiv3) // 得到图表实例
        myChart.setOption(option)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style scoped>
.chart{
      height: 300px;
    width: 100%;

}
</style>
