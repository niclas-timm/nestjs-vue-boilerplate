import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import GoogleOAuthCallback from '../views/Auth/OAuthCallbacks/GoogleOAuthCallback';
import TwitterOAuthCallback from '../views/Auth/OAuthCallbacks/TwitterOAuthCallback';
import Login from '../views/Auth/Login.vue';
import Register from '../views/Auth/Register.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/auth/google/callback',
    name: 'Google authentication',
    component: GoogleOAuthCallback,
  },
  {
    path: '/auth/twitter/callback',
    name: 'Twitter authentication',
    component: TwitterOAuthCallback,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
