import { GlobalState } from "@/shared/globalState";
import { CSSProperties } from "react";

export type MunicipioPageProps = {
  ano: string;
  municipio: string;
  pagina: string;
};

export type MunicipioPanelProps = {
  style?: CSSProperties;
} & MunicipioPageProps;

/** Posições no pathname: /municipio/[ano]/[municipio]/[pagina]/[subpagina]/[unidadeGestora] */
export const INDICE_SEGMENTO_ANO = 2;
export const INDICE_SEGMENTO_MUNICIPIO = 3;
export const INDICE_SEGMENTO_PAGINA = 4;
export const INDICE_SEGMENTO_SUBPAGINA = 5;

export function getUrlBaseMunicipio(ano: string, municipio: string) {
  return `/municipio/${ano}/${municipio}`;
}

export function generateMunicipioUrl({
  ano,
  globalState,
  municipio,
  pagina,
  pathname,
}: MunicipioPageProps & { globalState: GlobalState; pathname: string }) {
  ano = ano ?? globalState.anos.municipio.anoAtual;
  municipio = municipio ?? globalState.municipio.nomeNormalizado;
  pagina = pagina || getPagina(pathname);
  return `/municipio/${ano}/${municipio}/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[INDICE_SEGMENTO_PAGINA];
  return pagina || "visao-geral";
}
