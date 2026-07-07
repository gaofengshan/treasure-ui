import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'

export interface TabItem {
  path: string
  title: string
  name?: string
}

export const useTabsStore = defineStore('tabs', () => {
  const visitedViews = ref<TabItem[]>([])
  const cachedViews = ref<string[]>([])

  const getVisitedViews = computed(() => visitedViews.value)

  function addView(route: RouteLocationNormalized) {
    const title = route.meta?.title as string
    if (!title) return
    const exists = visitedViews.value.some(v => v.path === route.path)
    if (!exists) {
      visitedViews.value.push({
        path: route.path,
        title,
        name: route.name as string,
      })
    }
    if (route.meta?.keepAlive && route.name) {
      if (!cachedViews.value.includes(route.name as string)) {
        cachedViews.value.push(route.name as string)
      }
    }
  }

  function delView(path: string) {
    const idx = visitedViews.value.findIndex(v => v.path === path)
    if (idx !== -1) {
      const removed = visitedViews.value[idx]
      visitedViews.value.splice(idx, 1)
      if (removed.name && cachedViews.value.includes(removed.name)) {
        cachedViews.value = cachedViews.value.filter(n => n !== removed.name)
      }
    }
  }

  function refreshView(path: string) {
    const tab = visitedViews.value.find(v => v.path === path)
    if (tab?.name) {
      cachedViews.value = cachedViews.value.filter(n => n !== tab.name)
      setTimeout(() => {
        if (tab.name) cachedViews.value.push(tab.name)
      }, 0)
    }
  }

  function closeOther(path: string) {
    visitedViews.value = visitedViews.value.filter(v => v.path === path || v.path === '/dashboard')
    cachedViews.value = cachedViews.value.filter(n => {
      return visitedViews.value.some(v => v.name === n)
    })
  }

  function closeAll() {
    visitedViews.value = visitedViews.value.filter(v => v.path === '/dashboard')
    cachedViews.value = []
  }

  return { visitedViews, cachedViews, getVisitedViews, addView, delView, refreshView, closeOther, closeAll }
})
