export type BoletinsPageProps = {
  ano: string;
  mes: string | undefined;
  pagina: string | undefined;
};

export function generateBoletinsUrl({
  ano,
  mes,
  pagina,
  pathname,
}: BoletinsPageProps & { pathname: string }) {
  if (pagina || !mes) {
    pagina = pagina ?? getPagina(pathname) ?? "";
    return `/boletins/${ano}/${pagina}`;
  }
  return `/boletins/${ano}/${mes}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[3];
  return pagina;
}
