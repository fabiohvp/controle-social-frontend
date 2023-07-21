import { atom } from "jotai";
import { FOLHA_DE_PAGAMENTO_PAGES } from "./folha-de-pagamento-constants";

export const folhaDePagamentoState = atom({
  anos: Array(8)
    .fill(1)
    .map((_, i) => i + 2016)
    .reverse(),
});

export function generateFolhaDePagamentoUrl({
  ano,
  mes,
  poder,
  unidadeGestora,
  segment,
}: {
  ano?: string;
  mes?: string;
  poder?: string;
  unidadeGestora?: string;
  segment: string;
}) {
  if (segment === "consulta-vinculo") {
    return "/folha-de-pagamento/consulta-vinculo";
  }
  const baseUrl = `/folha-de-pagamento/${poder ?? "todos"}/${ano ?? 2023}`;

  if (segment === "contratacoes-e-demissoes") {
    return `${baseUrl}/${segment}/${unidadeGestora ?? ""}`;
  }
  return `${baseUrl}/${mes ?? 1}/${segment}/${unidadeGestora ?? ""}`;
}

export function getFolhaDePagamentoSegment(pathname: string) {
  for (const page of FOLHA_DE_PAGAMENTO_PAGES) {
    if (pathname.includes(`/${page.value}`)) {
      return page.value;
    }
  }
  return null;
}
