export type FolhaDePagamentoPageProps = {
  ano: string;
  mes: string;
  pagina: string;
  poder: string;
  unidadeGestora: string;
};

export function generateFolhaDePagamentoUrl({
  ano,
  mes,
  pagina,
  pathname,
  poder,
  unidadeGestora,
}: FolhaDePagamentoPageProps & { pathname: string }) {
  pagina = pagina ?? getPagina(pathname);

  if (pagina === "consulta-vinculo") {
    return "/folha-de-pagamento/consulta-vinculo";
  }
  const baseUrl = `/folha-de-pagamento/${poder ?? "todos"}/${ano ?? 2023}`;

  if (pagina === "contratacoes-e-demissoes") {
    return `${baseUrl}/${pagina}/${unidadeGestora ?? ""}`;
  }
  return `${baseUrl}/${mes ?? 1}/${pagina}/${unidadeGestora ?? ""}`;
}

export function getPagina(pathname: string) {
  let paginaIndex = 5;

  if (pathname.includes("/consulta-vinculo")) {
    paginaIndex = 2;
  } else if (pathname.includes("/contratacoes-e-demissoes")) {
    paginaIndex = 4;
  }
  const pagina = pathname.split("/")[paginaIndex];
  return pagina;
}
