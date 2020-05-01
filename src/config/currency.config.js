export default {
  // fixer api config options
  access_key: process.env.VUE_APP_FIXER_ACCESS_KEY,
  cur_base: process.env.VUE_APP_FIXER_BASE || 'EUR',
  cur_user_types: process.env.VUE_APP_CURRENCY_USER_TYPES || 'USD,EUR',
  // app config options
  cur_main: process.env.VUE_APP_CURRENCY_USER_MAIN || 'USD',
};
