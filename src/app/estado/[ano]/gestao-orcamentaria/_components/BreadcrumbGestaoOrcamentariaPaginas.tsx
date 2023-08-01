"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  [
    "Planejamento governamental",
    createDropdownValue("gestao-orcamentaria/planejamento-governamental"),
  ],
  [
    "Plano plurianual",
    createDropdownValue("gestao-orcamentaria/plano-plurianual"),
  ],
]);

export default function BreadcrumbGestaoOrcamentariaPaginas() {
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
