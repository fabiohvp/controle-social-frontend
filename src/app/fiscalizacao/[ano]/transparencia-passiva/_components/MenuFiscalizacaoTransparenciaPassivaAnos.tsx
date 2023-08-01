"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";

import { createDropdownValue } from "@/components/dropdowns/dropdown/DropdownValue";
import { useAtom } from "jotai";
import { useParams, usePathname } from "next/navigation";
import { transparenciaPassivaState } from "../transparenciaPassivaState";

export default function MenuFiscalizacaoTransparenciaPassivaAnos() {
  const [state] = useAtom(transparenciaPassivaState);
  const routeParams = useParams();
  const segments = usePathname().split(`/transparencia-passiva/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={([_, value]) =>
          `/fiscalizacao/${value.value}/transparencia-passiva/${segments}`
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
