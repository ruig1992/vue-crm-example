<template>
  <ul class="sidenav app-sidenav" :class="{ 'open': isOpen }">
    <router-link
      v-for="(link, i) in links" :key="i"
      :to="link.routeTo"
      tag="li"
      active-class="active"
      exact
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.name }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'Sidebar',
  props: { isOpen: { type: Boolean, default: true } },
  data() {
    return {
      links: [
        {
          name: this.$t('app_sidebar.bill'),
          routeTo: { name: 'Home' },
        },
        {
          name: this.$t('app_sidebar.history'),
          routeTo: { name: 'History' },
        },
        {
          name: this.$t('app_sidebar.planning'),
          routeTo: { name: 'Planning' },
        },
        {
          name: this.$t('app_sidebar.new_record'),
          routeTo: { name: 'NewRecord' },
        },
        {
          name: this.$t('app_sidebar.categories'),
          routeTo: { name: 'Categories' },
        },
      ],
    };
  },
};
</script>
