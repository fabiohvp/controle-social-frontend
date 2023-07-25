"use client";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/Dropdown";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { usePathname } from "next/navigation";

const PAGES: KeyValue<string, DropdownValue<string>>[] = [
  {
    key: "Estabelecimentos de saúde",
    value: createDropdownValue("estabelecimentos"),
  },
  {
    key: "Distribuição de equipamentos",
    value: createDropdownValue("distribuicao-de-equipamentos"),
  },
  {
    key: "Distribuição de leitos",
    value: createDropdownValue("distribuicao-de-leitos"),
  },
  {
    key: "Gestão com a função saúde",
    value: createDropdownValue("gastos-com-saude"),
  },
  {
    key: "População com plano de saúde",
    value: createDropdownValue("acesso-a-saude"),
  },
];

export default function MenuAreasTematicasSaudePages() {
  const segments = usePathname().split(`/`)[3];

  return (
    <li>
      <DropdownLinks
        bodyProps={{ className: "!min-w-[250px]" }}
        generateUrl={(item) => `/areas-tematicas/saude/${item.value.value}`}
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
