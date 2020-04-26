<template>
  <div>
    <div class="breadcrumb-wrap">
      <router-link :to="{ name: 'History' }"
        class="breadcrumb"
      >Історія</router-link>
      <a class="breadcrumb">
        Витрата
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div class="card red">
          <div class="card-content white-text">
            <p>Опис:</p>
            <p>Сума:</p>
            <p>Категорія:</p>

            <small>12.12.12</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailRecord',
};
</script>
