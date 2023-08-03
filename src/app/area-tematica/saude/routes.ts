export type SaudePageProps = {
  pagina: string;
};

export function generateSaudeUrl({ pagina }: SaudePageProps) {
  return `/area-tematica/saude/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[3];
  return pagina;
}
