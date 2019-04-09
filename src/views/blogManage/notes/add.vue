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