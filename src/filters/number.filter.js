export default function (value) {
  if (!value) {
    return 0;
  }

  return new Intl.NumberFormat('uk-UA').format(value);
}
