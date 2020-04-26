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
      <div class="input-field">
        <input
          id="username"
          type="text"
          v-model.trim="$v.username.$model"
          :class="{ invalid: $v.username.$error }"
        >
        <label for="username">Ім'я</label>
        <small
          class="helper-text invalid"
          v-if="$v.username.$error && !$v.username.required"
        >Username is required</small>
        <small
          class="helper-text invalid"
          v-if="$v.username.$error && !$v.username.minLength"
        >Username must have at least {{ $v.username.$params.minLength.min }} characters</small>

        <small
          class="helper-text invalid"
          v-if="$v.username.$error && !$v.username.alphaNum"
        >Username accepts only alphanumerics</small>
      </div>

      <div>
        <label>
          <input
            id="rightsAgreement"
            type="checkbox"
            v-model="$v.rightsAgreement.$model"
            :class="{ invalid: $v.rightsAgreement.$error }"
          />
          <span>З правилами згоден</span>
        </label>
        <p v-if="$v.rightsAgreement.$error && !$v.rightsAgreement.sameAs">
          <small class="helper-text invalid"
          >RightsAgreement is not checked</small>
        </p>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зареєструватися
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Вже є аккаунт?
        <router-link :to="{ name: 'Login' }">Увійти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {
  required,
  email,
  minLength,
  alphaNum,
  sameAs,
} from 'vuelidate/lib/validators';

export default {
  name: 'Register',
  data: () => ({
    email: '',
    password: '',
    username: '',
    rightsAgreement: false,
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
    username: {
      required,
      minLength: minLength(4),
      alphaNum,
    },
    rightsAgreement: {
      sameAs: sameAs(() => true),
    },
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
        username: this.username,
        rightsAgreement: this.rightsAgreement,
      };

      console.log(formData);
      // this.$router.push('/');
    },
  },
};
</script>
