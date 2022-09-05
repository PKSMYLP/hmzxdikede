<template>
  <div>
    <el-upload v-loading="loading" element-loading-text="上传中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" action="#" :file-list="fileList" list-type="picture-card" :on-change="onChange" :http-request="oRequest" :on-remove="onRemove" :on-preview="onPreview" :before-upload="beforeUpload" :limit="1" :class="fileList.length === 1 ? 'hideAdd' : ''">
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片预览" :visible.sync="previewImgDialogVisible">
      <img style="width: 100%" :src="imgUrl">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDhCRRBeqlOlshFWWFgqjMimZ6MN7ZkeHd',
  SecretKey: '6vTjLhlY3JHyNWO0MSHrACxReZEbhW5M'
})
console.log(cos)
export default {

  name: 'ImageUpload',
  props: {
    limit: {
      type: Number,
      default: 2
    },
    beforeUploadCheck: Function
  },
  data() {
    return {
      fileList: [],
      previewImgDialogVisible: false,
      imgUrl: '',
      loading: false
    }
  },
  methods: {
    // 文件状态发生变化
    onChange(file, fileList) {
      console.log('上传图片', file, fileList)
      this.fileList = fileList
    },
    // 自定义请求
    oRequest(data) {
      this.loading = true
      cos.putObject({
        Bucket: 'renzi-1301958948', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: data.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        StorageClass: 'STANDARD',
        Body: data.file, // 上传文件对象
        onProgress: function (progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        if (!err && data.statusCode === 200) {
          this.$emit('onSuccess', {
            url: 'https:' + data.Location
          })
          this.loading = false
        }
        console.log(data)
      })
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      this.previewImgDialogVisible = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      if (this.beforeUploadCheck && !this.beforeUploadCheck(file)) {
        return false
      }
      // 一般分两种情况
      // 自定义 完全 ==》所有的逻辑取决于 自定义， 自定义和默认是相互排斥的
      // if (this.beforeUploadCheck) {
      //   return this.beforeUploadCheck(file)
      // }
      // 自定义 完全 ==》所有的逻辑取决于 先自定义 再默认， 自定义和默认是不相互排斥的

      // if (this.beforeUploadCheck && !this.beforeUploadCheck(file)) {
      //   return false
      // }
      // 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      return true
    }
  }
}
</script>
<style scoped lang="scss">
.hideAdd .el-upload--picture-card {
  display: none;
}
</style>
