<template>
  <ul class="sidenav app-sidenav" :class="{ 'open': isOpen }">
    <router-link
      v-for="(link, i) in links" :key="i"
      :to="link.routeTo"
      tag="li"
      active-class="active"
      exact
    >
      <a href="#" class="waves-effect waves-orange pointer">
        {{ link.name }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    links: [
      {
        name: 'Рахунок',
        routeTo: { name: 'Home' },
      },
      {
        name: 'Історія',
        routeTo: { name: 'History' },
      },
      {
        name: 'Планування',
        routeTo: { name: 'Planning' },
      },
      {
        name: 'Новий запис',
        routeTo: { name: 'NewRecord' },
      },
      {
        name: 'Категорії',
        routeTo: { name: 'Categories' },
      },
    ],
  }),
};
</script>
