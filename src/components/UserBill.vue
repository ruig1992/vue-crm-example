<template>
  <div class="card light-blue bill-card">
    <div class="card-content white-text">
      <span class="card-title">Рахунок у валюті</span>

      <p class="currency-line">
        <span>{{ billValue | currency() }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserBill',
  props: {
    billValue: { type: Number },
  },
};
</script>
