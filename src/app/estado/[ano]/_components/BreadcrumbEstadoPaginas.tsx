"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { dropdownStartsWithComparer } from "@/components/dropdowns/dropdown/dropdownComparers";
import { useParams, usePathname } from "next/navigation";
import { EstadoPageProps, generateEstadoUrl, getPagina } from "../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Visão geral", createDropdownValue("visao-geral")],
  ["Obrigações junto ao TCE-ES", createDropdownValue("obrigacao-envio")],
  [
    "Gestão orçamentária",
    createDropdownValue("gestao-orcamentaria/planejamento-governamental"),
  ],
  ["Gestão fiscal", createDropdownValue("gestao-fiscal/meta-arrecadacao")],
  ["Prestação de contas", createDropdownValue("prestacao-conta")],
]);

export default function BreadcrumbEstadoPaginas() {
  const pathname = usePathname();
  const routeParams = useParams() as EstadoPageProps;
  const pagina = getPagina(pathname);

  return (
    <li>
      <DropdownLinks
        comparer={dropdownStartsWithComparer}
        generateUrl={(item) =>
          generateEstadoUrl({
            ...routeParams,
            pagina: item[1].value,
            pathname,
          })
        }
        items={PAGES}
        selected={createDropdownValue(pagina)}
      />
    </li>
  );
}
