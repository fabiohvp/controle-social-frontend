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
  const pagina = pathname.split("/")[4];
  return pagina || "visao-geral";
}
