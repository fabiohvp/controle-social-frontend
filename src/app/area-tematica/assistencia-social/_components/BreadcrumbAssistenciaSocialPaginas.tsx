"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { usePathname } from "next/navigation";
import { generateAssistenciaSocialUrl, getPagina } from "../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Capacidade de referenciamento", createDropdownValue("referenciamento")],
  ["Espaço físico e equipamentos", createDropdownValue("espaco-fisico")],
  ["Serviços e atendimento", createDropdownValue("servicos")],
  ["Recursos humano", createDropdownValue("recursos-humano")],
]);

export default function BreadcrumbAssistenciaSocialPaginas() {
  const pathname = usePathname();
  const pagina = getPagina(pathname);

  return (
    <li>
      <DropdownLinks
        bodyProps={{ className: "!min-w-[260px]" }}
        generateUrl={(item) =>
          generateAssistenciaSocialUrl({ pagina: item[1].value })
        }
        items={PAGES}
        selected={createDropdownValue(pagina)}
      />
    </li>
  );
}
