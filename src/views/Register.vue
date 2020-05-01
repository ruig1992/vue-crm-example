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
          v-if="$v.username.$error && $v.username.required && !$v.username.alphaNumExtra"
        >Username accepts only letters, numbers with spaces</small>
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
          :disabled="isLoading"
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
  required, email, minLength, sameAs,
} from 'vuelidate/lib/validators';
import { msgAuth } from '@/utils/messages';

const alphaNumExtra = (value) => /^[a-zа-яА-ЯєЄіІїЇґҐ\d '’]+$/i.test(value);

export default {
  name: 'Register',
  data: () => ({
    email: '',
    password: '',
    username: '',
    rightsAgreement: false,
  }),
  computed: {
    isLoading() {
      return this.$store.getters.loading;
    },
    authError() {
      return this.$store.getters.error;
    },
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
    username: { required, minLength: minLength(4), alphaNumExtra },
    rightsAgreement: { sameAs: sameAs(() => true) },
  },
  methods: {
    async onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      await this.$store.dispatch('register', {
        email: this.email,
        password: this.password,
        username: this.username,
        rightsAgreement: this.rightsAgreement,
      });

      if (this.authError.status) {
        this.$notify.error(msgAuth[this.authError.code], {
          completeCallback: () => {
            this.$store.dispatch('resetError');
          },
        });
        return;
      }

      this.$router.push('/');
    },
  },
};
</script>
