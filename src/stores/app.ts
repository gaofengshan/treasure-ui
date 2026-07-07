import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const sidebarCollapse = ref(false)
  const theme = ref<'light' | 'dark'>('light')

  function toggleSidebar() {
    sidebarCollapse.value = !sidebarCollapse.value
  }

  function setTheme(val: 'light' | 'dark') {
    theme.value = val
    document.documentElement.setAttribute('data-theme', val)
  }

  return { sidebarCollapse, theme, toggleSidebar, setTheme }
})
