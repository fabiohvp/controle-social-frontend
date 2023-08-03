export type ConcessaoPublicaPageProps = {
  pagina: string;
};

export function generateConcessaoPublicaUrl({
  pagina,
}: ConcessaoPublicaPageProps) {
  return `/area-tematica/concessao-publica/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[3];
  return pagina;
}
