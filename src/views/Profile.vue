<template>
  <div>
    <div class="page-title">
      <h3>Профіль</h3>
    </div>

    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          id="username"
          type="text"
          v-model.trim="$v.username.$model"
          :class="{ invalid: $v.username.$error }"
        >
        <label for="username" :class="{ 'active': username }">Ім'я</label>
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

      <button
        class="btn waves-effect waves-light"
        type="submit"
        :disabled="isLoading"
      >
        Оновити
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';

const alphaNumExtra = (value) => /^[a-zа-яА-ЯєЄіІїЇґҐ\d '’]+$/i.test(value);

export default {
  name: 'Profile',
  data() {
    return {
      username: this.$store.getters.user.info.name,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.loading;
    },
    error() {
      return this.$store.getters.error;
    },
  },
  validations: {
    username: { required, minLength: minLength(4), alphaNumExtra },
  },
  methods: {
    async onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      await this.$store.dispatch('updateProfile', {
        username: this.username,
      });

      /* if (this.error.status) {
        this.$notify.error(`(${this.error.code}) ${this.error.message}`);

        this.$notify.error(msgAuth[this.authError.code], {
          completeCallback: () => {
            this.$store.dispatch('resetError');
          },
        });
      } */
    },
  },
};
</script>
