<template>
  <div class="card orange darken-3">
    <div class="card-content white-text">
      <div class="card-header">
        <span class="card-title">
          {{ $t('components.exchange_rate.title') }}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>{{ $t('components.exchange_rate.thead.currency') }}</th>
            <th>{{ $t('components.exchange_rate.thead.rate') }}</th>
            <th>{{ $t('components.exchange_rate.thead.datetime') }}</th>
          </tr>
        </thead>

        <tbody v-if="data.success">
          <tr v-for="(rate, code) in data.rates" :key="code">
            <td>{{ code }}</td>
            <td>{{ rate.toFixed(5) }}</td>
            <td>{{ data.date | date('shortdatetime') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExchangeRate',
  props: {
    data: { type: Object },
    locale: { type: String },
  },
};
</script>
