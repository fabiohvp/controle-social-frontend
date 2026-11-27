export type SaneamentoBasicoPageProps = {
  pagina: string;
};

export function generateSaneamentoBasicoUrl({
  pagina,
}: SaneamentoBasicoPageProps) {
  return `/area-tematica/saneamento-basico/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[3];
  return pagina;
}
