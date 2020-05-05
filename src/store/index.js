import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth.module';
import info from './info.module';
import category from './category.module';
import record from './record.module';

Vue.use(Vuex);

const INIT_STATE = {
  loading: false,
  error: { status: false, code: '', message: '' },
};

export default new Vuex.Store({
  state: { ...INIT_STATE },
  mutations: {
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
  },
  getters: {
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
  modules: {
    auth, info, category, record,
  },
});
