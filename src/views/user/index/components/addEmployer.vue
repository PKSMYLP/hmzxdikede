<template>
  <el-dialog
    :title="`${formData.id ? '编辑' : '新增'}人员`"
    :visible="showDialog"
    :before-close="handleClose"
    width="40%"
    center
  >
    <!-- 表单 -->
    <el-form
      ref="addEmptyForm"
      label-width="120px"
      :model="formData"
      :rules="rules"
    >
      <el-form-item label="人员名称：" prop="userName">
        <el-input
          style="width: 80%"
          placeholder="请输入姓名"
          v-model="formData.userName"
          maxlength="5"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="角色:" prop="roleId">
        <el-select
          style="width: 80%"
          placeholder="请选择角色"
          v-model="formData.roleId"
        >
          <el-option
            v-for="item in rolesList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话:" prop="mobile">
        <el-input
          style="width: 80%"
          placeholder="请输入联系电话"
          v-model="formData.mobile"
          maxlength="11"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="负责区域:" prop="regionId">
        <el-select
          style="width: 80%"
          placeholder="请选择区域"
          v-model="formData.regionId"
        >
          <el-option
            v-for="item in regionList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="头像:" prop="image">
        <!-- 放置上传图片 -->
        <UploadImg
          v-model="formData.img"
          ref="employeesHeader"
          @onSuccess="headerImgSuccess"
        />
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-checkbox v-model="formData.status">是否启用</el-checkbox>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="warning" @click="addFn" v-loading="loading"
        >确 定</el-button
      >
      <el-button @click="handleClose">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addEmployee, getRolesList, updateRole } from "@/api/person";
import { regionNameList } from "@/api/region";
import UploadImg from "@/components/ImageUpload/index.vue";
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      regionList: "",
      loading: false,
      rolesList: "",
      status: false,
      formData: {
        userName: "",
        roleId: "",
        mobile: "",
        regionId: "",
        regionName: "",
        image: "",
        status: "",
      },
      page: {
        pageIndex: 1, //当前页数
        pageSize: 100000,
        // name: "",
      },
      rules: {
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        roleId: [{ required: true, trigger: "blur" }],
        regionId: [{ required: true, trigger: "blur" }],
        image: [{ required: true, message: "请上传头像", trigger: "blur" }],
      },
    };
  },
  components: { UploadImg },
  mounted() {
    this.getRolesList();
    this.regionNameList();
  },
  methods: {
    handleClose() {
      this.$emit("update:showDialog", false);
      this.$refs.addEmptyForm.resetFields();
      this.formData = {
        userName: "",
        roleId: "",
        mobile: "",
        regionId: "",
        regionName: "",
        image: "",
        status: "",
      };
    },
    async addFn() {
      try {
        await this.$refs.addEmptyForm.validate();
        this.loading = true;
        //根据有无id判断是修改角色还是新增接口
        this.formData.id
          ? await updateRole(this.formData)
          : await addEmployee(this.formData);
        this.formData.id
        ? this.$message.success("信息修改成功")
        : this.$message.success("新增员工成功");
        this.$emit("refsher");
        //判断是否处于图片上传阶段
        if (this.$refs.employeesHeader.loading) {
          return this.$message.error("图片上传中");
        }
        this.handleClose();
        // this.$parent.getEmployeeList()
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    async getRolesList() {
      const res = await getRolesList();
      //console.log(res);
      this.rolesList = res.data;
      //console.log(this.rolesList);
    },
    //获取新建的区域列表
    async regionNameList() {
      const res = await regionNameList(this.page);
      //console.log(res);
      this.regionList = res.data.currentPageRecords;
      //console.log(this.regionList)
    },
    // 监听员工照片上传成功
    headerImgSuccess({ url }) {
      this.formData.image = url;
    },
  },
};
</script>

<style scoped>
.el-button--warning:hover {
  background-color: #ff5e20;
}
</style>