import { getPagina } from "../routes";

export type GestaoOrcamentariaPageProps = {
  ano: string;
  municipio: string;
  segment: string;
};

export function generateGestaoOrcamentariaUrl<T>({
  ano,
  municipio,
  pathname,
  segment,
}: GestaoOrcamentariaPageProps & { pathname: string }) {
  const pagina = getPagina(pathname);
  segment = segment ?? getSegment(pathname);
  return `/municipio/${ano}/${municipio}/${pagina}/${segment}`;
}

export function getSegment(pathname: string) {
  const segment = pathname.split("/")[5];
  return segment;
}
