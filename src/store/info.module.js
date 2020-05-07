import AuthService from '@/services/auth.service';
import UserService from '@/services/user.service';

const INIT_STATE = {
  info: {},
};

export default {
  state: { ...INIT_STATE },
  mutations: {
    setInfo(state, payload) {
      state.info = payload;
    },
    clearInfo(state) {
      state.info = { ...INIT_STATE.info };
    },
  },
  actions: {
    async getInfo({ commit }) {
      const user = await AuthService.getCurrentUser();
      const userInfo = await UserService.getInfo(user.uid);
      commit('setInfo', { ...userInfo });
    },
    async updateInfo({ commit, getters }, payload) {
      try {
        commit('setLoading', true);

        const { uid } = getters.user;
        const userInfo = { ...getters.info, ...payload };
        await UserService.updateInfo(uid, { ...userInfo });

        commit('setInfo', { ...userInfo });
      } catch (error) {
        commit('setError', error);
      } finally {
        commit('setLoading', false);
      }
    },
    async changeLocale({ commit, getters }, locale) {
      try {
        const { uid } = getters.user;
        const userInfo = { ...getters.info, locale };
        await UserService.updateInfo(uid, { ...userInfo });

        commit('setInfo', { ...userInfo });
      } catch (error) {
        commit('setError', error);
      }
    },
  },
  getters: {
    info: (state) => state.info,
    isEmptyInfo: (state) => !Object.keys(state.info).length,
  },
};
