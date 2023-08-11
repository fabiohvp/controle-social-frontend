import { useGlobalState } from "@/providers/GlobalProvider";
import { CSSProperties, use } from "react";

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
  municipio,
  pagina,
  pathname,
}: MunicipioPageProps & { pathname: string }) {
  const globalState = use(useGlobalState());

  municipio = municipio ?? globalState.municipio.nomeNormalizado;
  pagina = pagina || getPagina(pathname);
  return `/municipio/${ano ?? "2023"}/${municipio}/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[4];
  return pagina || "visao-geral";
}
