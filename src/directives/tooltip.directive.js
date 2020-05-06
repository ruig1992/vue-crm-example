export default {
  bind(el, { value }) {
    let html = value;
    let options = {};

    if (typeof value === 'object') {
      html = value.html;
      options = { ...value };
    }

    // https://materializecss.com/tooltips.html
    window.M.Tooltip.init(el, {
      html,
      exitDelay: 0,
      enterDelay: 200,
      margin: 5,
      inDuration: 300,
      outDuration: 250,
      position: 'top',
      transitionMovement: 10,
      ...options,
    });
  },
  unbind(el) {
    const instance = window.M.Tooltip.getInstance(el);
    if (instance && instance.destroy) {
      instance.destroy();
    }
  },
};
