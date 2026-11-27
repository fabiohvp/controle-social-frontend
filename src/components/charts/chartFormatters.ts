import {
  formatFloat,
  formatInt,
  formatMoneyKMB,
  formatPercent,
} from "@/formatters/number";
import { FormatoValor } from "@/types/Serie";

/** Texto completo (tooltip): "R$ 3.057.186.963,91", "54,32%", "1.234" */
export function getFormatadorValor(formato: FormatoValor) {
  switch (formato) {
    case "percentual":
      return (valor: number) => formatPercent(valor);
    case "numero":
      return (valor: number) => formatInt(valor);
    default:
      return (valor: number) => `R$ ${formatFloat(valor)}`;
  }
}

/** Texto curto (eixo/rótulo): "3,06B", "54,32%", "1.234" */
export function getFormatadorAbreviado(formato: FormatoValor) {
  switch (formato) {
    case "percentual":
      return (valor: number) => formatPercent(valor);
    case "numero":
      return (valor: number) => formatInt(valor);
    default:
      return (valor: number) => formatMoneyKMB(valor);
  }
}
