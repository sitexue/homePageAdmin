<!-- 学习笔记 -->
<template>
  <div class="table-box notes">
    <el-row class="table-box-title">
      <el-button type="primary" @click="linkAdd">新增笔记</el-button>
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
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column prop="intro" label="简介" align="center"></el-table-column>
      <el-table-column prop="tag" label="标签" align="center"></el-table-column>
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
  </div>
</template>

<script>
import { notesList, notesDel } from "@/api/notes";
import { tablePageMixin } from '@/utils/mixin';
export default {
  name: "notesList",
  mixins: [tablePageMixin],
  data() {
    return {
      list: [],
    }
  },
  methods: {
    getList() {
      this.tableloading = true
      notesList(this.query).then(res => {
        this.list = res.data.list;
        this.total = res.data.total;
        this.tableloading = false;
      });
    },
    handleEdit(item,index) {
      const id = item.id;
      this.$router.push({name:'notesEdit',params:{id}})
    },
    handleDelete(item,index) {
      this.$confirm('此操作将删除该笔记, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        notesDel({id:item.id}).then(res => {
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
    linkAdd() {
      this.$router.push({name:'notesAdd'})
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