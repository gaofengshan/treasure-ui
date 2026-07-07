<template>
  <div class="sidebar-container">
    <div class="sidebar-logo">
      <svg viewBox="0 0 48 48" width="32" height="32" class="logo-svg">
        <rect x="8" y="20" width="32" height="24" rx="2" fill="none" stroke="currentColor" stroke-width="2.5"/>
        <path d="M16 20V14a8 8 0 0 1 16 0v6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="24" cy="32" r="3" fill="currentColor"/>
      </svg>
      <span v-show="!collapse" class="sidebar-title">司库系统</span>
    </div>
    <el-menu
      :default-active="activeMenu"
      :collapse="collapse"
      :collapse-transition="true"
      :unique-opened="true"
      router
      class="sidebar-menu"
      background-color="#1e293b"
      text-color="#a0aec0"
      active-text-color="#fff"
    >
      <template v-for="item in menuItems" :key="item.path || item.title">
        <template v-if="item.children && item.children.length">
          <el-sub-menu :index="item.title">
            <template #title>
              <el-icon v-if="item.icon"><Icon :icon="item.icon" /></el-icon>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :key="child.path"
              :index="child.path"
            >
              <el-icon v-if="child.icon"><Icon :icon="child.icon" /></el-icon>
              <template #title>{{ child.title }}</template>
            </el-menu-item>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path!">
            <el-icon v-if="item.icon"><Icon :icon="item.icon" /></el-icon>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { Icon } from '@iconify/vue'

const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()

const collapse = computed(() => appStore.sidebarCollapse)
const menuItems = computed(() => userStore.menus)
const activeMenu = computed(() => route.path)
</script>

<style scoped lang="scss">
.sidebar-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #1e293b;
  overflow: hidden;
}

.sidebar-logo {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
  color: #a0aec0;

  .logo-svg { color: #1a5c8a; flex-shrink: 0; }
  .sidebar-title {
    font-size: 16px;
    font-weight: 600;
    color: #e2e8f0;
    white-space: nowrap;
    overflow: hidden;
  }
}

.sidebar-menu {
  flex: 1;
  overflow-y: auto;
  border-right: none;
  padding-top: 4px;

  &:not(.el-menu--collapse) {
    width: 240px;
  }
}

.el-menu--collapse .sidebar-title { display: none; }
</style>
