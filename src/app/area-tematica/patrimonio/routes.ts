export type PatrimonioPageProps = {
  pagina: string;
};

export function generatePatrimonioUrl({ pagina }: PatrimonioPageProps) {
  return `/area-tematica/patrimonio/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[3];
  return pagina;
}
