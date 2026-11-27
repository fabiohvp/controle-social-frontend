export type PrevidenciaPageProps = {
  pagina: string;
};

export function generatePrevidenciaUrl({ pagina }: PrevidenciaPageProps) {
  return `/area-tematica/previdencia/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[3];
  return pagina;
}
