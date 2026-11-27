import { ReactNode } from "react";

/**
 * Item de menu (sidebar + breadcrumb) de uma seção com páginas.
 * Cada seção (ex.: gestao-fiscal) declara TODAS as páginas do site oficial no
 * seu `routes.ts`; as que ainda não existem ficam com `implementado: false` e
 * são ocultadas da sidebar/breadcrumb e redirecionadas pela rota fallback.
 */
export type Pagina = {
  /** segmento da URL, em kebab-case */
  slug: string;
  /** texto exibido na sidebar e no breadcrumb */
  titulo: string;
  /** tooltip da sidebar e texto do breadcrumb principal (default: titulo) */
  tituloCompleto?: string;
  /** true quando a page.tsx existe; false oculta o item */
  implementado: boolean;
  /** anos do seletor de ano para esta página (decrescente). Default: anos da seção */
  anos?: number[];
  /** link absoluto, quando o item aponta para fora da seção (ex.: área temática) */
  href?: string;
};

/** Grupo da sidebar (ex.: "Gestão fiscal") com as páginas declaradas no routes.ts da seção */
export type Secao = {
  slug: string;
  titulo: string;
  tituloCompleto?: string;
  paginas: Pagina[];
};

export type ItemMenu = (Pagina | Secao) & { icone: ReactNode };

export function isSecao(item: Pagina | Secao): item is Secao {
  return "paginas" in item;
}

/** Equivale ao `settings.anoCorrente` do site oficial */
export const ANO_CORRENTE = new Date().getFullYear();

/** Anos em ordem decrescente, de `fim` até `inicio` (inclusive). Ex.: gerarAnos(2018, ANO_CORRENTE) */
export function gerarAnos(inicio: number, fim: number = ANO_CORRENTE) {
  return Array.from({ length: fim - inicio + 1 }, (_, i) => fim - i);
}

export function getPaginasImplementadas(paginas: Pagina[]) {
  return paginas.filter((pagina) => pagina.implementado);
}

/** Primeira página implementada da seção (destino de /secao e da rota fallback) */
export function getPaginaPadrao(paginas: Pagina[]) {
  return paginas.find((pagina) => pagina.implementado);
}

export function getPaginaPorSlug(paginas: Pagina[], slug: string | undefined) {
  return paginas.find((pagina) => pagina.slug === slug);
}

/** Item do menu está visível? (página implementada ou seção com ao menos uma página implementada) */
export function isItemMenuVisivel(item: Pagina | Secao) {
  return isSecao(item) ? !!getPaginaPadrao(item.paginas) : item.implementado;
}

/** Caminho relativo à base da entidade: "visao-geral" ou "gestao-fiscal/receita-corrente-liquida" */
export function getCaminhoItemMenu(item: Pagina | Secao) {
  if (!isSecao(item)) return item.slug;
  const padrao = getPaginaPadrao(item.paginas);
  return padrao ? `${item.slug}/${padrao.slug}` : item.slug;
}

/**
 * Troca o segmento `indice` do pathname por `valor`, mantendo os demais.
 * Ex.: getUrlComSegmento("/municipio/2024/vitoria/gestao-fiscal/rcl", 2, "2023")
 *  => "/municipio/2023/vitoria/gestao-fiscal/rcl"
 * `manterSegmentos` corta o que vier depois do índice informado.
 */
export function getUrlComSegmento(
  pathname: string,
  indice: number,
  valor: string,
  manterSegmentos?: number
) {
  const segmentos = pathname.split("/");
  segmentos[indice] = valor;
  return segmentos
    .slice(0, manterSegmentos ?? segmentos.length)
    .join("/");
}
