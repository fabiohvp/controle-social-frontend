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
    key: "Capacidade de referenciamento",
    value: createDropdownValue("referenciamento"),
  },
  {
    key: "Espaço físico e equipamentos",
    value: createDropdownValue("espaco-fisico"),
  },
  {
    key: "Serviços e atendimento",
    value: createDropdownValue("servicos"),
  },
  {
    key: "Recursos humano",
    value: createDropdownValue("recursos-humano"),
  },
];

export default function MenuAreasTematicasAssistenciaSocialPages() {
  const segments = usePathname().split(
    `/areas-tematicas/assistencia-social/`
  )[1];

  return (
    <li>
      <DropdownLinks
        bodyProps={{ className: "!min-w-[260px]" }}
        generateUrl={(item) =>
          `/areas-tematicas/assistencia-social/${item.value.value}`
        }
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
