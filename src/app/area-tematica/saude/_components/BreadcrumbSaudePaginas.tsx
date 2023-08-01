"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { usePathname } from "next/navigation";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Estabelecimentos de saúde", createDropdownValue("estabelecimentos")],
  [
    "Distribuição de equipamentos",
    createDropdownValue("distribuicao-de-equipamentos"),
  ],
  ["Distribuição de leitos", createDropdownValue("distribuicao-de-leitos")],
  ["Gestão com a função saúde", createDropdownValue("gastos-com-saude")],
  ["População com plano de saúde", createDropdownValue("acesso-a-saude")],
]);

export default function BreadcrumbSaudePaginas() {
  const segments = usePathname().split(`/`)[3];

  return (
    <li>
      <DropdownLinks
        bodyProps={{ className: "!min-w-[250px]" }}
        generateUrl={([_, value]) => `/area-tematica/saude/${value.value}`}
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
