import CategoryService from '@/services/category.service';

const INIT_STATE = {
  categories: {},
};

export default {
  state: { ...INIT_STATE },
  mutations: {
    setCategories(state, payload) {
      state.categories = payload;
    },
  },
  actions: {
    async createCategory({ commit, getters }, payload) {
      try {
        commit('setLoading', true);

        const { uid } = getters.user;
        await CategoryService.create(uid, { ...payload });
        const categories = await CategoryService.getAll(uid);

        commit('setCategories', { ...categories });
      } catch (error) {
        commit('setError', error);
      } finally {
        commit('setLoading', false);
      }
    },
  },
  getters: {
    categories: (state) => state.categories,
  },
};
