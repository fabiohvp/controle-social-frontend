"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { createDropdownValue } from "@/components/dropdowns/dropdown/DropdownValue";
import { useAtom } from "jotai";
import { useParams, usePathname } from "next/navigation";
import { obrigacaoEnvioState } from "../obrigacaoEnvioState";

export default function MenuObrigacaoEnvioMenuAnos() {
  const [state] = useAtom(obrigacaoEnvioState);
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.ano}/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={([_, value]) =>
          `/obrigacao-envio/${value.value}/${segments}`
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
