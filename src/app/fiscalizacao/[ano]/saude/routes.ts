export type SaudePageProps = {
  ano: string;
  pagina: string;
};

export function generateSaudeUrl({
  ano,
  pagina,
  pathname,
}: SaudePageProps & { pathname: string }) {
  pagina = pagina || getPagina(pathname);
  return `/fiscalizacao/${ano}/saude/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[4];
  return pagina;
}
