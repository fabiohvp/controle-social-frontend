export type PortalTransparenciaPageProps = {
  ano: string;
  pagina: string;
};

export function generatePortalTransparenciaUrl({
  ano,
  pagina,
  pathname,
}: PortalTransparenciaPageProps & {
  pathname: string;
}) {
  pagina = pagina || getPagina(pathname);
  return `/fiscalizacao/${ano}/portal-transparencia/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[4];
  return pagina;
}
