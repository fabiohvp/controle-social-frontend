import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/Dropdown";
import { KeyValue } from "@/types/KeyValue";
import { atom } from "jotai";

export const municipioState = atom({
  anos: Array(15)
    .fill(1)
    .map((_, i) => i + 2009)
    .reverse(),
});

export const MUNICIPIO_PAGES: KeyValue<string, DropdownValue<string>>[] = [
  { key: "Visão geral", value: createDropdownValue("visao-geral") },
  {
    key: "Obrigações junto ao TCE-ES",
    value: createDropdownValue("obrigacao-envio"),
  },
  {
    key: "Gestão orçamentária",
    value: createDropdownValue(
      "gestao-orcamentaria/planejamento-governamental"
    ),
  },
  {
    key: "Gestão fiscal",
    value: createDropdownValue("gestao-fiscal/meta-arrecadacao"),
  },
  {
    key: "Prestação de contas",
    value: createDropdownValue("prestacao-conta"),
  },
];

export function generateMunicipioUrl({
  ano,
  municipio,
  segment,
}: {
  ano?: string;
  municipio?: string;
  segment?: string;
}) {
  return `/municipio/${ano ?? 2023}/${municipio ?? "serra"}/${
    segment ?? "visao-geral"
  }`;
}

export function getMunicipioSegment(pathname: string) {
  for (const page of MUNICIPIO_PAGES) {
    if (pathname.includes(`/${page.value.value.split("/")[0]}`)) {
      return page.value.value;
    }
  }
  return null;
}
