export type EmendasParlamentaresPageProps = {
  pagina: string;
};

export function generateEmendasParlamentaresUrl({
  pagina,
}: EmendasParlamentaresPageProps) {
  return `/area-tematica/emendas-parlamentares/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[3];
  return pagina;
}
