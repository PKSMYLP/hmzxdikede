<template>
  <div>
    <el-dialog title="数据导入" width="32%" height="40%" :visible="dialogVisible" :before-close="handleClose">
      <el-upload
        ref="upload"
        class="upload-demo"
        action="#"
        :multiple="false"
        :show-file-list="true"
        :before-upload="beforeUpload"
        :http-request="uploadHttpRequest"
        :file-list="fileList"
        :on-change="handleUploadChange"
      >
        <!-- <div slot="trigger" class="choose-file">
          <i class="icon" />
          选取Excel格式文件
        </div> -->
        标题： <el-button type="primary" class="choose-file" style="width:226px;height:36px">上传文件</el-button>

        <div slot="tip" class="el-upload-tip" style="margin-top:10px;margin-left: 37px;">
          支持扩展名：xls、xlsx，文件不得大于1M
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="uploadLoading" class="primary1" @click="handleClose">
          取消
        </el-button>
        <el-button type="primary" :loading="uploadLoading" class="primary2" @click="submitUpload">
          确认
        </el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import { importGoods } from '@/api/permission'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 加载动画
      uploadLoading: false,
      // 上传的文件列表
      fileList: [],
      // 控制弹出框显示与否
      uploadShowDialog: false,
      // 上传地址
      uploadURL: '',
      // loading加载中
      downloadLoading: ''

    }
  },
  methods: {
    // handleClose() {
    //   this.$emit('update:dialogVisible', false)
    // },

    handleClose() {
      this.$emit('update:dialogVisible', false)

      this.fileList = []

      setTimeout(() => {
        // 清空已上传的文件列表
        this.$refs.upload.clearFiles()
      }, 100)
    },

    // 限制文件上传的个数只有一个，获取上传列表的最后一个
    handleUploadChange(file, fileList) {
      if (fileList.length > 0) {
        // 这一步，是展示最后一次选择的文件
        this.fileList = [fileList[fileList.length - 1]]
      }
    },

    // 上传文件之前，先判断文件后缀和大小
    beforeUpload(file) {
      // 截取文件后缀名
      const fileName = file.name.substring(file.name.lastIndexOf('.'))
      if (fileName.toLowerCase() !== '.xls' && fileName.toLowerCase() !== '.xlsx') {
        this.$message.error('文件必须为.xls或xlsx类型')
        this.fileList = []
        return false
      }
      // 读取文件大小
      const fileSize = file.size
      console.log(fileSize)
      if (fileSize > 1048576) {
        this.uploadShowDialog = false
        this.$message({
          type: 'error',
          showClose: true,
          duration: 3000,
          message: '文件不能大于1M!'
        })
        return false
      }
    },

    // 覆盖element的默认上传文件
    uploadHttpRequest(data) { // data中有action属性
      console.log(data)
      console.log('上传地址为:' + this.uploadURL)
    },

    // 点击确定上传按钮
    async  submitUpload() {
      // loading加载中，通过this.downloadLoading.close()可关闭
      this.downloadLoading = this.$loading({
        lock: true,
        text: '数据导入中...',
        color: '#0183FF',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)'
      })
      if (this.fileList.length === 0) {
        this.$message({
          type: 'error',
          showClose: true,
          duration: 3000,
          message: '请选择要上传的文件'
        })
        return false
      }
      // 调接口上传
      /* eslint-disable */ 
      const formData = await importGoods(this.fileList)
      // 控制台打印file，找到要上传的file，图中.raw
      formData.append('file', file[0].raw)
      // 注：formData中的数据不能直接打印，需要用到get方法得到
      console.log(formData.get('file'))
      // ajax、axios等方法上传，这里不细说明
    }

  }
}
</script>

<style scoped>
.el-dialog__wrapper>>>.el-dialog__body {
  padding: 30px 98px;
}

.el-dialog__wrapper>>>.el-dialog {
  border-radius: 10px !important;
}

.dialog-footer {
  position: absolute;
  bottom: 30px;
  right: 165px;
  margin-bottom: 5px;
}

.primary1 {
  background-color: #fbf4f0 !important;
  border: none;
  color: #000;
  margin: 10px;
}

.primary2 {
  background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
  border: none;
}
.el-dialog__wrapper>>>.el-dialog__footer{
  padding: 45px;
}
</style>
