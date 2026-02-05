import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/ui/LoginPage.vue')
  },
  {
    path: '/hours',
    name: 'Hours',
    component: () => import('@/pages/hours/ui/HoursPage.vue')
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
