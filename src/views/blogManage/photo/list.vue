<!-- 相册 -->
<template>
  <div class="table-box notes">
    <el-row class="table-box-title">
      <el-button type="primary" @click="openAdd">新增相册</el-button>
    </el-row>
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
      <el-table-column prop="title" label="相册标题" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
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
            @click="linkEdit(scope.row,scope.$index)"
          >编辑</el-button>
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

    <!-- 新增、编辑弹出 -->
    <el-dialog 
    :visible.sync="editShow" 
    model
    title="编辑相册">
      <el-form :model="createForm" :rules="editRules" ref="createForm" class="creatForm" size="mini" label-width="80px">
        <el-form-item label="相册名" prop="title">
          <el-input size="medium" clearable v-model="createForm.title"></el-input>
        </el-form-item>
        <el-form-item label="相册封面" prop="coverImg">
          <el-upload
            class="avatar-uploader"
            :action="upUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            multiple
            :before-upload="beforeAvatarUpload">
            <img v-if="createForm.coverImg" :src="filePath + createForm.coverImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="submitFlag" :loading="submitFlag" @click="submitForm('createForm')">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { photoAlbumList, photoAlbumAdd, photoAlbumUpdate, photoAlbumDel } from "@/api/photo";
import { tablePageMixin } from '@/utils/mixin';
export default {
  name: "photoList",
  mixins: [tablePageMixin],
  data() {
    return {
      upUrl: this.plus.upUrl,
      filePath: this.plus.filePath,
      list: [],
      createForm: {
        title: '',
        coverImg: ''
      },
      editRules: {
        title: [
          { required: true, message: '请输入相册名', trigger: 'blur' },
        ],
        coverImg: [
          { required: true, message: '请上传相册封面', trigger: 'blur' },
        ]
      },
      editShow: false,
      submitFlag: false
    }
  },
  methods: {
    getList() {
      this.tableloading = true
      photoAlbumList(this.query).then(res => {
        this.list = res.data.list;
        this.total = res.data.total;
        this.tableloading = false;
      });
    },
    handleEdit(item,index) {
      this.createForm = {
        id: item.id,
        title: item.title,
        coverImg: item.coverImg
      }
      this.$refs.createForm && this.$refs.createForm.clearValidate()
      this.editShow = true
    },
    handleDelete(item,index) {
      this.$confirm('此操作将删除该相册, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        photoAlbumDel({id:item.id}).then(res => {
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
    openAdd() {
      this.createForm = {
        title: '',
        coverImg: ''
      }
      this.$refs.createForm && this.$refs.createForm.clearValidate()
      this.editShow = true
    },
    handleAvatarSuccess(res, file) {
      this.createForm.coverImg = res.data.path;
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
      this.$refs.createForm.validate((valid) => {
        if (valid) {
          if (this.createForm.id) {
            photoAlbumUpdate(this.createForm).then(res => {
              if(res.status == 200) {
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
                this.editShow = false;
                this.getList()
              }
            })
          } else {
            photoAlbumAdd(this.createForm).then(res => {
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
        }
      })
    },
    // 跳转编辑
    linkEdit(item, index) {
      this.$router.push({
        name: 'photoEdit',
        params: {
          album_id: item.id
        }
      })
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    
  }
}
</script>

<style lang="scss" scoped>
</style>