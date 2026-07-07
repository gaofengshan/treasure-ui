import type { Router } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useTabsStore } from '@/stores/tabs'

const whiteList = ['/login']

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    const userStore = useUserStore()
    const tabsStore = useTabsStore()

    if (whiteList.includes(to.path)) {
      next()
      return
    }

    if (!userStore.isLoggedIn) {
      next(`/login?redirect=${to.path}`)
      return
    }

    if (!userStore.userInfo) {
      try {
        await userStore.getUserInfo()
      } catch {
        userStore.resetToken()
        next(`/login?redirect=${to.path}`)
        return
      }
    }

    tabsStore.addView(to)
    next()
  })

  router.afterEach((to) => {
    document.title = (to.meta?.title as string) || '集团司库管理系统'
  })
}
