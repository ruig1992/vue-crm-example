<template>
  <div>
    <div class="page-title">
      <h3>Категорії</h3>
    </div>
    <section>
      <div class="row">
        <div class="col s12 m6">
          <CategoryCreate />
        </div>
        <div class="col s12 m6">
          <CategoryEdit />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/Category/CategoryCreate.vue';
import CategoryEdit from '@/components/Category/CategoryEdit.vue';

export default {
  name: 'Categories',
  components: { CategoryCreate, CategoryEdit },
};
</script>
