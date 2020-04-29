import Vue from 'vue';
import Vuelidate from 'vuelidate';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import formatDate from './filters/date.filter';
import formatCurrency from './filters/currency.filter';
import strCase from './filters/str-case.filter';
import Notification from './utils/notification.utils';

import firebaseConfig from './config/firebase.config';

import 'materialize-css/dist/js/materialize.min';


Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(Notification);
Vue.filter('date', formatDate);
Vue.filter('currency', formatCurrency);
Vue.filter('strCase', strCase);

firebase.initializeApp(firebaseConfig);

const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
    async created() {
      if (user) {
        const userInfo = await firebase.database()
          .ref(`users/${user.uid}/info`).once('value');

        store.dispatch('autoLogin', {
          ...user,
          userInfo: userInfo.val(),
        });
      }
    },
  }).$mount('#app');
  unsubscribe();
});
