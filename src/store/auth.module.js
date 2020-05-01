import AuthService from '@/services/auth.service';
import UserService from '@/services/user.service';

const INIT_STATE = {
  isLoggedIn: false,
  user: { uid: null, email: '', info: { name: '', bill: 0 } },
};

export default {
  state: { ...INIT_STATE },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      state.isLoggedIn = true;
    },
    updateInfo(state, payload) {
      state.user = { ...state.user, info: payload };
    },
  },
  actions: {
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
    user: (state) => state.user,
  },
};
