import Vue from 'vue';
import Vuex from 'vuex';
import AuthService from '@/services/auth.service';
import UserService from '@/services/user.service';

Vue.use(Vuex);

const INIT_STATE = {
  loading: false,
  isLoggedIn: false,
  error: { status: false, code: '', message: '' },
  user: { uid: null, email: '', info: { name: '', bill: 0 } },
};

export default new Vuex.Store({
  state: { ...INIT_STATE },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      state.isLoggedIn = true;
    },
    updateInfo(state, payload) {
      state.user = { ...state.user, info: payload };
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      const status = payload.status !== undefined ? payload.status : true;
      state.error = { status, code: payload.code, message: payload.message };
    },
  },
  actions: {
    resetError({ commit }) {
      commit('setError', { ...INIT_STATE.error });
    },
    async register({ commit }, payload) {
      try {
        commit('setLoading', true);

        const user = await AuthService.register({ ...payload });
        const userInfo = { name: payload.username, bill: 10000 };
        await UserService.updateProfile(user.uid, { ...userInfo });

        commit('setUser', {
          uid: user.uid,
          email: user.email,
          info: { ...userInfo },
        });
      } catch (error) {
        commit('setError', error);
      } finally {
        commit('setLoading', false);
      }
    },
    async login({ commit }, payload) {
      try {
        commit('setLoading', true);

        const user = await AuthService.login({ ...payload });
        const userInfo = await UserService.getProfile(user.uid);

        commit('setUser', {
          uid: user.uid,
          email: user.email,
          info: { ...userInfo },
        });
      } catch (error) {
        commit('setError', error);
      } finally {
        commit('setLoading', false);
      }
    },
    async logout({ commit }) {
      commit('setLoading', true);
      await AuthService.logout();
      commit('setUser', { ...INIT_STATE.user });
      commit('setLoading', false);
    },
    async autoLogin({ commit }, payload) {
      const userInfo = await UserService.getProfile(payload.uid);

      commit('setUser', {
        uid: payload.uid,
        email: payload.email,
        info: { ...userInfo },
      });
    },
    async updateProfile({ commit, getters }, payload) {
      try {
        commit('setLoading', true);

        const { uid, info } = getters.user;
        const userInfo = { ...info, name: payload.username };
        await UserService.updateProfile(uid, { ...userInfo });

        commit('updateInfo', { ...userInfo });
      } catch (error) {
        // commit('setError', error);
        console.error(error);
      } finally {
        commit('setLoading', false);
      }
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    error: (state) => state.error,
    user: (state) => state.user,
  },
  modules: {
  },
});
