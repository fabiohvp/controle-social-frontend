"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { dropdownStartsWithComparer } from "@/components/dropdowns/dropdown/dropdownComparers";
import { useParams, usePathname } from "next/navigation";

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
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.ano}/`)[1];
  const initialSegment = segments.split("/")[0];

  return (
    <li>
      <DropdownLinks
        comparer={dropdownStartsWithComparer}
        generateUrl={([_, value]) =>
          `/estado/${routeParams.ano}/${value.value}`
        }
        items={PAGES}
        selected={createDropdownValue(initialSegment)}
      />
    </li>
  );
}
