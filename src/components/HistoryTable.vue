<template>
  <section>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>{{ $t('common.thead.amount') }}</th>
          <th>{{ $t('common.thead.date') }}</th>
          <th>{{ $t('common.thead.category') }}</th>
          <th>{{ $t('common.thead.type') }}</th>
          <th>{{ $t('common.thead.detail') }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(r, i) in records" :key="r.id">
          <td>{{ (i + 1) + (page - 1) * perPage }}</td>
          <td>{{ r.amount | currency }}</td>
          <td>{{ r.date | date('shortdatetime') }}</td>
          <td>{{ r.categoryTitle }}</td>
          <td>
            <span class="white-text badge"
              :class="r.typeClass"
            >{{ $t(`common.rt_${r.type}`) }}</span>
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
    page: { type: Number, default: 1 },
    perPage: { type: Number, required: true },
  },
};
</script>
