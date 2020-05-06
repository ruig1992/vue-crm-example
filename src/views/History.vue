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

    <section v-else>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Сума</th>
            <th>Дата</th>
            <th>Категорія</th>
            <th>Тип</th>
            <th>Відкрити</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(r, i) in records" :key="r.id">
            <td>{{ i + 1 }}</td>
            <td>{{ r.amount | currency }}</td>
            <td>{{ r.date | date('shortdatetime') }}</td>
            <td>{{ r.categoryTitle }}</td>
            <td>
              <span class="white-text badge"
                :class="r.typeClass"
              >{{ r.typeText }}</span>
            </td>
            <td>
              <router-link
                :to="{ name: 'DetailRecord', params: { id: r.id } }"
                class="btn-small btn"
              >
                <i class="material-icons">open_in_new</i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import { TYPE_INCOME } from '@/services/record.service';

export default {
  name: 'History',
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
};
</script>
