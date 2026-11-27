/** Formato "singleseries" da API: um ponto por mês/ano */
export type SerieItem = {
  ano: number;
  nome: string;
  valor: number | null;
  displayValue?: string | null;
};

/**
 * Formato "multiseries" da API: `series[i].name` é a categoria do eixo X
 * (geralmente o ano) e `labels[j]` o nome de cada série (legenda);
 * `series[i].values[j]` é o valor da série j na categoria i.
 */
export type MultiSerie = {
  labels: string[];
  series: { name: string; values: (number | null)[] }[];
};

export type FormatoValor = "moeda" | "percentual" | "numero";
