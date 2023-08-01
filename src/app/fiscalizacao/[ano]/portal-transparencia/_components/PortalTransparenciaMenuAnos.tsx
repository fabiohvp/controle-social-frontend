"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";

import { createDropdownValue } from "@/components/dropdowns/dropdown/DropdownValue";
import { useAtom } from "jotai";
import { useParams, usePathname } from "next/navigation";
import { portalTransparenciaState } from "../portalTransparenciaState";

export default function PortalTransparenciaMenuAnos() {
  const [state] = useAtom(portalTransparenciaState);
  const routeParams = useParams();
  const segments = usePathname().split(`/portal-transparencia/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={([_, value]) =>
          `/fiscalizacao/${value.value}/portal-transparencia/${segments}`
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
