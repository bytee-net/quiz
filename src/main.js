import axios from 'axios';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Question from './mixins/Question';

Vue.config.productionTip = false;
Vue.http = Vue.prototype.$http = axios;

Vue.mixin(Question);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
