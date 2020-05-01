<template>
  <div class="card orange darken-3 bill-card">
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

        <tbody>
        <tr>
          <td>грн</td>
          <td>12121</td>
          <td>12.12.12</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExchangeRate',
  props: {},
  data() {
    return {
      //
    };
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>
