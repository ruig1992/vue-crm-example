<template>
  <section>
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
</template>

<script>
export default {
  name: 'HistoryTable',
  props: {
    records: { type: Array, required: true },
  },
};
</script>
