<template>
  <div>
    <div class="page-title">
      <h3>Новий запис</h3>
    </div>

    <CircularLoader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      Категорій поки що немає... Додайте нову
      <router-link :to="{ name: 'Categories' }">прямо зараз</router-link>
    </p>

    <form class="form" v-else @submit.prevent="onSubmit">
      <div class="input-field" :class="{ invalid: $v.category.$error }">
        <select
          id="categorySelect"
          ref="categorySelect"
          v-model="$v.category.$model"
        >
          <option value="" disabled>Список категорій</option>
          <option v-for="c in categories" :key="c.id" :value="c.id"
          >{{ c.title }}</option>
        </select>
        <label for="categorySelect">Виберіть категорію</label>
        <small
          class="helper-text invalid"
          v-if="$v.category.$error && !$v.category.required"
        >Select the category</small>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Дохід</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Витрата</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="$v.amount.$model"
          :class="{ invalid: $v.amount.$error }"
        >
        <label for="amount">Сума</label>
        <small
          class="helper-text invalid"
          v-if="$v.amount.$error && !$v.amount.required"
        >amount is required</small>
        <small
          class="helper-text invalid"
          v-if="$v.amount.$error && !$v.amount.minValue"
        >amount must have at least {{ $v.amount.$params.minValue.min }}</small>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="$v.description.$model"
          :class="{ invalid: $v.description.$error }"
        >
        <label for="description">Опис</label>
        <small
          class="helper-text invalid"
          v-if="$v.description.$error && !$v.description.required"
        >description is required</small>
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
import { required, minValue } from 'vuelidate/lib/validators';
import { TYPE_INCOME, TYPE_OUTCOME } from '@/services/record.service';
import msgBill from '@/utils/messages';

const LIMIT_MIN_VAL = 1;

export default {
  name: 'NewRecord',
  data: () => ({
    loading: true,
    categories: [],
    categorySelect: null,
    category: null,
    type: TYPE_INCOME,
    amount: LIMIT_MIN_VAL,
    description: '',
  }),
  computed: {
    bill() {
      return this.$store.getters.info.bill;
    },
    newBill() {
      if (this.type === TYPE_INCOME) {
        return this.bill + this.amount;
      }
      return this.bill - this.amount;
    },
    isLoading() {
      return this.$store.getters.loading;
    },
    error() {
      return this.$store.getters.error;
    },
  },
  validations: {
    category: { required },
    amount: { required, minValue: minValue(LIMIT_MIN_VAL) },
    description: { required },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('getCategories');
    this.loading = false;
    setTimeout(() => {
      this.initSelect();
      window.M.updateTextFields();
    }, 0);
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
    resetForm() {
      this.category = null;
      this.type = TYPE_INCOME;
      this.amount = LIMIT_MIN_VAL;
      this.description = '';
      this.$v.$reset();
    },
    async onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      if (this.type === TYPE_OUTCOME
        && this.amount > this.bill
      ) {
        this.$notify.error(msgBill.not_enough_money, {
          msg_params: [this.bill],
        });
        return;
      }

      await this.$store.dispatch('createRecord', {
        category_id: this.category,
        type: this.type,
        amount: this.amount,
        description: this.description,
        date: (new Date()).toJSON(),
      });

      await this.$store.dispatch('updateInfo', {
        bill: this.newBill,
      });

      if (this.error.status) {
        return;
      }

      this.resetForm();
      this.$notify.show(
        `Запис успішно створений! Ваш поточний рахунок - ${this.bill}`,
      );
    },
  },
};
</script>
