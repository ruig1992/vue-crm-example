<template>
  <div>
    <div class="page-title">
      <h3>Профіль</h3>
    </div>

    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="$v.name.$model"
          :class="{ invalid: $v.name.$error }"
        >
        <label for="name" :class="{ 'active': name }">Ім'я</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$error && !$v.name.required"
        >name is required</small>
        <small
          class="helper-text invalid"
          v-if="$v.name.$error && !$v.name.minLength"
        >name must have at least {{ $v.name.$params.minLength.min }} characters</small>

        <small
          class="helper-text invalid"
          v-if="$v.name.$error && $v.name.required && !$v.name.alphaNumExtra"
        >name accepts only letters, numbers with spaces</small>
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
      name: this.$store.getters.user.info.name,
      isFirstSetting: true,
    };
  },
  computed: {
    userName() {
      return this.$store.getters.user.info.name;
    },
    isLoading() {
      return this.$store.getters.loading;
    },
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    userName(val) {
      if (this.isFirstSetting) {
        this.name = val;
        this.isFirstSetting = false;
      }
    },
  },
  validations: {
    name: { required, minLength: minLength(4), alphaNumExtra },
  },
  methods: {
    async onSubmit() {
      this.isFirstSetting = false;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      await this.$store.dispatch('updateProfile', {
        username: this.name,
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
