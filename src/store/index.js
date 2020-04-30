import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';

Vue.use(Vuex);

const INIT_STATE = {
  loading: false,
  isLoggedIn: false,
  error: { status: false, code: '', message: '' },
  user: { uid: null, email: '', info: { name: '', bill: 0 } },
};

export default new Vuex.Store({
  state: {
    ...INIT_STATE,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      state.isLoggedIn = true;
    },
    updateInfo(state, payload) {
      state.user = {
        ...state.user,
        info: payload,
      };
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      const status = payload.status !== undefined
        ? payload.status
        : true;

      state.error = {
        status,
        code: payload.code,
        message: payload.message,
      };
    },
  },
  actions: {
    resetError({ commit }) {
      commit('setError', { ...INIT_STATE.error });
    },
    async register({ commit }, payload) {
      try {
        commit('setLoading', true);

        const userCredential = await firebase.auth()
          .createUserWithEmailAndPassword(
            payload.email,
            payload.password,
          );
        const { user } = userCredential;
        const userInfo = {
          name: payload.username,
          bill: 10000,
        };

        await firebase.database()
          .ref(`users/${user.uid}/info`).set({ ...userInfo });

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

        const userCredential = await firebase.auth()
          .signInWithEmailAndPassword(
            payload.email,
            payload.password,
          );
        const { user } = userCredential;

        const userInfo = await firebase.database()
          .ref(`users/${user.uid}/info`).once('value');
        const infoData = userInfo.val() || {};

        commit('setUser', {
          uid: user.uid,
          email: user.email,
          info: { ...infoData },
        });
      } catch (error) {
        commit('setError', error);
      } finally {
        commit('setLoading', false);
      }
    },
    async logout({ commit }) {
      commit('setLoading', true);
      await firebase.auth().signOut();

      commit('setUser', { ...INIT_STATE.user });
      commit('setLoading', false);
    },
    autoLogin({ commit }, payload) {
      commit('setUser', {
        uid: payload.uid,
        email: payload.email,
        info: { ...payload.userInfo },
      });
    },
    getCurrentUser() {
      return firebase.auth().currentUser;
    },
    async updateProfile({ commit, getters }, payload) {
      try {
        commit('setLoading', true);

        const { user } = getters;
        const userInfo = {
          ...user.info,
          name: payload.username,
        };

        await firebase.database()
          .ref(`users/${user.uid}/info`).set({ ...userInfo });

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
