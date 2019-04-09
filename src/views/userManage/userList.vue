<!-- 用户列表页 -->
<template>
  <div class="table-box">
    <el-table
      size="mini"
      ref="table"
      width="100%"
      max-height="650"
      :data="list"
      v-loading="tableloading"
      element-loading-text="数据加载中..."
    >
      <el-table-column label="序号" type="index" :index="tableIndex" align="center" fixed="left"></el-table-column>
      <el-table-column prop="name" label="用户名" align="center"></el-table-column>
      <el-table-column prop="creatTime" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="lastTime" label="最近登录时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="300" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleEdit(scope.row,scope.$index)"
          >修改</el-button>
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleDelete(scope.row,scope.$index)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.page"
        :page-sizes="[10,20,30,50]"
        :page-size="query.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 编辑弹出 -->
    <el-dialog 
    :visible.sync="editShow" 
    model
    title="编辑用户信息">
      <el-form :model="editInfo" :rules="editRules" ref="editInfo" class="creatForm" size="mini" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input size="medium" clearable v-model="editInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="name">
          <el-upload
            class="avatar-uploader"
            :action="upUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            multiple
            :before-upload="beforeAvatarUpload">
            <img v-if="editInfo.avatar" :src="filePath + editInfo.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="submitFlag" :loading="submitFlag" @click="submitForm('editInfo')">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { userList, userDel, userUpdate } from "@/api/user";
import { tablePageMixin } from '@/utils/mixin';
export default {
  name: "userList",
  mixins: [tablePageMixin],
  data() {
    return {
      upUrl: this.plus.upUrl,
      filePath: this.plus.filePath,
      list: [],
      editInfo: {
        userId:'',
        name: '',
        avatar: ''
      },
      editShow: false,
      submitFlag: false,
      editRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    getList() {
      this.tableloading = true
      userList(this.query).then(res => {
        this.list = res.data.list;
        this.total = res.data.total;
        this.tableloading = false;
      });
    },
    handleEdit(item,index) {
      this.editInfo = {
        userId: '',
        name: '',
        avatar: ''
      }
      this.editShow = true;
      this.editInfo.userId = item.userId;
      this.editInfo.name = item.name;
      this.editInfo.avatar = item.avatar;
    },
    handleDelete(item,index) {
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userDel({id:item.userId}).then(res => {
          if(res.status == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          }
        })
      })
    },
    handleAvatarSuccess(res, file) {
      this.editInfo.avatar = res.data.path;
    },
    beforeAvatarUpload(file, fileList) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是JPG、PNG、gif格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    submitForm() {
      userUpdate(this.editInfo).then(res => {
        if(res.status == 200) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.editShow = false;
          this.getList()
        }
      })
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
</style>
