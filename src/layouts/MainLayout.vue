<template>
  <div>
    <ProgressLoader v-if="loading" />

    <div v-else class="app-main-layout">
      <Navbar @toggleSidebar="onToggleSidebar" />
      <Sidebar :isOpen="isSidebarOpen" :key="$i18n.locale" />

      <main class="app-content" :class="{ full: !isSidebarOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div
        v-if="this.$route.name !== 'NewRecord'"
        class="fixed-action-btn"
        :key="locale + '1'"
      >
        <router-link :to="{ name: 'NewRecord' }"
          class="btn-floating btn-large blue"
          v-tooltip="$t('links.create_new_record')"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue';
import Sidebar from '@/components/app/Sidebar.vue';
import msg from '@/utils/messages';

export default {
  name: 'MainLayout',
  components: { Navbar, Sidebar },
  data: () => ({
    isSidebarOpen: true,
    loading: true,
  }),
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
      return this.$store.getters.info.locale;
    },
  },
  watch: {
    error(err) {
      if (!err.status) {
        return;
      }
      this.$notify.error(msg[err.code] || err.message, {
        completeCallback: () => {
          this.$store.dispatch('resetError');
        },
      });
    },
  },
  async mounted() {
    if (this.$store.getters.isEmptyInfo) {
      await this.$store.dispatch('getInfo');
      this.$i18n.locale = this.locale;
    }
    this.loading = false;
  },
  methods: {
    onToggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>
