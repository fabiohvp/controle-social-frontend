import { getPagina } from "../routes";

export type GestaoFiscalPageProps = {
  ano: string;
  segment: string;
};

export function generateGestaoFiscalUrl({
  ano,
  pathname,
  segment,
}: GestaoFiscalPageProps & { pathname: string }) {
  const pagina = getPagina(pathname);
  segment = segment ?? getSegment(pathname);
  return `/estado/${ano}/${pagina}/${segment}`;
}

export function getSegment(pathname: string) {
  const segment = pathname.split("/")[4];
  return segment;
}
