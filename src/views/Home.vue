<template>
  <div>
    <div class="page-title">
      <h3>Рахунок</h3>

      <button
        class="btn waves-effect waves-light btn-small"
        @click="getExchangeRate"
        :disabled="!isRatesLoaded"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <CircularLoader v-if="!isRatesLoaded" />

    <div v-else class="row">
      <div class="col s12 m6 l4">
        <UserBill :rates="rates" />
      </div>

      <div class="col s12 m6 l8">
        <ExchangeRate :data="exchangeRateData" />
      </div>
    </div>
  </div>
</template>

<script>
import UserBill from '@/components/UserBill.vue';
import ExchangeRate from '@/components/ExchangeRate.vue';
import { getExchangeRate } from '@/services/currency.service';

export default {
  name: 'Home',
  components: { UserBill, ExchangeRate },
  data: () => ({
    exchangeRateData: {},
    isRatesLoaded: false,
  }),
  computed: {
    rates() {
      return this.exchangeRateData.rates || {};
    },
  },
  async mounted() {
    this.getExchangeRate();
  },
  methods: {
    async getExchangeRate() {
      this.isRatesLoaded = false;
      this.exchangeRateData = await getExchangeRate();

      if (!this.exchangeRateData.success) {
        this.$notify.error(this.exchangeRateData.app_error_msg);
        return;
      }
      this.isRatesLoaded = true;
    },
  },
};
</script>
