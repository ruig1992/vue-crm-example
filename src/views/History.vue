<template>
  <div>
    <div class="page-title">
      <h3>{{ $t('headers.history') }}</h3>
    </div>

    <CircularLoader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      {{ $tc('messages.no_data.msg', 1) }}
      <router-link :to="{ name: 'NewRecord' }">
        {{ $t('messages.no_data.msg_create') }}</router-link>
    </p>

    <div v-else>
      <div class="history-chart">
        <HistoryChart :data="chartData" :options="chartOptions" />
      </div>

      <HistoryTable
        :records="items"
        :page="page"
        :per-page="perPageCount"
        :key="locale"
      />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="onPageChanged"
        prev-class="waves-effect"
        prev-text='<i class="material-icons">chevron_left</i>'
        next-class="waves-effect"
        next-text='<i class="material-icons">chevron_right</i>'
        container-class="pagination"
        page-class="waves-effect"
      />
    </div>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs';
import paginationMixin from '@/mixins/pagination.mixin';
import HistoryChart from '@/components/HistoryChart.vue';
import HistoryTable from '@/components/HistoryTable.vue';
import { TYPE_OUTCOME } from '@/services/record.service';

export default {
  name: 'History',
  components: { HistoryChart, HistoryTable },
  mixins: [paginationMixin],
  extends: Pie,
  data: () => ({
    records: [],
    loading: true,
    chartData: null,
    chartOptions: null,
  }),
  computed: {
    locale() {
      return this.$store.getters.info.locale;
    },
  },
  async mounted() {
    const categories = await this.$store.dispatch('getCategories');
    this.records = await this.$store.dispatch('getRecords');

    this.setup(categories);
    this.loading = false;
  },
  methods: {
    setup(categories) {
      this.chartData = {
        labels: categories.map((c) => c.title),
        datasets: [{
          /* eslint-disable */
          data: categories.map((c) => this.records
            .reduce((sum, r) => {
              if (r.category_id === c.id && r.type === TYPE_OUTCOME) {
                sum += +r.amount;
              }
              return sum;
            }, 0),
          ),
          /* eslint-enable */
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        }],
      };

      this.setupPagination(this.records.map((r) => {
        const categoryTitle = categories.find((c) => c.id === r.category_id)
          .title;
        const typeClass = r.type === TYPE_OUTCOME ? 'red' : 'green';

        return {
          ...r, categoryTitle, typeClass,
        };
      }));
    },
  },
};
</script>
