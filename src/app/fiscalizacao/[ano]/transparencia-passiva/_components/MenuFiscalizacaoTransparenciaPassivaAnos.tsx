"use client";
import { createDropdownValue } from "@/components/dropdowns/dropdown/Dropdown";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
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
        generateUrl={(item) =>
          `/fiscalizacao/${item.value.value}/transparencia-passiva/${segments}`
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
