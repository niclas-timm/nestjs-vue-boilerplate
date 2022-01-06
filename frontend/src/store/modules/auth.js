import axios from 'axios';

export default {
  //===========================
  // STATEI
  //===========================
  state: {
    user: {},
    loadingUser: true,
    isAuthenticated: false,
    access_token: '',
    error: {},
  },

  //===========================
  // Mutations.
  //===========================
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

  //===========================
  // ACTIONS
  //===========================
  actions: {
    /**
     * Fetch the currently logged in user from the DB.
     * @param {object} context
     *  
     * @returns 
     */
    async fetchUser({ commit }) {
      try {
        // Send api request.
        const res = await axios.get(
          `${process.env.VUE_APP_API_URL}/auth/user`,
          {
            withCredentials: true,
          },
        );
        // Put user into store.
        if (res.status === 200) {
          commit('SET_USER', res.data);
          commit(
            'SET_ACCESS_TOKEN',
            window.localStorage.getItem('access_token'),
          );
          return true;
        }
      } catch (error) {
        if (error.response.data) {
          commit('SET_USER_ERROR_OR_LOGOUT', { ...error.response.data, area: 'fetchUser' });
          return false;
        }
        commit('SET_USER_ERROR_OR_LOGOUT', {
          error: 'Server error',
          message: 'Sorry, something went wrong',
          statusCode: 500,
          area: 'fetchUser',
        })

      }
    },

    /**
     * Register user via email and password.
     * 
     * @param {object} context
     *   The context object. 
     * 
     * @param {object} formData 
     *   The form data.
     * @returns 
     * 
     */
    async register({ commit }, formData) {
      try {
        const res = await axios.post(
          `${process.env.VUE_APP_API_URL}/auth/register`,
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          },
          {
            withCredentials: true,
          },
        );

        if (res.status === 201) {
          window.location = `${process.env.VUE_APP_FRONTEND_URL}/dashboard`;
        }
      } catch (error) {
        if (error.response.data) {
          commit('SET_USER_ERROR_OR_LOGOUT', {
            ...error.response.data,
            area: 'register',
          });
          return this.error;
        }
        commit('SET_USER_ERROR_OR_LOGOUT', {
          error: 'Server error',
          message: 'Sorry, something went wrong',
          statusCode: 500,
          area: 'register',
        });
        return this.error;
      }
    },

    /**
     * Log in user via email and password.
     * 
     * @param {object} context
     *   The context object.
     * 
     * @param {object} formData
     *   The form data that holds email and password.
     *  
     * @returns 
     */
    async login({ commit }, { email, password }) {
      try {
        const res = await axios.post(
          `${process.env.VUE_APP_API_URL}/auth/login`,
          { email, password },
          {
            withCredentials: true,
          },
        );
        if (res.status === 201) {
          window.location = `${process.env.VUE_APP_FRONTEND_URL}/dashboard`;
        }
      } catch (error) {
        console.log(error.response)
        if (error.response && error.response.data) {
          commit('SET_USER_ERROR_OR_LOGOUT', {
            ...error.response.data,
            area: 'login',
          });
          return this.error;
        }
        commit('SET_USER_ERROR_OR_LOGOUT', {
          error: 'Server error',
          message: 'Sorry, something went wrong',
          statusCode: 500,
          area: 'login',
        });
        return this.error;
      }
    },

    /**
     * Log user out.
     * 
     * @param {object} context
     *   The context object. 
     */
    async logout({ commit }) {
      const res = await axios.get('http://localhost:3000/auth/logout', {
        withCredentials: true,
      });

      commit('SET_USER_ERROR_OR_LOGOUT');
    },
  },
};
