import Vue from 'vue';
import Vuelidate from 'vuelidate';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import CircularLoader from './components/app/Loader/Circular.vue';
import ProgressLoader from './components/app/Loader/Progress.vue';

import formatDate from './filters/date.filter';
import formatCurrency from './filters/currency.filter';
import formatNumber from './filters/number.filter';
import strCase from './filters/str-case.filter';
import Notification from './utils/notification.utils';

import firebaseConfig from './config/firebase.config';

import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(Notification);
Vue.component('CircularLoader', CircularLoader);
Vue.component('ProgressLoader', ProgressLoader);
Vue.filter('date', formatDate);
Vue.filter('currency', formatCurrency);
Vue.filter('number', formatNumber);
Vue.filter('strCase', strCase);

firebase.initializeApp(firebaseConfig);

const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
    async created() {
      if (user) {
        store.dispatch('autoLogin', { ...user });
      }
    },
  }).$mount('#app');
  unsubscribe();
});
