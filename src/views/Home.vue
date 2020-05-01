<template>
  <div>
    <div class="page-title">
      <h3>Рахунок</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <div class="row">
      <div class="col s12 m6 l4">
        <UserBill :billValue="infoBill"/>
      </div>

      <div class="col s12 m6 l8">
        <ExchangeRate/>
      </div>
    </div>
  </div>
</template>

<script>
import UserBill from '@/components/UserBill.vue';
import ExchangeRate from '@/components/ExchangeRate.vue';

export default {
  name: 'Home',
  components: { UserBill, ExchangeRate },
  computed: {
    infoBill() {
      return this.$store.getters.info.bill;
    },
  },
};
</script>
