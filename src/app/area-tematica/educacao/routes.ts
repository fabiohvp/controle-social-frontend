export type EducacaoPageProps = {
  pagina: string;
};

export function generateEducacaoUrl({ pagina }: EducacaoPageProps) {
  return `/area-tematica/educacao/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[3];
  return pagina;
}
