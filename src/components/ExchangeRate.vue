<template>
  <div class="card orange darken-3">
    <div class="card-content white-text">
      <div class="card-header">
        <span class="card-title">Курс валют</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
            <th>Дата</th>
          </tr>
        </thead>

        <tbody v-if="data.success">
          <tr v-for="(rate, code) in data.rates" :key="code">
            <td>{{ code }}</td>
            <td>{{ rate.toFixed(5) }}</td>
            <td>{{ data.date | date() }}</td>
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
  },
};
</script>
