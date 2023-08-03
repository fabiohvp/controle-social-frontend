export type OfertaXDemandaLabelPageProps = {
  ano: string;
  pagina: string;
};

export function generateOfertaXDemandaUrl({
  ano,
  pagina,
  pathname,
}: OfertaXDemandaLabelPageProps & { pathname: string }) {
  pagina = pagina ?? getPagina(pathname);
  return `/fiscalizacao/${ano}/educacao/oferta-x-demanda/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[5];
  return pagina;
}
