<template>
  <div>
    <div class="page-title">
      <h3>Історія записів</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <CircularLoader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Записів поки що немає... Додайте новий
      <router-link :to="{ name: 'NewRecord' }">прямо зараз</router-link>
    </p>

    <HistoryTable :records="records" v-else />

    <Paginate
      :page-count="20"
      :click-handler="onPageChanged"
      prev-class="waves-effect"
      prev-text='<i class="material-icons">chevron_left</i>'
      next-class="waves-effect"
      next-text='<i class="material-icons">chevron_right</i>'
      container-class="pagination"
      page-class="waves-effect"
    />
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue';
import { TYPE_INCOME } from '@/services/record.service';

export default {
  name: 'History',
  components: { HistoryTable },
  data: () => ({
    records: [],
    loading: true,
  }),
  async mounted() {
    const records = await this.$store.dispatch('getRecords');
    const categories = await this.$store.dispatch('getCategories');

    this.records = records.map((r) => {
      const categoryTitle = categories.find((c) => c.id === r.category_id)
        .title;
      const typeText = r.type === TYPE_INCOME ? 'Дохід' : 'Витрата';
      const typeClass = r.type === TYPE_INCOME ? 'green' : 'red';

      return {
        ...r, categoryTitle, typeText, typeClass,
      };
    });

    this.loading = false;
  },
  methods: {
    onPageChanged(p) {
      console.log(p);
    },
  },
};
</script>
