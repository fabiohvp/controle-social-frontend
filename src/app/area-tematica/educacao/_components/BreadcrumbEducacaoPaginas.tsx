"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { usePathname } from "next/navigation";
import { generateEducacaoUrl, getPagina } from "../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Visão geral", createDropdownValue("visao-geral")],
  ["Escolas", createDropdownValue("escolas")],
  ["Profissionais", createDropdownValue("profissionais")],
  ["Inativos", createDropdownValue("inativos")],
  ["IDEB", createDropdownValue("ideb")],
  ["Abandono escolar", createDropdownValue("abandono")],
  ["PAEBES", createDropdownValue("paebes")],
  ["Fluência em leitura", createDropdownValue("fluencia")],
]);

export default function BreadcrumbEducacaoPaginas() {
  const pathname = usePathname();
  const pagina = getPagina(pathname);

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) => generateEducacaoUrl({ pagina: item[1].value })}
        items={PAGES}
        selected={createDropdownValue(pagina)}
      />
    </li>
  );
}
