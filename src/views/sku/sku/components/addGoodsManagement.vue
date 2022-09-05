<template>
  <div>
    <el-dialog :title="`${formData.skuId?'修改':'新增'}商品`" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">

      <el-form ref="addForm" :label-position="labelPosition" label-width="120px" :model="formData">

        <el-form-item label="商品名称:" style="width:520px" prop="name">
          <el-input v-model="formData.skuName" placeholder="请输入" show-word-limit maxlength="15" />
        </el-form-item>

        <el-form-item label="品牌:" style="width:520px" prop="name">
          <el-input v-model="formData.brandName" placeholder="请输入" show-word-limit maxlength="15" />
        </el-form-item>

        <el-form-item label="商品价格（元）:" style="width:520px" prop="businessId">
          <el-input-number v-model="formData.price" controls-position="right" :min="0.00" style="width:400px" :step="0.5" />
        </el-form-item>

        <el-form-item label="商品类型：" style="width:520px" prop="ownerName">
          <el-select ref="select" v-model="formData.classId" placeholder="请选择" size="medium" clearable style="width:400px">
            <el-option v-for="item in currentPageRecords" :key="item.id" :label="item.className" :value="item.classId" />
          </el-select>
        </el-form-item>

        <el-form-item label="规格：" style="width:520px" prop="name">
          <el-input v-model="formData.unit" placeholder="请输入" show-word-limit maxlength="15" />
        </el-form-item>

        <el-form-item label="商品图片：" prop="addr">

          <!-- <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-upload avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg、png文件，且不超过100kb</div>
          </el-upload> -->
          <ImageUpload ref="ImageUpload" @onSuccess="success" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button style="margin-right:15px" class="primary1">取 消</el-button>
        <el-button type="primary" class="primary2" @click="addGoods">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ImageUpload from '@/ImageUpload'
import { getSkuClassSearch, addGoods, amendGoods } from '@/api/permission'
export default {
  components: { ImageUpload },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    rowObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      labelPosition: 'right',
      formData: {
        skuName: '',
        brandName: '',
        price: null,
        classId: null,
        unit: '',
        skuImage: ''
      },
      currentPageRecords: [] // 商品类型数据
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.getSkuClassSearch()
      }
    }

  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.addForm.resetFields()
      this.formData = {
        skuName: '',
        brandName: '',
        price: null,
        classId: null,
        unit: '',
        skuImage: '',
        skuId: null
      }
    },
    // 图片
    success(data) {
      console.log(data.url)
      this.formData.skuImage = data.url
    },
    // 获取商品类型
    async getSkuClassSearch() {
      const res = await getSkuClassSearch({ pageIndex: 1, pageSize: 100000 })
      console.log('🚀 ~ file: addGoodsManagement.vue ~ line 96 ~ getSkuClassSearch ~ res', res)
      this.currentPageRecords = res.data.currentPageRecords
      if (this.formData.skuId) {
        this.$refs.ImageUpload.fileList.push({ url: this.rowObj.skuImage })
      }
    },

    // 新增
    async addGoods() {
      try {
        this.formData.skuId ? await amendGoods(this.formData.skuId, this.formData) : await addGoods(this.formData)
        this.handleClose()
        this.$message.success(`${this.formData.skuId ? '修改' : '添加'}成功`)
        this.$parent.getGoodsList()
      } catch (error) {
        console.log('🚀 ~ file: addGoodsManagement.vue ~ line 119 ~ addGoods ~ error', error)
      }
    }
  }
}
</script>

<style scoped>

</style>
