<template>
  <div class="card light-blue">
    <div class="card-content white-text">
      <span class="card-title">{{ $t('components.user_bill.title') }}</span>

      <p class="currency-line" v-for="cur in currencies" :key="cur">
        <span>{{ getCurrency(cur) | currency(cur) }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import {
  userCurrenciesAsArray, getBaseCoefficient,
} from '@/services/currency.service';

export default {
  name: 'UserBill',
  props: {
    rates: { type: Object },
  },
  data: () => ({
    currencies: userCurrenciesAsArray,
  }),
  computed: {
    base() {
      return getBaseCoefficient(
        this.$store.getters.info.bill,
        this.rates,
      );
    },
  },
  methods: {
    getCurrency(currency) {
      return this.base * this.rates[currency];
    },
  },
};
</script>
