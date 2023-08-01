"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { usePathname } from "next/navigation";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Capacidade de referenciamento", createDropdownValue("referenciamento")],
  ["Espaço físico e equipamentos", createDropdownValue("espaco-fisico")],
  ["Serviços e atendimento", createDropdownValue("servicos")],
  ["Recursos humano", createDropdownValue("recursos-humano")],
]);

export default function BreadcrumbAssistenciaSocialPaginas() {
  const segments = usePathname().split(`/area-tematica/assistencia-social/`)[1];

  return (
    <li>
      <DropdownLinks
        bodyProps={{ className: "!min-w-[260px]" }}
        generateUrl={([_, value]) =>
          `/area-tematica/assistencia-social/${value.value}`
        }
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
