import { createStore } from 'vuex';
import AuthStore from './modules/auth';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: AuthStore,
  },
});
