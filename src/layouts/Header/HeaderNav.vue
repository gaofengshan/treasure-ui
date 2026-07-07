<template>
  <div class="header-container">
    <div class="header-left">
      <el-icon
        class="collapse-btn"
        :size="20"
        @click="appStore.toggleSidebar()"
      >
        <Fold v-if="!appStore.sidebarCollapse" />
        <Expand v-else />
      </el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route.meta?.title">
          {{ route.meta.title as string }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="header-right">
      <el-tooltip content="搜索" placement="bottom">
        <el-icon class="header-icon" :size="18" @click="searchVisible = true">
          <Search />
        </el-icon>
      </el-tooltip>

      <el-tooltip content="通知" placement="bottom">
        <el-badge :value="3" :hidden="false" class="notice-badge">
          <el-icon class="header-icon" :size="18">
            <Bell />
          </el-icon>
        </el-badge>
      </el-tooltip>

      <el-tooltip content="全屏" placement="bottom">
        <el-icon class="header-icon" :size="18" @click="toggleFullscreen">
          <FullScreen />
        </el-icon>
      </el-tooltip>

      <el-dropdown trigger="click" @command="handleCommand">
        <span class="user-dropdown">
          <el-avatar :size="32" icon="UserFilled" />
          <span class="username">{{ userStore.userInfo?.realName || '用户' }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">
              <el-icon><User /></el-icon>个人中心
            </el-dropdown-item>
            <el-dropdown-item command="settings">
              <el-icon><Setting /></el-icon>系统设置
            </el-dropdown-item>
            <el-dropdown-item divided command="logout">
              <el-icon><SwitchButton /></el-icon>退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import {
  Fold, Expand, Search, Bell, FullScreen,
  UserFilled, User, Setting, SwitchButton,
} from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'

const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()
const searchVisible = ref(false)

function handleCommand(cmd: string) {
  if (cmd === 'logout') {
    ElMessageBox.confirm('确认退出登录？', '提示').then(() => {
      userStore.logout()
    }).catch(() => {})
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
</script>

<style scoped lang="scss">
.header-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #0d2b4e;
  color: #e2e8f0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;

  .collapse-btn {
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    &:hover { background-color: rgba(255,255,255,0.1); }
  }

  :deep(.el-breadcrumb) {
    .el-breadcrumb__inner { color: #a0aec0; font-size: 13px; }
    .el-breadcrumb__inner.is-link { color: #e2e8f0; &:hover { color: #fff; } }
    .el-breadcrumb__separator { color: #4a5568; }
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;

  .header-icon {
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    &:hover { background-color: rgba(255,255,255,0.1); }
  }

  .notice-badge {
    :deep(.el-badge__content) { top: 4px; right: 2px; }
  }
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 4px;
  &:hover { background-color: rgba(255,255,255,0.1); }

  .username {
    font-size: 13px;
    color: #e2e8f0;
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
