<template>
  <div id="main" style="padding:20px">
    <!-- 上面 -->
    <el-row style="margin-left: -20px; margin-right: -20px;">
      <!-- 左 -->
      <el-col :span="18">
        <el-row>
          <!-- 工单统计 -->
          <el-col :span="13" style="padding-right: 10px;">
            <div class="box home-user-task-stats bgc1">
              <div class="header">
                <div class="title">
                  工单统计
                  <span class="sub-title">
                    {{ start1 }} ~ {{ end1 }}
                  </span>
                </div>
              </div>
              <div class="body">
                <div class="stats">
                  <div class="item">
                    <div class="num color1 text-shadow1">{{ total }}</div>
                    <div class="text color2">工单总数（个）</div>
                  </div>
                </div>
                <div class="stats">
                  <div class="item">
                    <div class="num color1 text-shadow1">{{ completedTotal }}</div>
                    <div class="text color2">完成工单（个）</div>
                  </div>
                </div>
                <div class="stats">
                  <div class="item">
                    <div class="num color1 text-shadow1">{{ progressTotal }}</div>
                    <div class="text color2">进行工单（个）</div>
                  </div>
                </div>
                <div class="stats">
                  <div class="item">
                    <div class="num color1 text-shadow1">{{ cancelTotal }}</div>
                    <div class="text color2">取消工单（个）</div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <!-- 销售统计 -->
          <el-col :span="11" style="padding-left: 10px;padding-right: 10px">
            <div class="box home-sku-sale-stats bgc2">
              <div class="header">
                <div class="title">
                  销售统计
                  <span class="sub-title">
                    {{ start1 }} ~ {{ end1 }}
                  </span>
                </div>
              </div>
              <div class="body">
                <div class="stats">
                  <div class="item">
                    <div class="num color3 text-shadow2">{{ num }}</div>
                    <div class="text color4">订单量（个）</div>
                  </div>
                </div>
                <div class="stats">
                  <div class="item">
                    <div class="num color3 text-shadow2">{{ money }}</div>
                    <div class="text color4">销售额（元）</div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="box sku-sale-collect" style=" margin-right: 10px;">
          <div class="header">
            <div class="title">
              销售数据
              <span class="sub-title">{{ year }} ~ {{ end1 }}</span>
            </div>
            <div class="week-month-year">
              <div :class="['item',{'is-checked':isSw===1} ] " @click="select(1)">周</div>
              <div :class="['item',{'is-checked':isSw===2} ]" @click="select(2)">月</div>
              <div :class="['item',{'is-checked':isSw===3} ] " @click="select(3)">年</div>
            </div>
          </div>
          <div class="charts">
            <myEcharts1 ref="myEcharts1" />
            <myEcharts2 ref="myEcharts2" />
          </div>
        </div>
      </el-col>
      <!-- 右  商品热榜-->
      <el-col :span="6" style="padding-left: 10px;">
        <div class="box bgc3 sku-sale-rank">
          <div class="header">
            <div class="title">
              商品热榜
              <span class="sub-title">{{ start1 }} ~ {{ end1 }}</span>
            </div>
          </div>
          <div class="body">
            <el-row v-for="(item,index) in list" :key="index">
              <!--  `top${index+1}`: isShow[index]==index-->
              <el-col :span="5"><div :class="['top','top4', {'top1': index == 0 },{'top2': index == 1 },{'top3': index ==2 }]">{{ index+1 }}</div></el-col>
              <el-col :span="13"><div class="sku-name">{{ item.skuName }}</div></el-col>
              <el-col :span="6"><div class="count">{{ item.count }}单</div></el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 下面 -->
    <el-row style="margin-left: -20px; margin-right: -20px; margin-top: 20px">
      <el-col :span="14" style=" padding-right: 20px; ">
        <div class="box partner-node-collect">
          <div class="header">
            <div class="title">合作商点位数Top5</div>
            <i class="el-icon-chat-dot-round more" @click="$router.push('/node/partner')" />
          </div>
          <el-row class="body">
            <el-col :span="17" style="padding-left: 10px;">
              <myEcharts3 />
            </el-col>
            <el-col :span="7" style="padding-left: 10px;">
              <div class="collect">
                <div class="count">{{ nodeCount1 }}</div>
                <div class="name">点位数</div>
                <div class="count count2">{{ partnerCount1 }}</div>
                <div class="name">合作商数</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="box abnormal-equipment">
          <div class="header">
            <div class="title">异常设备监控</div>
            <i class="el-icon-chat-dot-round more" />
          </div>
          <div class="empty">
            <img src="	http://likede2-admin.itheima.net/img/empty.87c4f71b.png" alt="">
            <div class="tips">暂无数据</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { taskReportInfo, orderCount, orderAmount, skuTop, nodeCount, partnerCount } from '@/api/home'
