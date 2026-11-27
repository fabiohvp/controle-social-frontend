"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { usePathname } from "next/navigation";
import { generatePrevidenciaUrl, getPagina } from "../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Visão geral", createDropdownValue("visao-geral")],
  [
    "Distribuição de investimentos",
    createDropdownValue("distribuicao-investimentos"),
  ],
  ["Enquadramento", createDropdownValue("enquadramento")],
  ["Desenquadramento", createDropdownValue("desenquadramento")],
  ["Aplicação em fundos", createDropdownValue("aplicacao-fundos")],
  ["Cumprimento de prazos DAIR", createDropdownValue("cumprimento-prazos-dair")],
  ["Adesão Pró-Gestão", createDropdownValue("adesao-progestao")],
  ["Reuniões de comitê", createDropdownValue("reunioes-comite")],
]);

export default function BreadcrumbPrevidenciaPaginas() {
  const pathname = usePathname();
  const pagina = getPagina(pathname);

  return (
    <li>
      <DropdownLinks
        bodyProps={{ className: "!min-w-[250px]" }}
        generateUrl={(item) => generatePrevidenciaUrl({ pagina: item[1].value })}
        items={PAGES}
        selected={createDropdownValue(pagina)}
      />
    </li>
  );
}
