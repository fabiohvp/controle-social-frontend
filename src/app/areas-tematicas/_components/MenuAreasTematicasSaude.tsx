"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { usePathname } from "next/navigation";

const PAGES: KeyValue<string, string>[] = [
  {
    key: "Estabelecimentos de saúde",
    value: "estabelecimentos",
  },
  {
    key: "Distribuição de equipamentos",
    value: "distribuicao-de-equipamentos",
  },
  {
    key: "Distribuição de leitos",
    value: "distribuicao-de-leitos",
  },
  {
    key: "Gestão com a função saúde",
    value: "gastos-com-saude",
  },
  {
    key: "População com plano de saúde",
    value: "acesso-a-saude",
  },
];

export default function MenuAreasTematicasSaude() {
  const segments = usePathname().split(`/`)[3];

  return (
    <li>
      <DropdownLinks
        bodyClassName="!min-w-[250px]"
        generateUrl={(item) => `/areas-tematicas/saude/${item.value}`}
        items={PAGES}
        selectedValue={segments}
      />
    </li>
  );
}
