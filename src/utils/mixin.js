// 带翻页表格
const tablePageMixin = {
  data() {
    return {
      query: {
        page: 1,
        limit: 10
      },
      total: 0,
      tableloading: true
    }
  },
  methods: {
    handleSizeChange(val) {
      this.query.limit = val;
      this.query.page = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      this.query.page = val;
      this.getList();
    },
    tableIndex(index) {
      return index + (this.query.page - 1) * this.query.limit + 1;
    },
  }
}

export {
  tablePageMixin
}