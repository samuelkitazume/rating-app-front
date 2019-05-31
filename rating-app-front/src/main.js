import Vue from 'vue';

import VueAxiosPlugin from 'vue-axios-plugin';
import GAuth from 'vue-google-oauth2';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueAxiosPlugin, {
  reqHandleFunc: function reqHandleFunc(config) {
    const imaproLocalStorage = JSON.parse(localStorage.getItem('imapro-app'));
    const Authorization = imaproLocalStorage ? imaproLocalStorage.authorization : {};
    return Object.assign({}, config, {
      baseURL: 'http://localhost:3001/',
      headers: {
        Authorization: `Bearer ${Authorization}`,
      },
    });
  },
});
Vue.use(Element);
Vue.use(GAuth, { clientId: '982245226486-383gkf6rcnnfkmglkaltsf1j8nsm9gr7.apps.googleusercontent.com' });
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
