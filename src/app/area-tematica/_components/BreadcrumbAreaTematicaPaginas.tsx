"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { dropdownStartsWithComparer } from "@/components/dropdowns/dropdown/dropdownComparers";
import { usePathname } from "next/navigation";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  [
    "Assistência social",
    createDropdownValue("/area-tematica/assistencia-social/referenciamento"),
  ],
  [
    "Concessões e PPP",
    createDropdownValue("/area-tematica/concessao-publica/visao-geral"),
  ],
  ["Educação", createDropdownValue("/area-tematica/educacao/visao-geral")],
  [
    "Estrutura administrativa",
    createDropdownValue("/area-tematica/estrutura-administrativa"),
  ],
  [
    "Pessoal",
    createDropdownValue(
      "/folha-de-pagamento/executivo-municipal/2023/1/visao-geral"
    ),
  ],
  ["Saúde", createDropdownValue("/area-tematica/saude/estabelecimentos")],
]);

export default function BreadcrumbAreaTematicaPaginas() {
  const area = usePathname().split("/")[2].split("/")[0];

  return (
    <li>
      <DropdownLinks
        comparer={dropdownStartsWithComparer}
        generateUrl={([_, value]) => value.value}
        items={PAGES}
        selected={createDropdownValue(`/area-tematica/${area}`)}
      />
    </li>
  );
}
