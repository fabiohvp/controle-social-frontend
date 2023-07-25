"use client";
import { createDropdownValue } from "@/components/dropdowns/dropdown/Dropdown";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { useAtom } from "jotai";
import { useParams, usePathname } from "next/navigation";
import { controleInternoState } from "../controleInternoState";

export default function MenuFiscalizacaoControleInternoAnos() {
  const [state] = useAtom(controleInternoState);
  const routeParams = useParams();
  const segments = usePathname().split(`/controle-interno/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          `/fiscalizacao/${item.value.value}/controle-interno/${segments}`
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
