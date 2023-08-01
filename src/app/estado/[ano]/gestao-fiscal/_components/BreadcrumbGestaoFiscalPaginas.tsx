"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  [
    "Metas de arrecadação",
    createDropdownValue("gestao-fiscal/meta-arrecadacao"),
  ],
  ["RCL", createDropdownValue("gestao-fiscal/receita-corrente-liquida")],
]);

export default function BreadcrumbGestaoFiscalPaginas() {
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.ano}/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={([_, value]) =>
          `/estado/${routeParams.ano}/${value.value}`
        }
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
