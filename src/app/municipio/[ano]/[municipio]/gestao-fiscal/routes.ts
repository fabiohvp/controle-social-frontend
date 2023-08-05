import { MunicipioPageProps, getPagina } from "../routes";

export type GestaoFiscalPageProps = {
  segment: string;
} & MunicipioPageProps;

export function generateGestaoFiscalUrl({
  ano,
  municipio,
  pagina,
  pathname,
  segment,
}: GestaoFiscalPageProps & { pathname: string }) {
  pagina = pagina || getPagina(pathname);
  segment = segment || getSegment(pathname);
  return `/municipio/${ano}/${municipio}/${pagina}/${segment}`;
}

export function getSegment(pathname: string) {
  const segment = pathname.split("/")[5];
  return segment || "meta-arrecadacao";
}
