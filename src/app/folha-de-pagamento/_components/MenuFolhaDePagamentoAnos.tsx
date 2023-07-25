"use client";
import { createDropdownValue } from "@/components/dropdowns/dropdown/Dropdown";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { useAtom } from "jotai";
import { useParams, usePathname } from "next/navigation";
import {
  folhaDePagamentoState,
  generateFolhaDePagamentoUrl,
  getFolhaDePagamentoSegment,
} from "../folhaDePagamentoState";

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
            ano: item.value.value,
            segment,
          })
        }
        items={state.anos.map((ano) => ({
          key: ano.toString(),
          value: createDropdownValue(ano.toString()),
        }))}
        selected={createDropdownValue(routeParams.ano)}
      />
    </li>
  );
}
