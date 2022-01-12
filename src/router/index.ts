import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainPage from '../views/MainPage.vue'

const lab2 = import('@/views/Lab2.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: MainPage
  },
  {
    path: '/lab2',
    name: 'lab2',
    component: () => lab2,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
