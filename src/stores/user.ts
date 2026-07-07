import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginApi, getUserInfoApi, logoutApi } from '@/api'
import type { LoginParams, UserInfo, MenuItem } from '@/types'
import router from '@/router'
import { resetRouter } from '@/router'
import { useTabsStore } from './tabs'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref<UserInfo | null>(null)
  const permissions = ref<string[]>([])
  const menus = ref<MenuItem[]>([])

  const isLoggedIn = computed(() => !!token.value)
  const getToken = computed(() => token.value)
  const getMenus = computed(() => menus.value)

  async function login(params: LoginParams) {
    const res = await loginApi(params)
    token.value = res.data.token
    localStorage.setItem('token', res.data.token)
    if (params.remember) {
      localStorage.setItem('rememberedUser', params.username)
    } else {
      localStorage.removeItem('rememberedUser')
    }
    await getUserInfo()
  }

  async function getUserInfo() {
    const res = await getUserInfoApi()
    userInfo.value = res.data.userInfo
    permissions.value = res.data.permissions || []
    menus.value = res.data.menus || []
  }

  function setMenus(menuList: MenuItem[]) {
    menus.value = menuList
  }

  async function logout() {
    try {
      await logoutApi()
    } catch {
      // ignore network error on logout
    }
    resetToken()
    const tabsStore = useTabsStore()
    tabsStore.closeAll()
    resetRouter()
    router.push('/login')
  }

  function resetToken() {
    token.value = ''
    userInfo.value = null
    permissions.value = []
    menus.value = []
    localStorage.removeItem('token')
  }

  return { token, userInfo, permissions, menus, isLoggedIn, getToken, getMenus, login, getUserInfo, setMenus, logout, resetToken }
})
