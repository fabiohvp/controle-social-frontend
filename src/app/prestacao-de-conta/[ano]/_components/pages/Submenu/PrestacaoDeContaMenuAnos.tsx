"use client";
import { createDropdownValue } from "@/components/dropdowns/dropdown/Dropdown";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { useAtom } from "jotai";
import { useParams, usePathname } from "next/navigation";
import {
  generatePrestacaoDeContaUrl,
  prestacaoDeContaState,
} from "../../../prestacaoDeContaState";

export default function PrestacaoDeContaMenuAnos() {
  const [state] = useAtom(prestacaoDeContaState);
  const routeParams = useParams();
  const segment = usePathname().split(`/`)[4];
  const unidadeGestora = usePathname().split(`/`)[3];

  return (
    <li>
      <DropdownLinks
        className="min-w-[70px]"
        generateUrl={(item) =>
          generatePrestacaoDeContaUrl({
            ...routeParams,
            ano: item.value.value,
            unidadeGestora,
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
