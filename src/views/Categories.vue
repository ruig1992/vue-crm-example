<template>
  <div>
    <div class="page-title">
      <h3>Категорії</h3>
    </div>
    <section>
      <CircularLoader v-if="loading" />
      <div class="row" v-else>
        <div class="col s12 m6">
          <CategoryCreate @create="onCreate" />
        </div>
        <div class="col s12 m6">
          <CategoryEdit
            v-if="categories.length"
            :categories="categories"
            :key="categories.length"
            @update="onUpdate"
          />
          <p class="center" v-else>Категорій поки що немає...</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/Category/CategoryCreate.vue';
import CategoryEdit from '@/components/Category/CategoryEdit.vue';
import CircularLoader from '@/components/app/Loader/Circular.vue';

export default {
  name: 'Categories',
  components: { CategoryCreate, CategoryEdit, CircularLoader },
  data: () => ({
    categories: [],
    loading: true,
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('getCategories');
    this.loading = false;
  },
  methods: {
    onCreate(category) {
      this.categories.push(category);
    },
    onUpdate(category) {
      const index = this.categories.findIndex((c) => c.id === category.id);
      this.$set(this.categories, index, { ...category });
    },
  },
};
</script>
