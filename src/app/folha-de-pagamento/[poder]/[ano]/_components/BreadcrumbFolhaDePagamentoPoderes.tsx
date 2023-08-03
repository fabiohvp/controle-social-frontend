"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { dropdownStartsWithComparer } from "@/components/dropdowns/dropdown/dropdownComparers";
import { useParams, usePathname } from "next/navigation";
import {
  FolhaDePagamentoPageProps,
  generateFolhaDePagamentoUrl,
} from "../../../routes";

const PODERES: Map<string, DropdownValue<string>> = new Map([
  ["Todos", createDropdownValue("todos")],
  ["Poder executivo estadual", createDropdownValue("executivo-estadual")],
  ["Poder judiciário estadual", createDropdownValue("judiciario-estadual")],
  ["Assembléia legislativa", createDropdownValue("assembleia-legislativa")],
  ["Defensoria pública", createDropdownValue("defensoria-publica")],
  ["Ministério público", createDropdownValue("ministerio-publico")],
  ["Tribunal de contas", createDropdownValue("tribunal-de-contas")],
  ["Poder executivo municipal", createDropdownValue("executivo-municipal")],
  ["Poder legislativo municipal", createDropdownValue("legislativo-municipal")],
  ["Municípios", createDropdownValue("municipios")],
]);

export default function BreadcrumbFolhaDePagamentoPoderes() {
  const routeParams = useParams() as FolhaDePagamentoPageProps;
  const pathname = usePathname();

  return (
    <li>
      <DropdownLinks
        comparer={dropdownStartsWithComparer}
        generateUrl={(item) =>
          generateFolhaDePagamentoUrl({
            ...routeParams,
            pathname,
            poder: item[1].value,
            unidadeGestora: "todos",
          })
        }
        items={PODERES}
        selected={createDropdownValue(routeParams.poder)}
      />
    </li>
  );
}
