import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/pages/home/index.vue')
  },
  {
    path: '/compilationDetail',
    name: 'compilationDetail',
    component: () => import('@/pages/compilationDetail/index.vue')
  }
]

export default routes