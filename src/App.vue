<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import EmptyLayout from '@/layouts/EmptyLayout.vue';

export default {
  components: { MainLayout, EmptyLayout },
  computed: {
    layout() {
      const layoutName = this.$route.meta.layout || 'empty';

      return `${layoutName}-layout`;
    },
  },
};
</script>

<style>
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/css/index.css';
</style>
