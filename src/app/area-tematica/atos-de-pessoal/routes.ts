export type AtosPessoalPageProps = {
  pagina: string;
};

export function generateAtosPessoalUrl({ pagina }: AtosPessoalPageProps) {
  return `/area-tematica/atos-de-pessoal/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[3];
  return pagina;
}
