"use client";
import { dropdownStartsWithComparer } from "@/components/dropdowns/dropdown-comparers";
import DropdownLinks from "@/components/dropdowns/links/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { usePathname } from "next/navigation";

const PAGES: KeyValue<string, string>[] = [
  {
    key: "Assistência social",
    value: "assistencia-social/referenciamento",
  },
  {
    key: "Concessões e PPP",
    value: "concessao-publica/visao-geral",
  },
  {
    key: "Educação",
    value: "educacao/visao-geral",
  },
  {
    key: "Estrutura administrativa",
    value: "estrutura-administrativa/visao-geral",
  },
  {
    key: "Pessoal",
    value: "pessoal/visao-geral",
  },
  {
    key: "Saúde",
    value: "saude/visao-geral",
  },
];

export default function DropdownLinksAreasTematicas() {
  const initialSegment = usePathname()
    .split(`/areas-tematicas/`)[1]
    .split("/")[0];

  return (
    <DropdownLinks
      comparer={dropdownStartsWithComparer}
      generateUrl={(item) => `/areas-tematicas/${item.value}`}
      items={PAGES}
      selectedValue={initialSegment}
    />
  );
}
