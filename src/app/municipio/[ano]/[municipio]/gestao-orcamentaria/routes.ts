import { MunicipioPageProps, getPagina } from "../routes";

export type GestaoOrcamentariaPageProps = {
  segment: string;
} & MunicipioPageProps;

export function generateGestaoOrcamentariaUrl({
  ano,
  municipio,
  pagina,
  pathname,
  segment,
}: GestaoOrcamentariaPageProps & { pathname: string }) {
  pagina = pagina || getPagina(pathname);
  segment = segment || getSegment(pathname);
  return `/municipio/${ano}/${municipio}/${pagina}/${segment}`;
}

export function getSegment(pathname: string) {
  const segment = pathname.split("/")[5];
  return segment || "planejamento-governamental";
}
