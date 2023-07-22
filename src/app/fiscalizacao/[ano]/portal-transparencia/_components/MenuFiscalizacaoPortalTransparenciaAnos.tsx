"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { useAtom } from "jotai";
import { useParams, usePathname } from "next/navigation";
import { portalTransparenciaState } from "../portal-transparencia-state";

export default function MenuFiscalizacaoPortalTransparenciaAnos() {
  const [state] = useAtom(portalTransparenciaState);
  const routeParams = useParams();
  const segments = usePathname().split(`/portal-transparencia/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          `/fiscalizacao/${item.value}/portal-transparencia/${segments}`
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