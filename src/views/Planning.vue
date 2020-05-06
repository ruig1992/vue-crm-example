<template>
  <div>
    <div class="page-title">
      <h3>Планування</h3>
      <h4>{{ bill | currency }}</h4>
    </div>

    <CircularLoader v-if="loading" />

    <p class="center" v-else-if="!categoriesWithSpend.length">
      Категорій поки що немає... Додайте нову
      <router-link :to="{ name: 'Categories' }">прямо зараз</router-link>
    </p>

    <section v-else>
      <div v-for="c in categoriesWithSpend" :key="c.id">
        <p>
          <strong style="margin-right:10px">{{ c.title }}:</strong>
          {{ c.spend | number }} з {{ c.limit | currency }}
        </p>
        <div class="progress" v-tooltip="c.tooltipText">
          <div
            class="determinate"
            :class="c.progressColor"
            :style="{ width: c.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { TYPE_OUTCOME } from '@/services/record.service';

export default {
  name: 'Planning',
  data: () => ({
    categoriesWithSpend: [],
    loading: true,
  }),
  computed: {
    bill() {
      return this.$store.getters.info.bill;
    },
  },
  async mounted() {
    const categories = await this.$store.dispatch('getCategories');
    const records = await this.$store.dispatch('getRecords');

    this.categoriesWithSpend = categories.map((c) => {
      /* eslint-disable no-param-reassign */
      const spend = records
        .filter((r) => r.category_id === c.id && r.type === TYPE_OUTCOME)
        // eslint-disable-next-line no-return-assign
        .reduce((sum, r) => sum += +r.amount, 0);
      /* eslint-enable no-param-reassign */
      const percent = (spend / c.limit) * 100;
      const progressPercent = percent > 100 ? 100 : percent;
      // eslint-disable-next-line no-nested-ternary
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red';

      const tooltipValue = c.limit - spend;
      const valueAsCurrency = this.$options.filters.currency(
        Math.abs(tooltipValue),
      );
      const tooltipText = `${tooltipValue < 0 ? 'Перевищення на' : 'Залишилося'} ${valueAsCurrency}`;

      return {
        ...c, spend, progressPercent, progressColor, tooltipText,
      };
    });

    this.loading = false;
  },
};
</script>
