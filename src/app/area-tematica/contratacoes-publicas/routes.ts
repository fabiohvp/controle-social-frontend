export type ContratacoesPublicasPageProps = {
  pagina: string;
};

export function generateContratacoesPublicasUrl({
  pagina,
}: ContratacoesPublicasPageProps) {
  return `/area-tematica/contratacoes-publicas/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[3];
  return pagina;
}
