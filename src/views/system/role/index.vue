<template>
  <div class="page-container">
    <el-card>
      <template #header><span class="page-title">角色管理</span></template>
      <el-empty description="功能开发中..." />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<style scoped lang="scss">
.page-title { font-size: 15px; font-weight: 600; }
</style>
