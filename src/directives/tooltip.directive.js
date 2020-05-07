const createTooltip = (el, value) => {
  let html = value;
  let options = {};

  if (typeof value === 'object') {
    html = value.html;
    options = { ...value };
  }

  // https://materializecss.com/tooltips.html
  window.M.Tooltip.init(el, {
    exitDelay: 0,
    enterDelay: 200,
    margin: 5,
    inDuration: 300,
    outDuration: 250,
    position: 'top',
    transitionMovement: 10,
    ...options,
    html,
  });
};
const destroyTooltip = (el) => {
  const instance = window.M.Tooltip.getInstance(el);
  if (instance && instance.destroy) {
    instance.destroy();
  }
};

export default {
  bind(el, { value }) {
    createTooltip(el, value);
  },
  update(el, { value, oldValue }) {
    if (value === oldValue) {
      return;
    }
    destroyTooltip(el);
    createTooltip(el, value);
  },
  unbind(el) {
    destroyTooltip(el);
  },
};
