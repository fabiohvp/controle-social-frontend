export function formatCurrency(value: number) {
  const stringValue = formatPositiveCurrencyValue(value);

  if (value < 0) {
    return `-${stringValue}`;
  }
  return stringValue;
}

function formatPositiveCurrencyValue(value: number) {
  if (value < 1e3) return value.toString();
  if (value >= 1e3 && value < 1e6) return +(value / 1e3).toFixed(2) + "K";
  if (value >= 1e6 && value < 1e9) return +(value / 1e6).toFixed(2) + "M";
  if (value >= 1e9 && value < 1e12) return +(value / 1e9).toFixed(2) + "B";
  return +(value / 1e12).toFixed(2) + "T";
}
