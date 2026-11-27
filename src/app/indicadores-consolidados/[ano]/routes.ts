export type IndicadoresPageProps = {
  ano: string;
};

/** Primeiro exercício disponível (mesmo recorte dos rankings). */
export const ANO_INICIO_INDICADORES = 2013;

/** Indicador aberto por padrão (links do header/home e redirects). */
export const INDICADOR_PADRAO = "receita";

export function getAnoAtualIndicadores() {
  return new Date().getFullYear();
}

export function getAnosIndicadores() {
  const anoAtual = getAnoAtualIndicadores();
  return Array.from(
    { length: anoAtual - ANO_INICIO_INDICADORES + 1 },
    (_, i) => anoAtual - i
  );
}

export function isAnoIndicadoresValido(ano: string) {
  const valor = Number(ano);
  return (
    Number.isInteger(valor) &&
    valor >= ANO_INICIO_INDICADORES &&
    valor <= getAnoAtualIndicadores()
  );
}

export function generateIndicadoresUrl({
  ano,
  slug,
}: {
  ano?: number | string;
  slug?: string;
}) {
  return `/indicadores-consolidados/${ano ?? getAnoAtualIndicadores()}/${
    slug || INDICADOR_PADRAO
  }`;
}

/** Slug da página em `/indicadores-consolidados/:ano/:slug`. */
export function getSlugIndicador(pathname: string) {
  return pathname.split("/")[3];
}

/** Rota de um município com o mesmo ano (para links de tabela/mapa). */
export function getUrlMunicipioIndicador(
  ano: number | string,
  nomeNormalizado: string,
  paginaMunicipio = "visao-geral"
) {
  return `/municipio/${ano}/${nomeNormalizado}/${paginaMunicipio}`;
}
