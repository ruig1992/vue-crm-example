
export default function (value, type = 'upper') {
  if (type.toLowerCase() === 'lower') {
    return value.toLowerCase();
  }
  return value.toUpperCase();
}
