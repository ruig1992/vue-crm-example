import config from '@/config/currency.config';
import { msgCurrency } from '@/utils/messages';

export const userCurrenciesAsArray = config.cur_user_types.split(',');

export async function getExchangeRate() {
  const res = await fetch(
    `http://data.fixer.io/api/latest?access_key=${config.access_key}&symbols=${config.cur_user_types}&base=${config.cur_base}`,
  );
  const data = await res.json();

  if (!data.success) {
    data.app_error_msg = msgCurrency.exchange_rate_err;
  }

  return data;
}

export function getBaseCoefficient(value, rates = {}) {
  if (!value) {
    return 0;
  }
  return value / (rates[config.cur_main] / rates[config.cur_base]);
}
