<template>
  <div ref="myDiv2" class="chart" />
</template>

<script>
import * as echarts from 'echarts'
import { regionCollect } from '@/api/home'
import dayjs from 'dayjs'
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')
export default {
  name: '',
  components: {},
  data() {
    return {
      data1: [],
      data2: [],
      start1: '',
      start2: '',
      start3: '',
      end: '',
      option: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    this.regionCollect()
  },
  mounted() {
  },
  methods: {
    async regionCollect(val) {
      try {
        const getEcharts = () => {
          this.option = {
            tooltip: {
              formatter: '销售额: {c} <br/> {b}'
            },
            grid: {
              left: '15%'
            },
            title: {
              left: 'center',
              text: '销售额分布'
            },
            xAxis: {
              type: 'category',
              boundaryGap: true,
              data: this.data2
            },
            yAxis: {
              type: 'value',
              name: '单位：元'
            },
            series: [
              {
                data: this.data1,
                type: 'bar',
                barWidth: 15, // 柱状宽度
                itemStyle: { // 柱状颜色和圆角
                  color: '#9fc1ff',
                  barBorderRadius: [5, 5, 0, 0] // （顺时针左上，右上，右下，左下）
                }

              }
            ]
          }
          const myChart = echarts.init(this.$refs.myDiv2) // 得到图表实例
          myChart.setOption(this.option)
        }
        const time = +new Date()
        this.start1 = dayjs(time).startOf('week').format('YYYY-MM-DD') // 周
        this.start2 = dayjs(time).startOf('month').format('YYYY-MM-DD') // 月
        this.start3 = dayjs(time).startOf('year').format('YYYY-MM-DD') // 年
        this.end = dayjs(time).format('YYYY-MM-DD')
        if (val === 3) {
          const { data } = await regionCollect(this.start3, this.end)
          this.data1 = data.series.map(ele => ele / 100)
          this.data2 = data.xAxis
          return getEcharts()
        } else if (val === 2) {
          const { data } = await regionCollect(this.start2, this.end)
          this.data1 = data.series.map(ele => ele / 100)
          this.data2 = data.xAxis
          return getEcharts()
        }
        const { data } = await regionCollect(this.start1, this.end)
        this.data1 = data.series.map(ele => ele / 100)
        this.data2 = data.xAxis
        getEcharts()
        // if (val === 1) {
        //   const res = await amountCollect(1, this.start1, this.end)
        //   console.log(res, 11)
        // } else if (val === 2) {
        // // 月
        //   const res = await amountCollect(1, this.start2, this.end)
        //   console.log(res, 22)
        // } else {
        // // 年
        //   const res = await amountCollect(2, this.start3, this.end)
        //   console.log(res, 33)
        // }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style scoped>
.chart {
  display: inline-block;
    width: 50%;
    height: 278px;

}
</style>
