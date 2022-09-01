<template>
<div>
  <el-upload 
  action="#"
   v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  list-type="picture-card" 
  :file-list="fileList" 
  :on-change="handleChange"
  :http-request="onRequest"
  :on-remove="handleRemove"
  :on-preview="handlePreview"
  :limit="limit"
  :class="`${fileList.length === limit ? 'hideCard' : ''}`"
   :before-upload="beforeAvatarUpload">
  
<i class="el-icon-plus" />
  </el-upload>
  <el-dialog :visible.sync="previewImg">
    <img style="width: 100%" :src="imgUrl" alt="">
  </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDxnU9dNwPj2DFA4sdN4mQ1cBbt570kR3Y',
  SecretKey: 'VskT2SvDRlx0qVzIQVSDk5FJcq6b7hHo'
})
console.log(cos)
export default {
  name: 'UploadImg',
  props: {
    limit: {
        type:Number,
        default:1
    }
  },
  data() {
    return {
      fileList: [],
      previewImg:false,
      imgUrl:'',
      loading: false
    }
  },
  methods: {
    handleChange(file,fileList) {
        console.log(fileList);
        console.log(this.fileList);
        this.fileList = fileList;
    },
    onRequest(data) {
        this.loading = true;
  cos.putObject({
  Bucket: 'lihongbin-1313544756', /* 填入您自己的存储桶，必须字段 */
  Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
  Key: data.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
  StorageClass: 'STANDARD',
  Body: data.file, // 上传文件对象
  onProgress: function(progressData) {
     console.log(JSON.stringify(progressData))
    // 这个就是上传的百分比
    // params.percent 表示当前上传的进度
  }
},(err, data) => {
  console.log(err || data)
  this.loading = false
//   把图片的地址传给后端
  if (err || data.statusCode !== 200) {
    return this.$message.error('图片上传有误，请重新尝试')
  }
  this.$emit('onSuccess',{
    url: 'http://' + data.Location
  })
})
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
        this.fileList = fileList;
      },
    handlePreview(file) {
        console.log(file);
        this.previewImg= true;
        this.imgUrl=file.url
      },    
    beforeAvatarUpload(file) {
        const types = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp','img/jpg']
        if (!types.includes(file.type)) {
            this.$message.error(`请选项${types.join(',')}图片格式`)
            return false
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
         if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
          return false
        }
    }
  }
}
</script>

<style lang="scss">
.hideCard {
  .el-upload--picture-card{
        display: none;
    }  
}

</style>