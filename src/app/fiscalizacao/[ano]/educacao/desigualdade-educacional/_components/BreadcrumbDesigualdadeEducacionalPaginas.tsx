"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Manifestação técnica", createDropdownValue("manifestacao-tecnica")],
  ["Relatório", createDropdownValue("relatorio")],
]);

export default function BreadcrumbDesigualdadeEducacionalPaginas() {
  const routeParams = useParams();
  const segments = usePathname().split(`/`)[5];

  return (
    <li>
      <DropdownLinks
        generateUrl={([_, value]) =>
          `/fiscalizacao/${routeParams.ano}/educacao/desigualdade-educacional/${value.value}`
        }
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
