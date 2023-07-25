"use client";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/Dropdown";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { dropdownStartsWithComparer } from "@/components/dropdowns/dropdown/dropdownComparers";
import { KeyValue } from "@/types/KeyValue";
import { useParams, usePathname } from "next/navigation";
import {
  generateFolhaDePagamentoUrl,
  getFolhaDePagamentoSegment,
} from "../folhaDePagamentoState";

const PODERES: KeyValue<string, DropdownValue<string>>[] = [
  {
    key: "Todos",
    value: createDropdownValue("todos"),
  },
  {
    key: "Poder executivo estadual",
    value: createDropdownValue("executivo-estadual"),
  },
  {
    key: "Poder judiciário estadual",
    value: createDropdownValue("judiciario-estadual"),
  },
  {
    key: "Assembléia legislativa",
    value: createDropdownValue("assembleia-legislativa"),
  },
  {
    key: "Defensoria pública",
    value: createDropdownValue("defensoria-publica"),
  },
  {
    key: "Ministério público",
    value: createDropdownValue("ministerio-publico"),
  },
  {
    key: "Tribunal de contas",
    value: createDropdownValue("tribunal-de-contas"),
  },
  {
    key: "Poder executivo municipal",
    value: createDropdownValue("executivo-municipal"),
  },
  {
    key: "Poder legislativo municipal",
    value: createDropdownValue("legislativo-municipal"),
  },
  {
    key: "Municípios",
    value: createDropdownValue("municipios"),
  },
];

export default function MenuFolhaDePagamentoPoder() {
  const routeParams = useParams();
  const segment = getFolhaDePagamentoSegment(usePathname())!;

  return (
    <li>
      <DropdownLinks
        comparer={dropdownStartsWithComparer}
        generateUrl={(item) =>
          generateFolhaDePagamentoUrl({
            ...routeParams,
            poder: item.value.value,
            segment,
            unidadeGestora: "todos",
          })
        }
        items={PODERES}
        selected={createDropdownValue(routeParams.poder)}
      />
    </li>
  );
}
