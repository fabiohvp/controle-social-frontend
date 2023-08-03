export type AssistenciaSocialPageProps = {
  pagina: string;
};

export function generateAssistenciaSocialUrl({
  pagina,
}: AssistenciaSocialPageProps) {
  return `/area-tematica/assistencia-social/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[3];
  return pagina;
}
