export type ObrigacaoEnvioPageProps = {
  ano: string;
  pagina: string;
};

export function generateObrigacaoEnvioUrl({
  ano,
  pagina,
  pathname,
}: ObrigacaoEnvioPageProps & { pathname: string }) {
  pagina = pagina || getPagina(pathname);
  return `/obrigacao-de-envio/${ano}/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[3];
  return pagina;
}
