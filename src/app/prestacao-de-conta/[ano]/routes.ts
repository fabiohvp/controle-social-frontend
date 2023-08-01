import { PrestacaoDeContaGovernoPageProps } from "./types";

export function generatePrestacaoDeContaUrl({
  ano,
  tipoConta,
  tipoEsferaAdministrativa,
  tipoUnidadeGestora,
}: PrestacaoDeContaGovernoPageProps) {
  return `/prestacao-de-conta/${
    ano ?? 2023
  }/${tipoEsferaAdministrativa}/${tipoConta}/${tipoUnidadeGestora}`;
}
