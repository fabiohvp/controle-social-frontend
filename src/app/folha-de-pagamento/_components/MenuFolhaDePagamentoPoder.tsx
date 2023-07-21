"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { dropdownStartsWithComparer } from "@/components/dropdowns/dropdown/dropdown-comparers";
import { KeyValue } from "@/types/KeyValue";
import { useParams, usePathname } from "next/navigation";
import {
  generateFolhaDePagamentoUrl,
  getFolhaDePagamentoSegment,
} from "../folha-de-pagamento-state";

const PODERES: KeyValue<string, string>[] = [
  {
    key: "Todos",
    value: "todos",
  },
  {
    key: "Poder executivo estadual",
    value: "executivo-estadual",
  },
  {
    key: "Poder judiciário estadual",
    value: "judiciario-estadual",
  },
  {
    key: "Assembléia legislativa",
    value: "assembleia-legislativa",
  },
  {
    key: "Defensoria pública",
    value: "defensoria-publica",
  },
  {
    key: "Ministério público",
    value: "ministerio-publico",
  },
  {
    key: "Tribunal de contas",
    value: "tribunal-de-contas",
  },
  {
    key: "Poder executivo municipal",
    value: "executivo-municipal",
  },
  {
    key: "Poder legislativo municipal",
    value: "legislativo-municipal",
  },
  {
    key: "Municípios",
    value: "municipios",
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
            poder: item.value,
            segment,
            unidadeGestora: "todos",
          })
        }
        items={PODERES}
        selectedValue={routeParams.poder}
      />
    </li>
  );
}
