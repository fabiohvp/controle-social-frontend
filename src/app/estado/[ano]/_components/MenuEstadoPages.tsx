"use client";
import {
  createDropdownValue,
  DropdownValue,
} from "@/components/dropdowns/dropdown/Dropdown";
import { dropdownStartsWithComparer } from "@/components/dropdowns/dropdown/dropdownComparers";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: KeyValue<string, DropdownValue<string>>[] = [
  { key: "Visão geral", value: createDropdownValue("visao-geral") },
  {
    key: "Obrigações junto ao TCE-ES",
    value: createDropdownValue("obrigacao-envio"),
  },
  {
    key: "Gestão orçamentária",
    value: createDropdownValue(
      "gestao-orcamentaria/planejamento-governamental"
    ),
  },
  {
    key: "Gestão fiscal",
    value: createDropdownValue("gestao-fiscal/meta-arrecadacao"),
  },
  {
    key: "Prestação de contas",
    value: createDropdownValue("prestacao-conta"),
  },
];

export default function MenuEstado() {
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.ano}/`)[1];
  const initialSegment = segments.split("/")[0];

  return (
    <li>
      <DropdownLinks
        comparer={dropdownStartsWithComparer}
        generateUrl={(item) => `/estado/${routeParams.ano}/${item.value.value}`}
        items={PAGES}
        selected={createDropdownValue(initialSegment)}
      />
    </li>
  );
}
