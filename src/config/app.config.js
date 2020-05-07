export default {
  locales: (process.env.VUE_APP_AVAILABLE_LOCALES || 'uk,en').split(','),
};
