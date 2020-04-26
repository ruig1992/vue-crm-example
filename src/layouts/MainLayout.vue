<template>
  <div class="app-main-layout">
    <Navbar @toggleSidebar="onToggleSidebar" />
    <Sidebar :isOpen="isSidebarOpen" />

    <main class="app-content" :class="{ full: !isSidebarOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link :to="{ name: 'NewRecord' }"
        class="btn-floating btn-large blue"
      >
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue';
import Sidebar from '@/components/app/Sidebar.vue';

export default {
  name: 'MainLayout',
  components: { Navbar, Sidebar },
  data: () => ({
    isSidebarOpen: true,
  }),
  methods: {
    onToggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>
