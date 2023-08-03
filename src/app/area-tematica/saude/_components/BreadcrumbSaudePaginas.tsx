"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { usePathname } from "next/navigation";
import { generateSaudeUrl, getPagina } from "../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Estabelecimentos de saúde", createDropdownValue("estabelecimentos")],
  [
    "Distribuição de equipamentos",
    createDropdownValue("distribuicao-de-equipamentos"),
  ],
  ["Distribuição de leitos", createDropdownValue("distribuicao-de-leitos")],
  ["Gestão com a função saúde", createDropdownValue("gastos-com-saude")],
  ["População com plano de saúde", createDropdownValue("acesso-a-saude")],
]);

export default function BreadcrumbSaudePaginas() {
  const pathname = usePathname();
  const pagina = getPagina(pathname);

  return (
    <li>
      <DropdownLinks
        bodyProps={{ className: "!min-w-[250px]" }}
        generateUrl={(item) => generateSaudeUrl({ pagina: item[1].value })}
        items={PAGES}
        selected={createDropdownValue(pagina)}
      />
    </li>
  );
}
