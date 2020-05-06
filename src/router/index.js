import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthService from '@/services/auth.service';

Vue.use(VueRouter);

const metaDefaultLayout = { layout: 'main' };

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { ...metaDefaultLayout, requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { ...metaDefaultLayout, requiresAuth: true },
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('../views/Categories.vue'),
    meta: { ...metaDefaultLayout, requiresAuth: true },
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History.vue'),
    meta: { ...metaDefaultLayout, requiresAuth: true },
  },
  {
    path: '/planning',
    name: 'Planning',
    component: () => import('../views/Planning.vue'),
    meta: { ...metaDefaultLayout, requiresAuth: true },
  },
  {
    path: '/new-record',
    name: 'NewRecord',
    component: () => import('../views/NewRecord.vue'),
    meta: { ...metaDefaultLayout, requiresAuth: true },
  },
  {
    path: '/detail-record/:id',
    name: 'DetailRecord',
    component: () => import('../views/DetailRecord.vue'),
    meta: { ...metaDefaultLayout, requiresAuth: true },
  },
  { path: '*', component: () => import('../views/errors/NotFound.vue') },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);

  const isAuthenticated = AuthService.isAuthenticated();

  if (requiresAuth && !isAuthenticated) {
    next('/login');
    return;
  }
  if (requiresGuest && isAuthenticated) {
    next('/');
    return;
  }
  next();
});

export default router;
