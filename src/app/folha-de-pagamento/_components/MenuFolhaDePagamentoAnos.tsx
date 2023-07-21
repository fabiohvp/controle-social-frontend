"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { useAtom } from "jotai";
import { useParams, usePathname } from "next/navigation";
import {
  folhaDePagamentoState,
  generateFolhaDePagamentoUrl,
  getFolhaDePagamentoSegment,
} from "../folha-de-pagamento-state";

export default function MenuFolhaDePagamentoAnos() {
  const [state] = useAtom(folhaDePagamentoState);
  const routeParams = useParams();
  const segment = getFolhaDePagamentoSegment(usePathname())!;

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          generateFolhaDePagamentoUrl({
            ...routeParams,
            ano: item.value,
            segment,
          })
        }
        items={state.anos.map((ano) => ({
          key: ano.toString(),
          value: ano.toString(),
        }))}
        selectedValue={routeParams.ano}
      />
    </li>
  );
}
