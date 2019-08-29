<!-- 添加学习笔记 -->
<template>
  <div class="form-container talk-add">
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
        <wang-editor v-model="detail.content"></wang-editor>
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
import { talkAdd, talkInfo, talkUpdate } from "@/api/talk";
import WangEditor from "@/components/WangEditor";
export default {
  name: "talkAdd",
  components: {
    "wang-editor": WangEditor
  },
  data() {
    return {
      filePath: this.plus.filePath,
      richImageBaseUrl: this.plus.richImageBaseUrl,
      detail: {
        title: '',
        intro: '',
        tag: '',
        content: ''
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
      talkInfo({id:this.id}).then(res => {
        if(res.status == 200) {
          const detail = res.data;
          // 将中间量转换为图片前缀地址
          // const urlReg = RegExp(encodeURIComponent(this.richImageBaseUrl), 'g')
          // detail.content = decodeURIComponent(encodeURIComponent(detail.content).replace(urlReg, this.filePath))
          this.detail = detail;
        }
      })
    },
    submitForm(id){
      const params = this.detail
      // 将图片前缀地址转换为中间量
      // const urlReg = RegExp(encodeURIComponent(this.filePath), 'g')
      // params.content = decodeURIComponent(encodeURIComponent(params.content).replace(urlReg, this.richImageBaseUrl))
      if (id) {
        params.id = id;
        talkUpdate(params).then(res => {
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
        talkAdd(params).then(res => {
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