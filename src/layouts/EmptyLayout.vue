<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import msg from '@/utils/messages';

export default {
  name: 'EmptyLayout',
  computed: {
    error() {
      return this.$store.getters.error;
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
};
</script>
