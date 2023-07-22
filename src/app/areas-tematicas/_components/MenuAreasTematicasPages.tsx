"use client";
import { dropdownStartsWithComparer } from "@/components/dropdowns/dropdown/dropdown-comparers";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { usePathname } from "next/navigation";

const PAGES: KeyValue<string, string>[] = [
  {
    key: "Assistência social",
    value: "/areas-tematicas/assistencia-social/referenciamento",
  },
  {
    key: "Concessões e PPP",
    value: "/areas-tematicas/concessao-publica/visao-geral",
  },
  {
    key: "Educação",
    value: "/areas-tematicas/educacao/visao-geral",
  },
  {
    key: "Estrutura administrativa",
    value: "/areas-tematicas/estrutura-administrativa",
  },
  {
    key: "Pessoal",
    value: "/folha-de-pagamento/executivo-municipal/2023/1/visao-geral",
  },
  {
    key: "Saúde",
    value: "/areas-tematicas/saude/estabelecimentos",
  },
];

export default function MenuAreasTematicasPages() {
  const segment = usePathname().split(`/areas-tematicas/`)[1].split("/")[0];

  return (
    <li>
      <DropdownLinks
        comparer={dropdownStartsWithComparer}
        generateUrl={(item) => item.value}
        items={PAGES}
        selectedValue={`/areas-tematicas/${segment}`}
      />
    </li>
  );
}
