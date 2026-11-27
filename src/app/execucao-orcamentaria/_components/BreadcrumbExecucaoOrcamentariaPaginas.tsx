"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { usePathname } from "next/navigation";
import { generateExecucaoOrcamentariaUrl, getPagina } from "../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Receita", createDropdownValue("receita")],
  ["Relatório de Receita", createDropdownValue("relatorio-receita")],
  ["Despesa", createDropdownValue("despesa")],
  ["Relatório de Despesa", createDropdownValue("relatorio-despesa")],
  ["Receita x Despesa", createDropdownValue("receita-despesa")],
]);

export default function BreadcrumbExecucaoOrcamentariaPaginas() {
  const pathname = usePathname();
  const pagina = getPagina(pathname);

  return (
    <li>
      <DropdownLinks
        bodyProps={{ className: "!min-w-[250px]" }}
        generateUrl={(item) =>
          generateExecucaoOrcamentariaUrl({ pagina: item[1].value })
        }
        items={PAGES}
        selected={createDropdownValue(pagina)}
      />
    </li>
  );
}
