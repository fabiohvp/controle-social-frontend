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
  municipio,
  pagina,
  pathname,
}: MunicipioPageProps & { pathname: string }) {
  municipio = municipio ?? "serra";
  pagina = pagina ?? getPaginaComSegments(pathname);
  return `/municipio/${ano ?? "2023"}/${municipio}/${pagina || "visao-geral"}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[4];
  return pagina;
}

function getPaginaComSegments(pathname: string) {
  const paginaComSegments = pathname.split("/").slice(4).join("/");
  return paginaComSegments;
}
