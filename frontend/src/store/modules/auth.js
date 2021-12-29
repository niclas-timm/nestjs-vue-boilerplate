import axios from 'axios';

export default {
  state: {
    user: {},
    loadingUser: true,
    isAuthenticated: false,
    access_token: '',
    error: {},
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = true;
      state.loadingUser = false;
      state.error = {};
    },
    SET_ACCESS_TOKEN(state, token = false) {
      if (token) {
        window.localStorage.setItem('access_token', token);
        return;
      }
      window.localStorage.removeItem('access_token');
      state.access_token = token;
    },
    SET_USER_ERROR_OR_LOGOUT(state, error) {
      state.error = error;
      state.user = {};
      state.isAuthenticated = false;
      state.loadingUser = false;
      state.access_token = '';
    },
  },
  actions: {
    async fetchUser({ commit }) {
      try {
        const res = await axios.get(
          `${process.env.VUE_APP_API_URL}/auth/user`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.access_token}`,
            },
          },
        );
        if (res.status === 200) {
          commit('SET_USER', res.data);
          commit(
            'SET_ACCESS_TOKEN',
            window.localStorage.getItem('access_token'),
          );
          return true;
        }
      } catch (error) {
        commit('SET_USER_ERROR_OR_LOGOUT', error.response.data);
        commit('SET_ACCESS_TOKEN');
        return false;
      }
    },
    async socialAuth({ commit }, url) {
      try {
        const res = await axios.get(url);
        if (res.status === 200) {
          commit('SET_USER', res.data.user);
          commit('SET_ACCESS_TOKEN', res.data.access_token);
          window.localStorage.setItem('access_token', res.data.access_token);
          return true;
        }
      } catch (error) {
        commit('SET_USER_ERROR_OR_LOGOUT', error.response.data);
        commit('SET_USER', {});
        commit('SET_ACCESS_TOKEN', '');
        return false;
      }
    },
    async logout({ commit }) {
      window.localStorage.removeItem('access_token');
      commit('SET_USER_ERROR_OR_LOGOUT');
    },
  },
};
