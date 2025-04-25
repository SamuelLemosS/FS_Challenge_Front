import { createRouter, createWebHistory } from 'vue-router'
import ProductList from "../pages/ProductList.vue"

const routes = [
  {
      path: '/',
      name: 'Produtos',
      component: ProductList
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
