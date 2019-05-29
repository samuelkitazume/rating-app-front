import Vue from 'vue';
import Element from 'element-ui';
import GAuth from 'vue-google-oauth2';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Element);
Vue.use(GAuth, { clientId: '982245226486-383gkf6rcnnfkmglkaltsf1j8nsm9gr7.apps.googleusercontent.com' });
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
