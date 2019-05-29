import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import jwt from 'jsonwebtoken';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'imapro-app',
  storage: localStorage,
});

export default new Vuex.Store({
  state: {
    authorization: '',
    userData: {},
  },
  mutations: {
    setToken(state, token) {
      // eslint-disable-next-line
      state.authorization = token;
      // eslint-disable-next-line
      state.userData = jwt.decode(token);
    },
  },
  actions: {

  },
  plugins: [vuexPersist.plugin],
});
