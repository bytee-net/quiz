import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/suggest',
      name: 'suggest',
      component: () => import('./views/Suggest.vue'),
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('./views/Report.vue'),
    },
  ],
});
