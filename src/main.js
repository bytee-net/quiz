import axios from 'axios';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Question from './mixins/Question';
import i18n from './i18n';

Vue.config.productionTip = false;
Vue.http = Vue.prototype.$http = axios;

Vue.mixin(Question);

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app');
