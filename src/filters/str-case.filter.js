
export default function (value, type = 'upper') {
  if (!value) {
    return null;
  }
  if (type.toLowerCase() === 'lower') {
    return value.toLowerCase();
  }
  return value.toUpperCase();
}
