<!-- 相册 -->
<template>
  <div class="table-box photo-edit">
    <el-upload
    class="avatar-uploader"
    :action="upUrl"
    list-type="picture-card"
    multiple
    :file-list="list"
    :before-upload="beforeAvatarUpload"
    :on-success="handleAvatarSuccess"
    :on-preview="handlePictureCardPreview"
    :before-remove="handleBeforeRemove">
    <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { photoList, photoAdd, photoDel } from "@/api/photo";
export default {
  name: "photoEdit",
  computed: {
    albumId(){
      return this.$route.params.album_id
    }
  },
  data() {
    return {
      upUrl: this.plus.upUrl,
      filePath: this.plus.filePath,
      list: [],
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    getList() {
      this.tableloading = true
      photoList({ albumId: this.albumId }).then(res => {
        const list = res.data.list
        list.forEach(item => {
          item.url = this.filePath + item.url
        })
        this.list = list
        this.total = res.data.total
      });
    },
    handleAvatarSuccess(res, file) {
      let name = file.name
      const item = {
        url: this.filePath + res.data.path
      }
      photoAdd({ 
        albumId: this.albumId, 
        name: name, 
        url: res.data.path 
      }).then(res => {
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
          this.list.push(item)
        }
      })
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
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    async handleBeforeRemove(file, fileList) {
      await photoDel({ id: file.id }).then(res => {
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          return false
        }
      })
    }
  },
  created() {
    this.getList()
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
</style>