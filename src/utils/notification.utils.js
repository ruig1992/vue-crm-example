// eslint-disable-next-line func-names
const msg = function (html, options) {
  if (!html) {
    return;
  }
  window.M.toast({
    ...options,
    html,
  });
};

/* eslint-disable no-param-reassign */
export default {
  install(Vue) {
    Vue.prototype.$notify = {
      show(html, options) {
        msg(html, options);
      },
      error(html, options) {
        msg(`[Error]: ${html}`, {
          ...options,
          classes: 'error',
        });
      },
    };
  },
};
