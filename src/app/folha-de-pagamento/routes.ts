export type FolhaDePagamentoPageProps = {
  ano: string;
  mes: string;
  pagina: string;
  poder: string;
  unidadeGestora: string;
};

// Páginas sem filtros (poder/ano/mês/UG), cujo conteúdo é um painel externo
// ou um formulário. Ficam diretamente em /folha-de-pagamento/<pagina>.
export const PAGINAS_SEM_FILTROS = [
  "afastamento",
  "consulta-vinculo",
  "ingressos-desligamentos",
  "vantagens-descontos",
];

export function generateFolhaDePagamentoUrl({
  ano,
  mes,
  pagina,
  pathname,
  poder,
  unidadeGestora,
}: FolhaDePagamentoPageProps & { pathname: string }) {
  pagina = pagina || getPagina(pathname);

  if (PAGINAS_SEM_FILTROS.includes(pagina)) {
    return `/folha-de-pagamento/${pagina}`;
  }
  const baseUrl = `/folha-de-pagamento/${poder ?? "todos"}/${ano ?? 2023}`;
  return `${baseUrl}/${mes ?? 1}/${pagina}/${unidadeGestora ?? ""}`;
}

export function getPagina(pathname: string) {
  const segments = pathname.split("/");

  if (PAGINAS_SEM_FILTROS.includes(segments[2])) {
    return segments[2];
  }
  return segments[5];
}
