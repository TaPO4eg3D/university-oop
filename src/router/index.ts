import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainPage from '../views/MainPage.vue'

const lab2 = import('@/views/Lab2.vue');
const lab3 = import('@/views/Lab3.vue');
const lab4 = import('@/views/Lab4.vue');

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
  },
  {
    path: '/lab3',
    name: 'lab3',
    component: () => lab3,
  },
  {
    path: '/lab4',
    name: 'lab4',
    component: () => lab4,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
