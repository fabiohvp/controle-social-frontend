"use client";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/Dropdown";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { dropdownStartsWithComparer } from "@/components/dropdowns/dropdown/dropdownComparers";
import { KeyValue } from "@/types/KeyValue";
import { usePathname } from "next/navigation";

const PAGES: KeyValue<string, DropdownValue<string>>[] = [
  {
    key: "Assistência social",
    value: createDropdownValue(
      "/areas-tematicas/assistencia-social/referenciamento"
    ),
  },
  {
    key: "Concessões e PPP",
    value: createDropdownValue(
      "/areas-tematicas/concessao-publica/visao-geral"
    ),
  },
  {
    key: "Educação",
    value: createDropdownValue("/areas-tematicas/educacao/visao-geral"),
  },
  {
    key: "Estrutura administrativa",
    value: createDropdownValue("/areas-tematicas/estrutura-administrativa"),
  },
  {
    key: "Pessoal",
    value: createDropdownValue(
      "/folha-de-pagamento/executivo-municipal/2023/1/visao-geral"
    ),
  },
  {
    key: "Saúde",
    value: createDropdownValue("/areas-tematicas/saude/estabelecimentos"),
  },
];

export default function MenuAreasTematicasPages() {
  const segment = usePathname().split(`/areas-tematicas/`)[1].split("/")[0];

  return (
    <li>
      <DropdownLinks
        comparer={dropdownStartsWithComparer}
        generateUrl={(item) => item.value.value}
        items={PAGES}
        selected={createDropdownValue(`/areas-tematicas/${segment}`)}
      />
    </li>
  );
}
