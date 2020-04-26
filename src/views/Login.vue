<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Домашня бухгалтерія</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="$v.email.$model"
          :class="{ invalid: $v.email.$error }"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$error && !$v.email.required"
        >Email is required</small>
        <small
          class="helper-text invalid"
          v-if="$v.email.$error && !$v.email.email"
        >Email is invalid format</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="$v.password.$model"
          :class="{ invalid: $v.password.$error }"
        >
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$error && !$v.password.required"
        >Password is required</small>
        <small
          class="helper-text invalid"
          v-if="$v.password.$error && !$v.password.minLength"
        >Password must have at least {{ $v.password.$params.minLength.min }} characters</small>
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
        <router-link :to="{ name: 'Register' }">Зареєструватися</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';
import messages from '@/utils/messages';

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
  }),
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(4),
    },
  },
  mounted() {
    const msgKey = (this.$route.query.message || '').trim();
    if (messages[msgKey]) {
      this.$showMsg(messages[msgKey]);
    }
  },
  methods: {
    onSubmit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        console.error('Form is invalid!');
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
      };

      console.log(formData);
      this.$router.push('/');
    },
  },
};
</script>
