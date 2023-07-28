"use client";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/Dropdown";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: KeyValue<string, DropdownValue<string>>[] = [
  {
    key: "Planejamento governamental",
    value: createDropdownValue(
      "gestao-orcamentaria/planejamento-governamental"
    ),
  },
  {
    key: "Plano plurianual",
    value: createDropdownValue("gestao-orcamentaria/plano-plurianual"),
  },
];

export default function EstadoMenuGestaoOrcamentariaPaginas() {
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.ano}/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) => `/estado/${routeParams.ano}/${item.value.value}`}
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
