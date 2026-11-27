import { CSSProperties } from "react";

export type EstadoPageProps = {
  ano: string;
  pagina: string;
};

export type EstadoPanelProps = {
  style?: CSSProperties;
} & EstadoPageProps;

/** Posições no pathname: /estado/[ano]/[pagina]/[subpagina]/[unidadeGestora] */
export const INDICE_SEGMENTO_ANO = 2;
export const INDICE_SEGMENTO_PAGINA = 3;
export const INDICE_SEGMENTO_SUBPAGINA = 4;

export function getUrlBaseEstado(ano: string) {
  return `/estado/${ano}`;
}

export function generateEstadoUrl({
  ano,
  pagina,
  pathname,
}: EstadoPageProps & { pathname: string }) {
  pagina = pagina || getPagina(pathname);
  return `/estado/${ano}/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[INDICE_SEGMENTO_PAGINA];
  return pagina;
}
