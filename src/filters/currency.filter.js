export default function (value, currencyCode = 'UAH') {
  if (!value) {
    return null;
  }

  const options = {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'symbol',
  };

  return new Intl.NumberFormat('uk', options).format(value);
}
