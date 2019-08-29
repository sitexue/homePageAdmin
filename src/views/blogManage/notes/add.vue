<!-- 添加学习笔记 -->
<template>
  <div class="form-container notes-add">
    <el-form :model="detail">
      <el-form-item label="标题" prop="detail">
        <el-input v-model="detail.title"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input v-model="detail.intro"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="tag">
        <el-input v-model="detail.tag"></el-input>
      </el-form-item>
      <el-form-item label="辅助图片上传">
        <el-upload
          class="upload-demo"
          :action="upUrl"
          :before-upload="beforeUpload"
          :on-preview="handlePreview"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          multiple
          :file-list="list">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
          <p>{{dialogImageUrl}}</p>
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <markdown-editor ref="markdown" v-model="detail.md"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(id)" v-if="id">修改</el-button>
        <el-button type="primary" @click="submitForm()" v-else>提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { notesAdd, notesInfo, notesUpdate } from "@/api/notes";
import MarkdownEditor from "@/components/MarkdownEditor";
export default {
  name: "notesAdd",
  components: {
    "markdown-editor": MarkdownEditor
  },
  data() {
    return {
      upUrl: this.plus.upUrl,
      filePath: this.plus.filePath,
      list: [],
      dialogVisible: false,
      dialogImageUrl: '',
      richImageBaseUrl: this.plus.richImageBaseUrl,
      detail: {
        title: "",
        intro: "",
        tag: "",
        md: "",
        html: ""
      }
    };
  },
  computed:{
    id(){
      return this.$route.params.id
    }
  },
  methods: {
    getInfo() {
      notesInfo({id:this.id}).then(res => {
        if(res.status == 200) {
          this.detail = res.data;
        }
      })
    },
    submitForm(id){
      const html = this.$refs.markdown.getHtml()
      const params = this.detail
      params.html = html
      if (id) {
        params.id = id;
        notesUpdate(params).then(res => {
          if(res.status == 200) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            setTimeout(() => {
              this.$router.go(-1)
            },800)
          }
        })
      } else {
        notesAdd(params).then(res => {
          if(res.status == 200) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            setTimeout(() => {
              this.$router.go(-1)
            },800)
          }
        })
      }
    },
    resetForm(){
      this.detail = {
        title: "",
        intro: "",
        tag: "",
        md: "",
        html: ""
      }
    },
    beforeUpload(file, fileList) {
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(res, file, fileList) {
      let name = file.name
      const item = {
        name,
        url: this.filePath + res.data.path
      }
      this.list.push(item)
    }
  },
  created() {
    if(this.id){
      this.getInfo()
    }
  },
  mounted() {
    
  },
  activated() {
    
  }
};
</script>

<style lang="scss" scoped>
</style>