<template>
  <div class="card blue-grey darken-1">
    <div class="card-content white-text">
      <span class="card-title">404 - Сторінку не знайдено!</span>
      <p>Сторінку за цією адресою не знайдено...</p>
    </div>
    <div class="card-action">
      Перейдіть на -
      <router-link :to="{ name: 'Home' }">головну сторінку</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>
