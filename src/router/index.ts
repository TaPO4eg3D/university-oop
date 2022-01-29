import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainPage from '../views/MainPage.vue'

const lab2 = import('@/views/Lab2.vue');
const lab3 = import('@/views/Lab3.vue');
const lab4 = import('@/views/Lab4.vue');
const lab5 = import('@/views/Lab5.vue');
const lab6 = import('@/views/Lab6.vue');
const lab7 = import('@/views/Lab7.vue');
const lab7_1 = import('@/views/Lab7_1.vue');
const lab7_2 = import('@/views/Lab7_2.vue');
const lab7_3 = import('@/views/Lab7_3.vue');
const lab7_4 = import('@/views/Lab7_4.vue');
const lab8 = import('@/views/Lab8.vue');

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
  },
  {
    path: '/lab5',
    name: 'lab5',
    component: () => lab5,
  },
  {
    path: '/lab6',
    name: 'lab6',
    component: () => lab6,
  },
  {
    path: '/lab7',
    name: 'lab7',
    component: () => lab7,
  },
  {
    path: '/lab7_1',
    name: 'lab7_1',
    component: () => lab7_1,
  },
  {
    path: '/lab7_2',
    name: 'lab7_2',
    component: () => lab7_2,
  },
  {
    path: '/lab7_3',
    name: 'lab7_3',
    component: () => lab7_3,
  },
  {
    path: '/lab7_4',
    name: 'lab7_4',
    component: () => lab7_4,
  },
  {
    path: '/lab8',
    name: 'lab8',
    component: () => lab8,
  }
]

const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
  routes
})

export default router
