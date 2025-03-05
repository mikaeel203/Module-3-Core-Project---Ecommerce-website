import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CasketView from '@/views/CasketView.vue';
import CoffinView from '@/views/CoffinView.vue';
import UrnsView from '@/views/UrnsView.vue';
import PetMemorialsViews from '@/views/PetMemorialsViews.vue';
import CartView from '@/views/CartView.vue';
import ProductDetailsComp from '@/components/ProductDetailsComp.vue';
import Login from '@/views/LoginView.vue';
import Register from '@/views/RegisterView.vue';
import Profile from '@/views/ProfileView.vue';
import AllProductsView from '@/views/AllProductsView.vue';
// import CheckoutView from '@/views/CheckoutView.vue';
import OrderConfirmation from '@/views/OrderConfirmation.vue';
import OrderHistory from '@/views/OrderHistory.vue';
import CheckoutView from '@/views/CheckoutView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/all-products', component: AllProductsView },
  { path: '/caskets', component: CasketView },
  { path: '/coffins', component: CoffinView },
  { path: '/urns', component: UrnsView },
  { path: '/petmemorials', component: PetMemorialsViews },
  { path: '/cart', component: CartView, meta: { requiresAuth: true } },
  {
    path: '/details/:id',
    component: ProductDetailsComp,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutView,
    meta: { requiresAuth: true },},
    {
      path: '/order-confirmation/:orderId',
      component: OrderConfirmation,
      meta: { requiresAuth: true }, // Optional: Add auth requirement if needed
    },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: "/profile", component: Profile, meta: { requiresAuth: true } },
  { path: '/order-history', component: OrderHistory, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;