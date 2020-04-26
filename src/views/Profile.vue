<template>
  <div>
    <div class="page-title">
      <h3>Профіль</h3>
    </div>

    <form class="form">
      <div class="input-field">
        <input id="description" type="text">
        <label for="description">Ім'я</label>
        <span class="helper-text invalid">name</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Оновити
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Profile',
};
</script>
