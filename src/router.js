import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Suggest from './views/Suggest.vue';
import Report from './views/Report.vue';
import CustomQuiz from './views/CustomQuiz';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/suggest',
      name: 'suggest',
      component: Suggest,
    },
    {
      path: '/report/:id',
      name: 'report',
      component: Report,
    },
    {
      path: '/customize',
      name: 'customize',
      component: CustomQuiz,
    },
  ],
});
