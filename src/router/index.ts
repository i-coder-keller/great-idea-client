import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: '/',
    component: () => import('@/layout/layout.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/pages/main/index.vue')
      },
      {
        path: '/video-editor',
        component: () => import('@/pages/video-editor/index.vue')
      }
    ]
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
