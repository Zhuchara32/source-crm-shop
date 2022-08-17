import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'ClientView',
    meta: { layout: 'main' },
    component: () => import('../views/ClientView.vue')
  },
  {
    path: '/register',
    name: 'SignUp',
    meta: { layout: 'empty' },
    component: () => import('../views/SignUpView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'empty' },
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/myProduct',
    name: 'MyProduct',
    meta: { layout: 'main' },
    component: () => import('../views/MyProduct.vue')
  },
  {
    path: '/orders',
    name: 'MyOrders',
    meta: { layout: 'main' },
    component: () => import('../views/MyOrders.vue')
  },
  {
    path: '/add',
    name: 'AddProduct',
    meta: { layout: 'main' },
    component: () => import('../views/AddProduct.vue')
  },
  {
    path: '/profile',
    name: 'MyProfile',
    meta: { layout: 'main' },
    component: () => import('../views/MyProfile.vue')
  },
  {
    path: '/cart',
    name: 'CartView',
    meta: { layout: 'empty' },
    component: () => import('../views/CartView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
