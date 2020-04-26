import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const metaDefaultLayout = {
  layout: 'main',
};

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      ...metaDefaultLayout,
    },
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('../views/Categories.vue'),
    meta: {
      ...metaDefaultLayout,
    },
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History.vue'),
    meta: {
      ...metaDefaultLayout,
    },
  },
  {
    path: '/planning',
    name: 'Planning',
    component: () => import('../views/Planning.vue'),
    meta: {
      ...metaDefaultLayout,
    },
  },
  {
    path: '/new-record',
    name: 'NewRecord',
    component: () => import('../views/NewRecord.vue'),
    meta: {
      ...metaDefaultLayout,
    },
  },
  {
    path: '/new-record',
    name: 'NewRecord',
    component: () => import('../views/NewRecord.vue'),
    meta: {
      ...metaDefaultLayout,
    },
  },
  {
    path: '/detail-record',
    name: 'DetailRecord',
    component: () => import('../views/DetailRecord.vue'),
    meta: {
      ...metaDefaultLayout,
    },
  },
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
