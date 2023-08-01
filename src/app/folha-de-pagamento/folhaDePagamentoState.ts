import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { atom } from "jotai";

export const folhaDePagamentoState = atom({
  anos: Array(8)
    .fill(1)
    .map((_, i) => i + 2016)
    .reverse(),
});

export const FOLHA_DE_PAGAMENTO_PAGES: Map<
  string,
  DropdownValue<string>
> = new Map([
  ["Visão geral", createDropdownValue("visao-geral")],
  ["Ativos", createDropdownValue("ativos")],
  ["Beneficiários", createDropdownValue("beneficiarios")],
  ["Estagiários", createDropdownValue("estagiarios")],
  [
    "Ingressos e desligamentos",
    createDropdownValue("contratacoes-e-demissoes"),
  ],
  ["Consulta de vínculo", createDropdownValue("consulta-vinculo")],
]);

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
  for (const page of FOLHA_DE_PAGAMENTO_PAGES.values()) {
    if (pathname.includes(`/${page.value}`)) {
      return page.value;
    }
  }
  return null;
}
