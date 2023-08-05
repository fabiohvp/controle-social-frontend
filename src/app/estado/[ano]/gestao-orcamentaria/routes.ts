import { getPagina } from "../routes";

export type GestaoOrcamentariaPageProps = {
  ano: string;
  segment: string;
};

export function generateGestaoOrcamentariaUrl({
  ano,
  pathname,
  segment,
}: GestaoOrcamentariaPageProps & { pathname: string }) {
  const pagina = getPagina(pathname);
  segment = segment || getSegment(pathname);
  return `/estado/${ano}/${pagina}/${segment}`;
}

export function getSegment(pathname: string) {
  const segment = pathname.split("/")[4];
  return segment;
}
