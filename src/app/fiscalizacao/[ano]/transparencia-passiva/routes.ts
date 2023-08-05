export type TransparenciaPassivaPageProps = {
  ano: string;
  pagina: string;
};

export function generateTransparenciaPassivaUrl({
  ano,
  pagina,
  pathname,
}: TransparenciaPassivaPageProps & {
  pathname: string;
}) {
  pagina = pagina || getPagina(pathname);
  return `/fiscalizacao/${ano}/transparencia-passiva/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[4];
  return pagina;
}
