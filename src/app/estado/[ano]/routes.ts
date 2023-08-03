import { CSSProperties } from "react";

export type EstadoPageProps = {
  ano: string;
  pagina: string;
};

export type EstadoPanelProps = {
  style?: CSSProperties;
} & EstadoPageProps;

export function generateEstadoUrl({
  ano,
  pagina,
  pathname,
}: EstadoPageProps & { pathname: string }) {
  pagina = pagina ?? getPagina(pathname);
  return `/estado/${ano}/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[3];
  return pagina;
}
