export default function (value, currencyCode = 'UAH') {
  const options = {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'symbol',
  };

  return new Intl.NumberFormat('uk', options).format(value);
}
