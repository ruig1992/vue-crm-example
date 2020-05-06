import RecordService from '@/services/record.service';

export default {
  actions: {
    async getRecord({ commit, getters }, payload) {
      try {
        commit('setLoading', true);

        const { uid } = getters.user;
        const record = await RecordService.get(uid, payload);

        return record ? { ...record, id: payload } : null;
      } catch (error) {
        commit('setError', error);
        return null;
      } finally {
        commit('setLoading', false);
      }
    },
    async getRecords({ commit, getters }) {
      try {
        commit('setLoading', true);

        const { uid } = getters.user;
        const records = await RecordService.getAll(uid);

        return Object.keys(records).map((key) => (
          { ...records[key], id: key }
        ));
      } catch (error) {
        commit('setError', error);
        return {};
      } finally {
        commit('setLoading', false);
      }
    },
    async createRecord({ commit, getters }, payload) {
      try {
        commit('setLoading', true);

        const { uid } = getters.user;
        const recordRef = await RecordService.create(uid, { ...payload });
        return { id: recordRef.key, ...payload };
      } catch (error) {
        commit('setError', error);
        return {};
      } finally {
        commit('setLoading', false);
      }
    },
  },
};
