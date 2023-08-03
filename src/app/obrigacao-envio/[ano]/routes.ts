export type ObrigacaoEnvioPageProps = {
  ano: string;
  pagina: string;
};

export function generateObrigacaoEnvioUrl<T>({
  ano,
  pagina,
  pathname,
}: ObrigacaoEnvioPageProps & { pathname: string }) {
  pagina = pagina ?? getPagina(pathname);
  return `/obrigacao-envio/${ano}/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[3];
  return pagina;
}
