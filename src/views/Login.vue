<template>
  <form class="card auth-card">
    <div class="card-content">
      <span class="card-title">Домашня бухгалтерія</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            class="validate"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid">Email</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            class="validate"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid">Password</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Увійти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Немає аккаунта?
        <a href="/">Зареєструватися</a>
      </p>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Login',
};
</script>