import myEcharts1 from './components/myEcharts1.vue'
import myEcharts2 from './components/myEcharts2.vue'
import myEcharts3 from './components/myEcharts3.vue'
import dayjs from 'dayjs'
export default {
  name: '',
  components: { myEcharts1, myEcharts2, myEcharts3 },
  data() {
    return {
      isSw: 1,
      time: '',
      start: '',
      end: '',
      start1: '',
      end1: '',
      start11: '',
      start2: '',
      end2: '',
      total: 0,
      completedTotal: 0,
      progressTotal: 0,
      cancelTotal: 0,
      num: 0,
      money: 0,
      topValue: 10,
      list: [],
      year: '',
      nodeCount1: '',
      partnerCount1: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    this.taskReportInfo()
    this.orderAmount()
    this.orderCount()
    this.skuTop()
    this.nodeCount()
    this.partnerCount()
  },
  mounted() {

  },
  methods: {
    // 工单统计
    async taskReportInfo() {
      try {
        this.time = +new Date()
        this.start = dayjs(this.time).startOf('month').format('YYYY-MM-DD%') + '2000:00:00'
        this.end = dayjs(+new Date()).format('YYYY-MM-DD%') + '2023:59:59'
        this.start1 = dayjs(this.time).startOf('month').format('YYYY-MM-DD')
        this.end1 = dayjs(+new Date()).format('YYYY-MM-DD')
        this.year = new Date()
        this.year = this.year.getFullYear() + '.01.01'
        console.log(this.year)
        const { data } = await taskReportInfo(this.start, this.end)
        this.total = data.reduce((pre, cur) => {
          return pre + cur.total
        }, 0)
        this.completedTotal = data.reduce((pre, cur) => {
          return pre + cur.completedTotal
        }, 0)
        this.progressTotal = data.reduce((pre, cur) => {
          return pre + cur.progressTotal
        }, 0)
        this.cancelTotal = data.reduce((pre, cur) => {
          return pre + cur.cancelTotal
        }, 0)
      } catch (error) {
        console.log(error)
      }
    },
    // 销售统计 订单总数
    async orderCount() {
      try {
        // const start = this.start2
        // const end = this.end2
        const { data } = await orderCount({
          start: this.start2,
          end: this.end2
        })
        this.num = data
      } catch (error) {
        console.log(error)
      }
    },
    // 销售统计 订单收入
    async orderAmount() {
      try {
        this.start2 = dayjs(this.time).startOf('month').format('YYYY-MM-DD 00:00:00')
        this.end2 = dayjs(+new Date()).format('YYYY-MM-DD 23:59:59')
        const { data } = await orderAmount({
          start: this.start2,
          end: this.end2
        })
        this.money = data / 100
      } catch (error) {
        console.log(error)
      }
    },
    // 商品热榜
    async skuTop() {
      try {
        const res = await skuTop(this.topValue, this.start1, this.end1)
        this.list = res.data
      } catch (error) {
        console.log(error)
      }
    },
    // echarts 切换
    select(val) {
      this.isSw = val
      this.$refs.myEcharts1.amountCollect(val)
      this.$refs.myEcharts2.regionCollect(val)
    },
    // 获取点位总数
    async nodeCount() {
      try {
        const res = await nodeCount()
        this.nodeCount1 = res.data
      } catch (error) {
        console.log(error)
      }
    },
    // 获取合作商总数
    async partnerCount() {
      try {
        const res = await partnerCount()
        this.partnerCount1 = res.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .bgc1{
    background: #e9f3ff;
    background-image: url(http://likede2-admin.itheima.net/img/task.66b715b7.png);
    background-repeat: no-repeat,no-repeat;
    background-position: 0 0,calc(100% - 12px) 100%;
  }
  .box{
    padding: 20px;
  }
  .home-sku-sale-stats{
    height: calc(20vh - 24px);
        display: flex;
        flex-direction: column;
    min-height: 166px;
    border-radius: 20px;
  .header{
      .title {
      align-items: center;

    font-size: 16px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    color: #333;
    .sub-title{
          margin-left: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #999;

  }
    }
    }

  .body{
    flex: 1;
    display: flex;
      .stats{
        flex: 1;
        align-items: center;
        justify-content: center;
        display: flex;
        .item{
          display: inline-flex;
          flex-direction: column;
          .text-shadow2{
            text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);

          }
          .color3{
               color: #ff5757;
          }
          .num{
            height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    line-height: 50px;
          }
          .color4{
            color: #91a7dc;
                color: #de9690;
          }
          .text{
            height: 17px;
            margin-top: 3px;
            font-size: 12px;
            font-family: PingFangSC-Regular,PingFang SC;
            font-weight: 400;
            line-height: 17px;
          }
        }
      }
  }
  }
  .bgc2{
    background: #fbefe8 url(http://likede2-admin.itheima.net/img/sale.606b0d8c.png) no-repeat calc(100% - 12px) 100%;
    }
    .home-user-task-stats{
    height: calc(20vh - 24px);
        display: flex;
        flex-direction: column;
    min-height: 166px;
    border-radius: 20px;
  .header{
      .title {
      align-items: center;

    font-size: 16px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    color: #333;
    .sub-title{
          margin-left: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #999;

  }
    }
    }

  .body{
    flex: 1;
    display: flex;
      .stats{
        flex: 1;
        align-items: center;
        justify-content: center;
        display: flex;
        .item{
          display: inline-flex;
          flex-direction: column;
          .text-shadow1{
            text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);

          }
          .color1{
            color: #072074;
          }
          .num{
            height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    line-height: 50px;
          }
          .color2{
            color: #91a7dc;
          }
          .text{
            height: 17px;
            margin-top: 3px;
            font-size: 12px;
            font-family: PingFangSC-Regular,PingFang SC;
            font-weight: 400;
            line-height: 17px;
          }
        }
      }
  }
  }
  .sku-sale-rank{
    display: flex;
    flex-direction: column;
    height: calc(60vh - 72px);
    min-height: 538px;
    background: #fff;
    border-radius: 20px;
    .header{

      .title{
        flex: 1;
        font-size: 16px;
        font-family: PingFangSC-Semibold,PingFang SC;
        font-weight: 600;
        color: #333;
        align-items: center;
        .sub-title{
          margin-left: 10px;
          font-size: 12px;
          font-family: PingFangSC-Regular,PingFang SC;
          font-weight: 400;
          color: #999;
        }
      }
    }
    .body{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 20px;
      .top{
        display: inline-block;
        margin-left: 10px;
        text-align: center;
        font-size: 12px;
        font-family: zihun143-zhengkuchaojihei,zihun143;
        font-weight: 400;
        line-height: 14px;
      }
      .top4{
          width: 21px;
         height: 20px;
        background: url('~@/assets/common/top4.png');
        color: #e9b499;
      }
      .top3{
            width: 21px;
    height: 20px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAACd0lEQVQ4T82VMWgUQRSGv3fLabQWi4AI6VIKIiEWIgSDJiSoIFhZBEzAgCgpLAQPTLAWo5yRbSwURBHDRTSmECSKcgiGaMBOLIJ2FpqcuzNPZnb33MvGRDuvuZ2Ze9/8773/7QlrPvpicBKj24gtGAUTgwFik65J9mJ3ZsHqigzNj+YxUoA+Hwg9UNMg9xwpqIMCUQpUd6n1cDn9aqgFqjNcRmlvbrb1J4pcUOSVJMFuL05VG3dBAvTfu17nmcuiNULpp3mTPusLk4As/QyYKmsCXRmSksjom9/xjleAPjmcpO/ruQnQZRGDnC1Cp6gzIhWsy0FrveG6QA9w5TAQpSpdhLHIubpXqvcI2M4Np3SCMlXp5bM/eHQoxOaUuro61Tatp2ta/txBx94m0BodwCnRGfqBDvq4Jq7nD3tC3wAfmGtGsxSpC/zaePVy4d2QViixl/NYFkRvUqadMYRv/OQ+9uAVTKnViy21zWqdAL3VOhcrBByjRMB3rnqfap0yy/QhdPGjawfxVmnaxVsrrWezeS6D1FZbGkrnxy8o86zwVE5giua/c+AksfYknc913w2D9202DJlnZU4uLdzdeKJud+9ES+MYG3i1DpSfrha1zgrBRaksfN0Q6stxa/8RVI9n5i4OQ9rA2DyQ8aXHa0e9kH72A53qGqBhB7BWWofBl0RRnZbK++m1QLf+I9QrntyzmzjoQVe7aQiUYmgEL1k1czKx9Gk94KbQpuoaYfacf0/8P1Ctd15HaSsoUlZl39KZf1Kqs0er2KhMFKUmd0aP0rF0z86jbq2RDC+O/FX3dXawShyXk7+NHNDPerZ2YBPJ8IcC9BfAsOweLKuvfgAAAABJRU5ErkJggg==);
    color: #cf6d3d;
      }

      .top2{
            width: 21px;
    height: 20px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAACF0lEQVQ4T8WTz4vTUBDHZzYUbcEf9NBzkhaKnsRCFEqhFHqJCXv1IP4L620XBEVB0IPgXj2Jx/4DevHSW6EULw2WdpOWliKUFn+BNu+9jrxAS0zTbvZk4JE3TN7nfb+TGYTIs1gsvgkhrgkhQK7VahW898TfS6XS9TAGo9DZbEZJgOHLDMP4h4Oe53WJ6OYanslkNuoSqAwc5HK5jTZEdNB1XdJ1fXPTdDoNlIaBUXg0Xy6XN+clbws6mUwS2Q+DK5XKFtTXNC2NiEJ6GI1GsdB9aqvVagBtt9upbDb7Syr9goj3NU37LBOe5+1UuqsstVotgHqed5eI3uJwOHxMRHdUVT1ERBoMBheuab1ex0ajoRiG8VEI8QH7/f4lRVE+AcBXIcQxEQ12tVScUlmWQqFwCwBeAEBK07R7gezxeJzmnJ8AwAPGmMoYOwg3fBgWra2iKKt8Pt8HgHeqqr5GRLbV/I7jvOGcHyWcJiCiU9M0H+2dqG63W2CMOUKIVBw4opoh4g3TNM/2QmWy0+kcc85fnjdRAHBiWdar6Khv2V9/0Gq1nnLOnwghDmJ6dEVEz23bfhYFyngnVCabzeZtIjoCgIe+7wMigu/774UQp7Ztd+KA50LXh3q9Hq33xWJxr5D/A3Vd9wcAXImx+VPX9asXsj+fz3/7vn9Z1pExJuu4WeGYMfbHsqx0or8vocvlMhHUtu0t6F9KkMngoAlOWAAAAABJRU5ErkJggg==);
    color: #494949;
      }
      .top1{
        width: 21px;
    height: 20px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAACMElEQVQ4T82UPWgUURDHf3OXQy/4VYqVgoWKhYioKIaAhmguicaAWIitZewSEBQFQQvBtFZimdIEFSFFVBI/clFQz4OYRgQt1YgnuX1vZPdud9/tbhLt3Oa9fbv7m//M/GeFxKWfT33D2I1YBWPBKNjmGuwT51a/y+GpTS5GUtBP/RqAfGAASOyjAPFz6XjSwhGd4D3Krgi+uy+tJgA7ilvUKiw+jbUJFdFxVPqIIulCb0NpqMhN3VXvnMvRZ/H3Pi8FnS9pXEu3fonaRgEs0jWdgE6wxC+Kcgbj56DVExrVcrlmJRRL90wA1VkKfOGnr7RKjrNS4k3woHI8hrZ0PmyM28BGJtLzvAG9z0Fy3PEbdQnhAD2cFEH1XXczfbLrmmEv6X0hOkaedh6hPBR9wBoskyhf8Rhm27GPqDiWCr0a2iusbXhuQGb3IFxHKbCOUkP2GEXaGQHOsfnQVqSYa/gzafxwCJwS2Jol/3Ye5S5buCX7qKfN/7rrNnUztKrxw+lSRmXg1cWVJ2q6czt5qWC0kGmtUH1j2uqI7pSB8sKK0KAcM53DePZGrNYdVSd1dEROl28mRz2VfviCTnVcwdjLGM3F0xUNg0XtNRmcu5oE+vfLQgPFk0f24tkhTO08tg3sEti2exgdlcHyXBZwVWikehwN9+5/4v+B6ssdP4D1GYoWZX91wz8p1cf9NTyzFuOBMeD5q9dcTXNvwHq/5UKl+Ffdj6BZMDdIAP2Qgv4B21H4JL7cBkgAAAAASUVORK5CYII=);
    color: #8e5900;
      }
      }
      .sku-name{
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Medium,PingFang SC;
        font-weight: 500;
        color: #333;
        line-height: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .count{
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular,PingFang SC;
        font-weight: 400;
        color: #737589;
        line-height: 20px;
        text-align: right;
      }
    }
  .sku-sale-collect{
    display: flex;
    flex-direction: column;
    height: calc(40vh - 68px);
    min-height: 352px;
    margin-top: 20px;
    background: #fff;
    border-radius: 20px;
    .header{
      display: flex;
      .title{
        align-items: center;
        flex: 1;
        font-size: 16px;
        font-family: PingFangSC-Semibold,PingFang SC;
        font-weight: 600;
        color: #333;
        .sub-title {
          margin-left: 10px;
          font-size: 12px;
          font-family: PingFangSC-Regular,PingFang SC;
          font-weight: 400;
          color: #999;
        }
      }
      .week-month-year{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 129px;
        height: 34px;
        background: rgba(233,243,255,.37);
        border-radius: 10px;
        .item{
          display: flex;
        justify-content: center;
        align-items: center;
          width: 37px;
          height: 25px;
          font-size: 14px;
          color: #9ca3b4;
          cursor: pointer;
        }
        .is-checked{
          background: #fff;
          box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
          border-radius: 7px;
          font-weight: 600;
          color: #333;
        }
      }
    }
  }
  .partner-node-collect{
    display: flex;
    flex-direction: column;
    height: calc(40vh - 48px);
    min-height: 353px;
    background: #fff;
    border-radius: 20px;
    .header{
      display: flex;
      .title {
        align-items: center;
        flex: 1;
        font-size: 16px;
        font-family: PingFangSC-Semibold,PingFang SC;
        font-weight: 600;
        color: #333;
      }
      .more{
        width: 16px;
    height: 16px;
    color: #5f84ff;
    cursor: pointer;
      }
    }
    .body{
      flex: 1;
      display: flex;
      align-items: center;
      .collect{
        width: 154px;
    height: 230px;
    padding-top: 47px;
    padding-left: 38px;
    background: linear-gradient(135deg,transparent,#f8f8f9 0) 0 0,linear-gradient(-135deg,transparent 12px,#f8f8f9 0) 100% 0,linear-gradient(-45deg,transparent,#f8f8f9 0) 100% 100%,linear-gradient(45deg,transparent 12px,#f8f8f9 0) 0 100%;
    background-size: 50% 50%;
    background-repeat: no-repeat;
      .count{
            height: 33px;
        font-size: 24px;
        font-family: PingFangSC-Semibold,PingFang SC;
        font-weight: 600;
        color: #072074;
    line-height: 33px;
      }
      .name{
            height: 17px;
    margin-top: 6px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #000412;
    line-height: 17px;
      }
      .count2{
        margin-top: 20px;
      }
      }
    }
  }
  .abnormal-equipment{
    display: flex;
    flex-direction: column;
    height: calc(40vh - 48px);
    min-height: 353px;
    background: #fff;
    border-radius: 20px;
    .header{
      display: flex;
      .title {
            align-items: center;
            flex: 1;
    font-size: 16px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    color: #333;
      }
      .more{
        width: 16px;
    height: 16px;
    color: #5f84ff;
    cursor: pointer;
      }
    }
    .empty{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .tips{
            margin-top: 25px;
    color: #20232a;
    font-size: 14px;
      }
    }
  }
</style>
