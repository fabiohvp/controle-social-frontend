"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { useAtom } from "jotai";
import { useParams, usePathname } from "next/navigation";
import { controleInternoState } from "../controle-interno-state";

export default function MenuFiscalizacaoControleInternoAnos() {
  const [state] = useAtom(controleInternoState);
  const routeParams = useParams();
  const segments = usePathname().split(`/controle-interno/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          `/fiscalizacao/${item.value}/controle-interno/${segments}`
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
