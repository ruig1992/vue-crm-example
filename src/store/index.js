import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase/app';

Vue.use(Vuex);

const INIT_STATE = {
  user: { uid: null, email: '', info: { name: '', bill: 0 } },
  isLoggedIn: false,
  loading: false,
  error: { status: false, code: '', message: '' },
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
    async register({ commit }, payload) {
      try {
        commit('setLoading', true);
        commit('setError', { ...INIT_STATE.error });

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
        commit('setError', { ...INIT_STATE.error });

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
          info: { name: infoData.name, bill: infoData.bill },
        });
      } catch (error) {
        commit('setError', error);
      } finally {
        commit('setLoading', false);
      }
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('setLoading', true);
        firebase.auth().signOut()
          .then(() => {
            commit('setUser', {
              ...INIT_STATE.user,
            });
            commit('setLoading', false);
            resolve();
          });
      });
    },
    autoLogin({ commit }, payload) {
      commit('setUser', {
        uid: payload.uid,
        email: payload.email,
        info: {
          name: payload.userInfo.name,
          bill: payload.userInfo.bill,
        },
      });
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
