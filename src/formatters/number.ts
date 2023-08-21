const PT_BR_FLOAT_FORMAT = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const PT_BR_INT_FORMAT = new Intl.NumberFormat("pt-BR");

export function formatCurrency(value: number, fractionDigits = 2) {
  if (!value) {
    value = 0;
  }
  return value.toFixed(fractionDigits).replace(".", ",");
}

export function formatCurrencyKMB(value: number) {
  const stringValue = formatPositiveCurrencyValue(value);

  if (value < 0) {
    return `-${stringValue}`;
  }
  return stringValue;
}

export function formatFloat(value: number | undefined) {
  if (value === undefined) return "";
  return PT_BR_FLOAT_FORMAT.format(value);
}

export function formatInt(value: number | undefined) {
  if (value === undefined) return "";
  return PT_BR_INT_FORMAT.format(value);
}

function formatPositiveCurrencyValue(value: number) {
  if (value < 1e3) return value.toString();
  if (value >= 1e3 && value < 1e6) return +(value / 1e3).toFixed(2) + "K";
  if (value >= 1e6 && value < 1e9) return +(value / 1e6).toFixed(2) + "M";
  if (value >= 1e9 && value < 1e12) return +(value / 1e9).toFixed(2) + "B";
  return +(value / 1e12).toFixed(2) + "T";
}
