const msg = (html, options) => {
  if (!html) {
    return;
  }
  window.M.toast({
    displayLength: 1200,
    ...options,
    html,
  });
};

export default {
  install(Vue) {
    Vue.prototype.$notify = {
      show(html, options) {
        msg(html, options);
      },
      error(html, options) {
        msg(`[Error]: ${html}`, {
          displayLength: 3000,
          ...options,
          classes: 'error',
        });
      },
    };
  },
};
