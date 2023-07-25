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
    key: "Visão geral",
    value: createDropdownValue("visao-geral"),
  },
  {
    key: "Escolas",
    value: createDropdownValue("escolas"),
  },
  {
    key: "Profissionais",
    value: createDropdownValue("profissionais"),
  },
  {
    key: "Inativos",
    value: createDropdownValue("inativos"),
  },
];

export default function MenuAreasTematicasEducacaoPages() {
  const segments = usePathname().split(`/areas-tematicas/educacao/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) => `/areas-tematicas/educacao/${item.value.value}`}
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
