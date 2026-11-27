export type RankingsPageProps = {
  ano: string;
};

/** Primeiro exercício com dados nos endpoints `RankingsControllers`. */
export const ANO_INICIO_RANKINGS = 2013;

/** Exercício corrente (mesmo padrão do site oficial: `settings.anoCorrente`). */
export function getAnoAtualRankings() {
  return new Date().getFullYear();
}

export function getAnosRankings() {
  const anoAtual = getAnoAtualRankings();
  return Array.from(
    { length: anoAtual - ANO_INICIO_RANKINGS + 1 },
    (_, i) => anoAtual - i
  );
}

export function isAnoRankingValido(ano: string) {
  const valor = Number(ano);
  return (
    Number.isInteger(valor) &&
    valor >= ANO_INICIO_RANKINGS &&
    valor <= getAnoAtualRankings()
  );
}

/** Ranking aberto por padrão (links do header/home e redirects). */
export const RANKING_PADRAO = { categoria: "receita", slug: "arrecadada" };

export function generateRankingsUrl({
  ano,
  categoria,
  pathname = "",
  slug,
}: {
  ano?: number | string;
  categoria?: string;
  pathname?: string;
  slug?: string;
}) {
  categoria = categoria || getCategoria(pathname) || RANKING_PADRAO.categoria;
  slug =
    slug ||
    (categoria === getCategoria(pathname) ? getSlug(pathname) : undefined) ||
    RANKING_PADRAO.slug;
  return `/rankings/${ano ?? getAnoAtualRankings()}/${categoria}/${slug}`;
}

export function getCategoria(pathname: string) {
  return pathname.split("/")[3];
}

export function getSlug(pathname: string) {
  return pathname.split("/")[4];
}
