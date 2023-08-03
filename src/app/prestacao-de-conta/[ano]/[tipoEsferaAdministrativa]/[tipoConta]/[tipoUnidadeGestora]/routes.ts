export type PrestacaoDeContaGovernoPageProps = {
  ano: string;
  tipoConta: string;
  tipoEsferaAdministrativa: string;
  tipoUnidadeGestora: string;
};

export function generatePrestacaoDeContaUrl({
  ano,
  tipoConta,
  tipoEsferaAdministrativa,
  tipoUnidadeGestora,
}: PrestacaoDeContaGovernoPageProps) {
  return `/prestacao-de-conta/${ano}/${tipoEsferaAdministrativa}/${tipoConta}/${tipoUnidadeGestora}`;
}
