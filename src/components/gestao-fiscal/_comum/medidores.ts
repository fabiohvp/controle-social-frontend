import { COR_MEDIDOR, FaixaMedidor, SituacaoMedidor } from "./MedidorLimite";

const PCT = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 });
export const pct = (v: number) => `${PCT.format(v)}%`;

/**
 * Escala usada pelos medidores de limite máximo do site oficial
 * (lowerLimit/upperLimit do FusionCharts): começa em 55% do limite (ou 70% do
 * valor apurado, se menor) e termina 10% acima do limite.
 */
export function escalaLimiteMaximo(limite: number, valor: number) {
  return {
    min: Math.min(limite * 0.55, valor * 0.7),
    max: Math.max(limite * 1.1, valor),
  };
}

/** Faixas alerta/prudencial/máximo (Pessoal) com as cores do site oficial */
export function faixasPessoal(alerta: number, prudencial: number, maximo: number, max: number): FaixaMedidor[] {
  return [
    { ate: alerta, cor: COR_MEDIDOR.ok, rotulo: pct(alerta) },
    { ate: prudencial, cor: COR_MEDIDOR.atencao, rotulo: pct(prudencial) },
    { ate: maximo, cor: COR_MEDIDOR.alerta, rotulo: pct(maximo) },
    { ate: max, cor: COR_MEDIDOR.ruim },
  ];
}

/** Faixas de limite mínimo (Saúde, Educação, FUNDEB): vermelho abaixo do mínimo */
export function faixasMinimo(minimo: number, max: number): FaixaMedidor[] {
  return [
    { ate: minimo, cor: COR_MEDIDOR.ruim, rotulo: pct(minimo) },
    { ate: max, cor: COR_MEDIDOR.ok },
  ];
}

export function situacaoMaximo(valor: number, alerta: number, maximo: number): SituacaoMedidor {
  if (valor >= maximo) return "ruim";
  if (valor >= alerta) return "alerta";
  return "ok";
}

export function situacaoMinimo(valor: number, minimo: number): SituacaoMedidor {
  return valor >= minimo ? "ok" : "ruim";
}

export function toNumber(valor: unknown): number | null {
  if (valor === null || valor === undefined || valor === "") return null;
  const n = typeof valor === "number" ? valor : parseFloat(String(valor).replace(",", "."));
  return Number.isNaN(n) ? null : n;
}
