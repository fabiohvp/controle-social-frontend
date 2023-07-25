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
    key: "Despesas com PPP",
    value: createDropdownValue("despesas-ppp"),
  },
];

export default function MenuAreasTematicasConcessaoPublicaPages() {
  const segments = usePathname().split(
    `/areas-tematicas/concessao-publica/`
  )[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          `/areas-tematicas/concessao-publica/${item.value.value}`
        }
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
