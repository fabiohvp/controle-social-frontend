import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/Dropdown";
import { KeyValue } from "@/types/KeyValue";
import { atom } from "jotai";

export const prestacaoDeContaState = atom({
  anos: Array(15)
    .fill(1)
    .map((_, i) => i + 2009)
    .reverse(),
});

export const PRESTACAO_DE_CONTA_PAGES: KeyValue<
  string,
  DropdownValue<string>
>[] = [
  { key: "Estado", value: createDropdownValue("estado") },
  {
    key: "Municípios",
    value: createDropdownValue("municipios"),
  },
];

export function generatePrestacaoDeContaUrl({
  ano,
  segment,
  unidadeGestora,
}: {
  ano?: string;
  unidadeGestora?: string;
  segment: string;
}) {
  return `/prestacao-de-conta/${ano ?? 2023}/${
    unidadeGestora ?? "municipios"
  }/${segment ?? "governo"}`;
}

export function getPrestacaoDeContaSegment(pathname: string) {
  for (const page of PRESTACAO_DE_CONTA_PAGES) {
    if (pathname.includes(`/${page.value.value.split("/")[0]}`)) {
      return page.value.value;
    }
  }
  return null;
}
