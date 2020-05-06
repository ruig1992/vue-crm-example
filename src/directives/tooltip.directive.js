export default {
  bind(el, binding) {
    const { value } = binding;

    window.M.Tooltip.init(el, {
      html: value,
    });
  },
  unbind(el) {
    const instance = window.M.Tooltip.getInstance(el);
    if (instance && instance.destroy) {
      instance.destroy();
    }
  },
};
