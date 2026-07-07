<template>
  <el-container class="app-container">
    <el-aside :width="sidebarWidth" class="app-aside">
      <SidebarMenu />
    </el-aside>
    <el-container class="app-right">
      <el-header class="app-header" :height="headerHeight">
        <HeaderNav />
      </el-header>
      <TabsView />
      <el-main class="app-main">
        <router-view v-slot="{ Component }">
          <keep-alive :include="tabsStore.cachedViews">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { useTabsStore } from '@/stores/tabs'
import SidebarMenu from './Sidebar/SidebarMenu.vue'
import HeaderNav from './Header/HeaderNav.vue'
import TabsView from './TabsView/TabsView.vue'

const appStore = useAppStore()
const tabsStore = useTabsStore()

const headerHeight = '56px'
const sidebarWidth = computed(() =>
  appStore.sidebarCollapse ? '64px' : '240px'
)
</script>

<style scoped lang="scss">
.app-container {
  height: 100vh;
  overflow: hidden;
}

.app-aside {
  background-color: #1e293b;
  transition: width 0.3s ease;
  overflow: hidden;
  flex-shrink: 0;
}

.app-right {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-header {
  height: 56px;
  padding: 0;
  flex-shrink: 0;
}

.app-main {
  flex: 1;
  padding: 16px;
  background-color: #f0f2f5;
  overflow-y: auto;
}
</style>
