export default function (value, format = 'date') {
  let options = {};

  if (format.includes('date')) {
    options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    };
  }
  if (format.includes('time')) {
    options = {
      ...options,
      hour: '2-digit',
      minute: '2-digit',
    };
  }

  return new Intl.DateTimeFormat('uk', options).format(value);
}
