export type DesigualdadeEducacionalPageProps = {
  ano: string;
  pagina: string;
};

export function generateDesigualdadeEducacionalUrl({
  ano,
  pagina,
  pathname,
}: DesigualdadeEducacionalPageProps & { pathname: string }) {
  pagina = pagina || getPagina(pathname);
  return `/fiscalizacao/${ano}/educacao/desigualdade-educacional/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[5];
  return pagina;
}
