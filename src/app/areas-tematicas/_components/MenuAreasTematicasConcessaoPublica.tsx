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
    key: "Despesas com PPP",
    value: "despesas-ppp",
  },
];

export default function MenuAreasTematicasConcessaoPublica() {
  const segments = usePathname().split(
    `/areas-tematicas/concessao-publica/`
  )[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          `/areas-tematicas/concessao-publica/${item.value}`
        }
        items={PAGES}
        selectedValue={segments}
      />
    </li>
  );
}
