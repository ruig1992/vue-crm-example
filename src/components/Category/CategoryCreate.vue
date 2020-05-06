<template>
  <div>
    <div class="page-subtitle">
      <h4>Створити</h4>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          id="title"
          type="text"
          v-model.trim="$v.title.$model"
          :class="{ invalid: $v.title.$error }"
        >
        <label for="title">Назва</label>
        <small
          class="helper-text invalid"
          v-if="$v.title.$error && !$v.title.required"
        >title is required</small>
        <small
          class="helper-text invalid"
          v-if="$v.title.$error && !$v.title.minLength"
        >title must have at least {{ $v.title.$params.minLength.min }} characters</small>
        <small
          class="helper-text invalid"
          v-if="$v.title.$error && $v.title.required && !$v.title.alphaNumExtra"
        >title accepts only letters, numbers with spaces</small>
      </div>

      <div class="input-field">
        <input
          id="limit"
          type="number"
          v-model.number="$v.limit.$model"
          :class="{ invalid: $v.limit.$error }"
        >
        <label for="limit">Ліміт</label>
        <small
          class="helper-text invalid"
          v-if="$v.limit.$error && !$v.limit.required"
        >limit is required</small>
        <small
          class="helper-text invalid"
          v-if="$v.limit.$error && !$v.limit.minValue"
        >limit must have at least {{ $v.limit.$params.minValue.min }}</small>
      </div>

      <button type="submit"
        class="btn waves-effect waves-light"
        :disabled="isLoading"
      >
        Створити
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minLength, minValue } from 'vuelidate/lib/validators';

const alphaNumExtra = (value) => /^[a-zа-яА-ЯєЄіІїЇґҐ\d '’-]+$/i.test(value);
const LIMIT_MIN_VAL = 1;

export default {
  name: 'CategoryCreate',
  data: () => ({
    title: '',
    limit: LIMIT_MIN_VAL,
  }),
  computed: {
    isLoading() {
      return this.$store.getters.loading;
    },
    error() {
      return this.$store.getters.error;
    },
  },
  validations: {
    title: { required, minLength: minLength(4), alphaNumExtra },
    limit: { required, minValue: minValue(LIMIT_MIN_VAL) },
  },
  mounted() {
    window.M.updateTextFields();
  },
  methods: {
    async onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      const category = await this.$store.dispatch('createCategory', {
        title: this.title,
        limit: this.limit,
      });

      if (this.error.status) {
        return;
      }

      this.title = '';
      this.limit = LIMIT_MIN_VAL;
      this.$v.$reset();

      this.$emit('create', category);
      this.$notify.show('Категорія успішно додана!');
    },
  },
};
</script>
