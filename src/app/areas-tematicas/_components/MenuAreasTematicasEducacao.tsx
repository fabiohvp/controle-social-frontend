"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { usePathname } from "next/navigation";

const PAGES: KeyValue<string, string>[] = [
  {
    key: "Visão geral",
    value: "visao-geral",
  },
  {
    key: "Escolas",
    value: "escolas",
  },
  {
    key: "Profissionais",
    value: "profissionais",
  },
  {
    key: "Inativos",
    value: "inativos",
  },
];

export default function MenuAreasTematicasEducacao() {
  const segments = usePathname().split(`/areas-tematicas/educacao/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) => `/areas-tematicas/educacao/${item.value}`}
        items={PAGES}
        selectedValue={segments}
      />
    </li>
  );
}
