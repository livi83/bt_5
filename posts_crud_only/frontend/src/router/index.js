import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PostView from '../views/Posts/Index.vue';
import PostCreateView from '../views/Posts/Create.vue';
import PostUpdateView from '../views/Posts/Update.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/admin/posts',
      name: 'posts',
      component: PostView,
    },
    {
      path: '/admin/posts/create',  // Add this route for the create page
      name: 'posts.create',       // Give it a name
      component: PostCreateView,       // Use your CreatePost component
    },
    {
      path: '/admin/posts/:id/update',  // Pridana ruta pre zobrazenie editacneho formulara
      name: 'posts.update',
      component: PostUpdateView, // Pouzivame komponent PostUpdateView
    },
  ],

});

export default router;
