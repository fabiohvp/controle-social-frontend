const PT_BR_FLOAT_FORMAT = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const PT_BR_INT_FORMAT = new Intl.NumberFormat("pt-BR");

export function formatCurrency(value: number, fractionDigits = 2) {
  if (value === undefined || value === null || isNaN(value)) {
    value = 0;
  }
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
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

/** "3,06B", "-12,5M", "950,00": abreviação com vírgula decimal (eixos e rótulos) */
export function formatMoneyKMB(value: number) {
  const abs = Math.abs(value);
  const sinal = value < 0 ? "-" : "";
  const escalas: [number, string][] = [
    [1e12, "T"],
    [1e9, "B"],
    [1e6, "M"],
    [1e3, "K"],
  ];
  for (const [base, sufixo] of escalas) {
    if (abs >= base) {
      return `${sinal}${PT_BR_FLOAT_FORMAT.format(abs / base).replace(/,00$/, "")}${sufixo}`;
    }
  }
  return `${sinal}${PT_BR_FLOAT_FORMAT.format(abs)}`;
}

/** Valor principal dos cards (critério do site oficial): abrevia a partir de 1 bilhão */
export function formatMoney(value: number) {
  return Math.abs(value) >= 1e9 ? formatMoneyKMB(value) : formatFloat(value);
}

export function formatPercent(value: number) {
  return `${formatFloat(value)}%`;
}
