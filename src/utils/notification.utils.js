const msg = (html, options) => {
  if (!html) {
    return;
  }

  let htmlStr = html;
  if (options && options.msg_params) {
    htmlStr = html.replace(/\{(\d+)\}/g, (all, num) => options.msg_params[num] || all);
  }

  window.M.toast({
    displayLength: 1200,
    ...options,
    html: htmlStr,
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
