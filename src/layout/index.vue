<template>
  <div :class="classObj" class="app-wrapper">
    <div style="width:100%; height:60px; " class="topnavbar">
      <!-- navbar 顶部左边 图片 -->
      <img src="@/assets/common/navbar.png" class="img" alt="">
      <!-- 顶部 右边 退出-->
      <div class="right-menu">
        <el-row>
          <!-- 头像 -->
          <el-col :span="5">
            <div style="height: 60px; line-height: 60px;">
              <img src="@/assets/common/头像.png" alt="" class="img1">
            </div>
          </el-col>
          <!-- 欢迎词 -->
          <el-col :span="14">
            <div style="height: 60px; line-height: 60px;">
              <span style="vertical-align: middle;">欢迎您，admin</span>
            </div>
          </el-col>
          <!-- 退出 -->
          <el-col :span="5">
            <el-tooltip content="退出登录" placement="bottom" style="height: 60px; line-height: 60px;">
              <div @click="logout">
                <span style="vertical-align: middle; cursor: pointer;">退出</span>
                <span class="el-icon-caret-bottom" style="vertical-align: middle; cursor: pointer;" />
              </div>
            </el-tooltip>

          </el-col>
        </el-row>
      </div>
    </div>
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">

      <div :class="{'fixed-header':fixedHeader}">
        <!-- <navbar /> -->
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>

import { Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  created() {

  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    // 退出
    async logout() {
      console.log(1)
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
      console.log(this.$store)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    // background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
  .img{

    margin-top: 6px;
    margin-left: 15px;
    position: relative;
    top: 4px;
    width: 88px;
    height: 36px;
  }
  .topnavbar{
    position: sticky;
    top: 0;
    right: 0;
    z-index: 1999;
    background-image: url('~@/assets/common/bgi.png');
    .right-menu {
    float: right;
    width: 240px;
    height: 100%;
    margin-right: 24px;
    color: #fff;
    }
  }
  .img1{
    vertical-align: middle
  }
</style>
