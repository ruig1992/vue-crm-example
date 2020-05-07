<template>
  <div>
    <div class="page-title">
      <h3>{{ $t('headers.planning') }}</h3>
      <h4>{{ bill | currency }}</h4>
    </div>

    <CircularLoader v-if="loading" />

    <p class="center" v-else-if="!categoriesWithSpend.length">
      {{ $tc('messages.no_data.msg', 2) }}
      <router-link :to="{ name: 'Categories' }">
        {{ $t('messages.no_data.msg_create') }}</router-link>
    </p>

    <section v-else>
      <div v-for="c in categoriesWithSpend" :key="c.id">
        <p>
          <strong style="margin-right:10px">{{ c.title }}:</strong>
          {{ c.spend | number }}
          {{ $t('components.planning.spend_of') }}
          {{ c.limit | currency }}
        </p>
        <div class="progress"
          v-tooltip="$tc('components.planning.progress_msg', c.tpType, { value: c.tpValue })"
        >
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
    locale() {
      return this.$store.getters.info.locale;
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

      const left = c.limit - spend;
      const tpValue = this.$options.filters.currency(
        Math.abs(left),
      );
      const tpType = left < 0 ? 1 : 2;

      return {
        ...c, spend, progressPercent, progressColor, tpValue, tpType,
      };
    });

    this.loading = false;
  },
};
</script>
