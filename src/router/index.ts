import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {path: '/', component: () => import('@/pages/main/index.vue')},
]

export default createRouter({
  history: createWebHistory(),
  routes
})
