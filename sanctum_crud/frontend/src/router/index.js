// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { isGuest: true },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { isGuest: true },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/admin/posts',
    name: 'posts',
    component: () => import('@/views/Posts/Index.vue'),
    meta: { requiresAuth: true, allowedRoles: ['admin', 'redactor'] },
  },
  {
    path: '/admin/posts/create',
    name: 'posts.create',
    component: () => import('@/views/Posts/Create.vue'),
    meta: { requiresAuth: true, allowedRoles: ['admin', 'redactor'] },
  },
  {
    path: '/admin/posts/:id/update',
    name: 'posts.update',
    component: () => import('@/views/Posts/Update.vue'),
    meta: { requiresAuth: true, allowedRoles: ['admin', 'redactor'] },
  },
  {
    path: '/admin/users',
    name: 'users',
    component: () => import('@/views/Users/Index.vue'),
    meta: { requiresAuth: true, allowedRoles: ['admin'] },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Global route guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isAuthenticated = !!token;  // Je používateľ prihlásený?

  console.log('Token:', token);
  console.log('Role:', role);
  console.log('IsAuthenticated:', isAuthenticated);

  // Ak stránka vyžaduje prihlásenie a používateľ nie je prihlásený
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login' });  // Presmerovanie na login
  }

  // Ak stránka je pre hostí, ale používateľ je prihlásený, presmeruj na domovskú stránku
  if (to.meta.isGuest && isAuthenticated) {
    return next({ name: 'home' });
  }

  // Ak sú definované povolené roly a používateľ je prihlásený, skontroluj, či rola vyhovuje
  if (to.meta.allowedRoles && isAuthenticated) {
    if (!to.meta.allowedRoles.includes(role)) {
      return next({ name: 'home' });  // Ak rola nie je povolená, presmeruj na domovskú stránku
    }
  }

  // Ak nič z toho neplatí, pokračuj v navigácii
  return next();
});


export default router;
