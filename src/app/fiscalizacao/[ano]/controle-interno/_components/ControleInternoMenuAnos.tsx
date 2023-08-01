"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";

import { createDropdownValue } from "@/components/dropdowns/dropdown/DropdownValue";
import { useAtom } from "jotai";
import { useParams, usePathname } from "next/navigation";
import { controleInternoState } from "../controleInternoState";

export default function ControleInternoMenuAnos() {
  const [state] = useAtom(controleInternoState);
  const routeParams = useParams();
  const segments = usePathname().split(`/controle-interno/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={([_, value]) =>
          `/fiscalizacao/${value.value}/controle-interno/${segments}`
        }
        items={
          new Map(
            state.anos.map((ano) => [
              ano.toString(),
              createDropdownValue(ano.toString()),
            ])
          )
        }
        selected={createDropdownValue(routeParams.ano)}
      />
    </li>
  );
}
