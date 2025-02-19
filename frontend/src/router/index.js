import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CasketView from '@/views/CasketView.vue'
import CoffinView from '@/views/CoffinView.vue'
import UrnsView from '@/views/UrnsView.vue'
import PetMemorialsViews from '@/views/PetMemorialsViews.vue'
import CartView from '@/views/CartView.vue'
import ProductDetailsComp from '@/components/ProductDetailsComp.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/caskets',
    component: CasketView
  },
  {
    path: '/coffins',
    component: CoffinView
  },
  {
    path: '/urns',
    component: UrnsView
  },
  {
    path: '/petmemorials',
    component: PetMemorialsViews
  },
  {
    path: '/cart',
    component: CartView
  },
  {
    path: '/details',
    component: ProductDetailsComp
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
