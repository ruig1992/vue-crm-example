import CategoryService from '@/services/category.service';

export default {
  actions: {
    async getCategory({ commit, getters }, payload) {
      try {
        commit('setLoading', true);

        const { uid } = getters.user;
        const category = await CategoryService.get(uid, payload);

        return category ? { ...category, id: payload } : null;
      } catch (error) {
        commit('setError', error);
        return null;
      } finally {
        commit('setLoading', false);
      }
    },
    async getCategories({ commit, getters }) {
      try {
        commit('setLoading', true);

        const { uid } = getters.user;
        const categories = await CategoryService.getAll(uid);

        return Object.keys(categories).map((key) => (
          { ...categories[key], id: key }
        ));
      } catch (error) {
        commit('setError', error);
        return {};
      } finally {
        commit('setLoading', false);
      }
    },
    async createCategory({ commit, getters }, payload) {
      try {
        commit('setLoading', true);

        const { uid } = getters.user;
        const categoryRef = await CategoryService.create(uid, { ...payload });
        return { id: categoryRef.key, ...payload };
      } catch (error) {
        commit('setError', error);
        return {};
      } finally {
        commit('setLoading', false);
      }
    },
    async updateCategory({ commit, getters }, payload) {
      try {
        commit('setLoading', true);

        const { uid } = getters.user;
        await CategoryService.update(uid, { ...payload });
      } catch (error) {
        commit('setError', error);
      } finally {
        commit('setLoading', false);
      }
    },
  },
};
