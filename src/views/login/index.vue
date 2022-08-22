<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">

      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/logo.595745bd.png" alt="" class="login-logo">
        </h3>
      </div>
      <!-- 账号 -->
      <el-form-item prop="loginName">
        <span class="svg-container el-icon-mobile-phone" />
        <el-input
          v-model="loginForm.loginName"
          placeholder="loginName"
        />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="svg-container el-icon-lock" />
        <el-input
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- 验证码 -->
      <div class="code el-row">
        <el-form-item class=" el-col el-col-15">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input v-model="loginForm.code" placeholder="请输入验证码" />
        </el-form-item>
        <div class="code2 el-col el-col-9" @click="getCode">
          <img :src="imgUrl" alt="">
        </div>
      </div>

      <!-- 登录 -->
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click="handleLogin">登录</el-button>

    </el-form>
  </div>
</template>

<script>
import { verificationCodeApi } from '@/api/user'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: '',
        loginType: 0,
        // clientToken: null,
        clientToken: Math.random()
      },
      loginRules: {
        loginName: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      imgUrl: ''
    }
  },
  async created() {
    const res = await verificationCodeApi(this.loginForm.clientToken)
    this.imgUrl = res.config.url
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 登录
    async handleLogin() {
      try {
        await this.$refs.loginForm.validate()
        this.loading = true
        await this.$store.dispatch('user/login', this.loginForm)
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 获取验证码
    async getCode() {
      this.loginForm.clientToken = Math.random()
      const res = await verificationCodeApi(this.loginForm.clientToken)
      this.imgUrl = window.URL.createObjectURL(res.data)
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: relative;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  // scss 样式表中使用@别名的时候，需要在@前面加上一个~符号，否则不识别
  background-image: url('~@/assets/common/background.be4fae7d.png');
  background-position: center;
  .login-form {
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 30px 35px 0;
    background: #fff;
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
   .login-logo{
    position: absolute;
    width: 96px;
    height: 96px;
    top: 50%;
    left: 50%;
    margin-left: -48px;
    margin-top: -115px;
}
.el-form-item{
  width: 100%;
    height: 52px;
    margin-bottom: 24px;
    background: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
}
::v-deep .code{
  display: flex;
  width: 100%;
  .code2{
    height: 52px;
    border: 1px solid #ccc;
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
::v-deep input {
  height: 47px;
    background: transparent;
    border: 0;
    border-radius: 0;
    padding: 12px 5px 12px 15px;
    color: #999;
    caret-color: #999;
    -webkit-appearance: none
}
}
</style>
