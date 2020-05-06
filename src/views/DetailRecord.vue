<template>
  <div>
    <CircularLoader v-if="loading" />

    <p class="center" v-else-if="!record">
      Запису з ID <b>"{{ this.$route.params.id }}"</b> не знайдено...
    </p>

    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link :to="{ name: 'History' }"
          class="breadcrumb"
        >Історія</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.typeText }}
        </a>
      </div>

      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.typeClass">
            <div class="card-content white-text">
              <p>Опис: {{ record.description }}</p>
              <p>Сума: {{ record.amount | currency }}</p>
              <p>Категорія: {{ record.categoryTitle }}</p>
              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TYPE_INCOME } from '@/services/record.service';

export default {
  name: 'DetailRecord',
  data: () => ({
    record: null,
    loading: true,
  }),
  async mounted() {
    const { id } = this.$route.params;
    const record = await this.$store.dispatch('getRecord', id);

    if (record) {
      record.categoryTitle = await this.$store
        .dispatch('getCategory', record.category_id).title;
      record.typeText = record.type === TYPE_INCOME ? 'Дохід' : 'Витрата';
      record.typeClass = record.type === TYPE_INCOME ? 'green' : 'red';
      this.record = record;
    }
    this.loading = false;
  },
};
</script>
