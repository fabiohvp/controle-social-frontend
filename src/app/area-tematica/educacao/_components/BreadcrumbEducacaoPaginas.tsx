"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { usePathname } from "next/navigation";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Visão geral", createDropdownValue("visao-geral")],
  ["Escolas", createDropdownValue("escolas")],
  ["Profissionais", createDropdownValue("profissionais")],
  ["Inativos", createDropdownValue("inativos")],
]);

export default function BreadcrumbEducacaoPaginas() {
  const segments = usePathname().split(`/area-tematica/educacao/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={([_, value]) => `/area-tematica/educacao/${value.value}`}
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
