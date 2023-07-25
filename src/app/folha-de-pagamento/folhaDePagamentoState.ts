import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/Dropdown";
import { KeyValue } from "@/types/KeyValue";
import { atom } from "jotai";

export const folhaDePagamentoState = atom({
  anos: Array(8)
    .fill(1)
    .map((_, i) => i + 2016)
    .reverse(),
});

export const FOLHA_DE_PAGAMENTO_PAGES: KeyValue<
  string,
  DropdownValue<string>
>[] = [
  {
    key: "Visão geral",
    value: createDropdownValue("visao-geral"),
  },
  {
    key: "Ativos",
    value: createDropdownValue("ativos"),
  },
  {
    key: "Beneficiários",
    value: createDropdownValue("beneficiarios"),
  },
  {
    key: "Estagiários",
    value: createDropdownValue("estagiarios"),
  },
  {
    key: "Ingressos e desligamentos",
    value: createDropdownValue("contratacoes-e-demissoes"),
  },
  {
    key: "Consulta de vínculo",
    value: createDropdownValue("consulta-vinculo"),
  },
];

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
    if (pathname.includes(`/${page.value.value}`)) {
      return page.value.value;
    }
  }
  return null;
}
