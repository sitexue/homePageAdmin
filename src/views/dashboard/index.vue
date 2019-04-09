<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{ name }}</div>
    <!-- <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div> -->
    <div class="dashboard-text">level:{{ level | fLevel }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'level'
    ])
  },
  filters:{
    fLevel(key){
      switch (key) {
        case 1:
          return '用户'
          break;
        case 2:
          return '管理员'
          break;
        default:
          return '未知'
          break;
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
