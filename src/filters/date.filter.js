export default function (value, format = 'date') {
  let options = {};
  let date = value;

  if (!(value instanceof Date)) {
    date = new Date(value);
  }

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

  return new Intl.DateTimeFormat('uk', options).format(date);
}
