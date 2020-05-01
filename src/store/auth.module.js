import AuthService from '@/services/auth.service';
import UserService from '@/services/user.service';

const INIT_STATE = {
  isLoggedIn: false,
  user: { uid: null, email: '' },
};

export default {
  state: { ...INIT_STATE },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      state.isLoggedIn = true;
    },
    clearUser(state) {
      state.user = { ...INIT_STATE.user };
      state.isLoggedIn = false;
    },
  },
  actions: {
    async register({ commit }, payload) {
      try {
        commit('setLoading', true);

        const user = await AuthService.register({ ...payload });

        const userInfo = { name: payload.username, bill: 10000 };
        await UserService.updateInfo(user.uid, { ...userInfo });

        commit('setUser', { uid: user.uid, email: user.email });
        commit('setInfo', { ...userInfo });
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
        commit('setUser', { uid: user.uid, email: user.email });
      } catch (error) {
        commit('setError', error);
      } finally {
        commit('setLoading', false);
      }
    },
    async logout({ commit }) {
      commit('setLoading', true);
      await AuthService.logout();

      commit('clearUser');
      commit('clearInfo');
      commit('setLoading', false);
    },
    async autoLogin({ commit }, payload) {
      commit('setUser', { uid: payload.uid, email: payload.email });
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user,
  },
};
