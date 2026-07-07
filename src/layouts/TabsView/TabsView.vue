<template>
  <div class="tabs-container" v-if="tabsStore.visitedViews.length > 0">
    <el-tabs
      v-model="activeTab"
      type="border-card"
      closable
      @tab-remove="removeTab"
      @tab-click="clickTab"
    >
      <el-tab-pane
        v-for="tab in tabsStore.visitedViews"
        :key="tab.path"
        :label="tab.title"
        :name="tab.path"
      />
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTabsStore } from '@/stores/tabs'

const route = useRoute()
const router = useRouter()
const tabsStore = useTabsStore()

const activeTab = computed({
  get: () => route.path,
  set: () => {},
})

function clickTab(tab: { paneName?: string }) {
  if (tab.paneName) {
    router.push(tab.paneName)
  }
}

function removeTab(name: string) {
  const tabs = tabsStore.visitedViews
  const currentIdx = tabs.findIndex(v => v.path === name)
  tabsStore.delView(name)

  if (name === route.path && tabs.length > 0) {
    const nextIdx = Math.min(currentIdx, tabs.length - 1)
    router.push(tabs[nextIdx]?.path || '/dashboard')
  }
}
</script>

<style scoped lang="scss">
.tabs-container {
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;

  :deep(.el-tabs) {
    .el-tabs__header {
      margin: 0;
      border-bottom: none;
    }
    .el-tabs__nav-wrap { padding: 0 8px; }
    .el-tabs__item {
      height: 34px;
      line-height: 34px;
      font-size: 12px;
      padding: 0 12px;
      border: none !important;
      &.is-active { color: #1a5c8a; font-weight: 500; }
      &:hover { color: #1a5c8a; }
    }
    .el-tabs__nav-next, .el-tabs__nav-prev { line-height: 34px; }
  }
}
</style>
