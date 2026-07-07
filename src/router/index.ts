import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', hidden: true },
  },
]

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/layouts/BasicLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'ep:home-filled', keepAlive: true },
      },
      {
        path: 'account/bank-account',
        name: 'BankAccount',
        component: () => import('@/views/account/bankAccount/index.vue'),
        meta: { title: '银行账户', icon: 'ep:coin', keepAlive: true },
      },
      {
        path: 'account/inner-account',
        name: 'InnerAccount',
        component: () => import('@/views/account/innerAccount/index.vue'),
        meta: { title: '内部账户', icon: 'ep:wallet', keepAlive: true },
      },
      {
        path: 'fund/collect',
        name: 'FundCollect',
        component: () => import('@/views/fund/collect/index.vue'),
        meta: { title: '资金上收', icon: 'ep:upload', keepAlive: true },
      },
      {
        path: 'fund/allocate',
        name: 'FundAllocate',
        component: () => import('@/views/fund/allocate/index.vue'),
        meta: { title: '资金下拨', icon: 'ep:download', keepAlive: true },
      },
      {
        path: 'payment',
        name: 'Payment',
        component: () => import('@/views/payment/index.vue'),
        meta: { title: '支付结算', icon: 'ep:money', keepAlive: true },
      },
      {
        path: 'budget',
        name: 'Budget',
        component: () => import('@/views/budget/index.vue'),
        meta: { title: '资金预算', icon: 'ep:document', keepAlive: true },
      },
      {
        path: 'report',
        name: 'Report',
        component: () => import('@/views/report/index.vue'),
        meta: { title: '报表分析', icon: 'ep:data-analysis', keepAlive: true },
      },
      {
        path: 'system/user',
        name: 'SystemUser',
        component: () => import('@/views/system/user/index.vue'),
        meta: { title: '用户管理', icon: 'ep:user', keepAlive: true },
      },
      {
        path: 'system/role',
        name: 'SystemRole',
        component: () => import('@/views/system/role/index.vue'),
        meta: { title: '角色管理', icon: 'ep:setting', keepAlive: true },
      },
      {
        path: 'system/menu',
        name: 'SystemMenu',
        component: () => import('@/views/system/menu/index.vue'),
        meta: { title: '菜单配置', icon: 'ep:menu', keepAlive: true },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/dashboard',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...constantRoutes, ...asyncRoutes],
})

export function resetRouter() {
  const newRouter = createRouter({
    history: createWebHashHistory(),
    routes: [...constantRoutes, ...asyncRoutes],
  })
  ;(router as any).matcher = (newRouter as any).matcher
}

export default router
