/* eslint-disable no-param-reassign */
export default {
  install(Vue) {
    Vue.prototype.$showMsg = (html, options) => {
      window.M.toast({
        ...options,
        html,
      });
    };

    Vue.prototype.$showError = (html, options) => {
      window.M.toast({
        ...options,
        html: `[Error]: ${html}`,
        classes: 'error',
      });
    };
  },
};
