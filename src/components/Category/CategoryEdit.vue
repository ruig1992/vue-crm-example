<template>
  <div>
    <div class="page-subtitle">
      <h4>Редагувати</h4>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="input-field" :class="{ invalid: $v.selectedCategory.$error }">
        <select
          id="categorySelect"
          ref="categorySelect"
          v-model="$v.selectedCategory.$model"
        >
          <option value="" disabled>Список категорій</option>
          <option v-for="c in categories" :key="c.id" :value="c.id"
          >{{ c.title }}</option>
        </select>
        <label for="categorySelect">Виберіть категорію</label>
        <small
          class="helper-text invalid"
          v-if="$v.selectedCategory.$error && !$v.selectedCategory.required"
        >Select the category</small>
      </div>

      <div class="input-field">
        <input
          id="title_edit"
          type="text"
          v-model.trim="$v.title.$model"
          :class="{ invalid: $v.title.$error }"
        >
        <label for="title_edit" :class="{ active: title }">Назва</label>
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
          id="limit_edit"
          type="number"
          v-model.number="$v.limit.$model"
          :class="{ invalid: $v.limit.$error }"
        >
        <label for="limit_edit" :class="{ active: limit }">Ліміт</label>
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
        Оновити
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
  name: 'CategoryEdit',
  props: { categories: { type: Array, required: true } },
  data: () => ({
    title: '',
    limit: null,
    categorySelect: null,
    selectedCategory: null,
  }),
  computed: {
    isLoading() {
      return this.$store.getters.loading;
    },
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    selectedCategory(catId) {
      const { title, limit } = this.categories.find((c) => c.id === catId);
      this.title = title;
      this.limit = limit;
    },
  },
  validations: {
    selectedCategory: { required },
    title: { required, minLength: minLength(4), alphaNumExtra },
    limit: { required, minValue: minValue(LIMIT_MIN_VAL) },
  },
  mounted() {
    this.initSelect();
  },
  beforeDestroy() {
    this.destroySelect();
  },
  methods: {
    initSelect() {
      this.categorySelect = window.M.FormSelect.init(this.$refs.categorySelect);
    },
    destroySelect() {
      if (this.categorySelect && this.categorySelect.destroy) {
        this.categorySelect.destroy();
      }
    },
    async onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      const category = {
        id: this.selectedCategory,
        title: this.title,
        limit: this.limit,
      };
      await this.$store.dispatch('updateCategory', category);

      if (this.error.status) {
        return;
      }

      this.$emit('update', category);
      this.$nextTick(() => {
        this.destroySelect();
        this.initSelect();
      });
      this.$notify.show('Категорія успішно оновлена!');
    },
  },
};
</script>
