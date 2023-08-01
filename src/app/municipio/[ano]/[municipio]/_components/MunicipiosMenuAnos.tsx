"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";

import { createDropdownValue } from "@/components/dropdowns/dropdown/DropdownValue";
import { useAtom } from "jotai";
import { useParams, usePathname } from "next/navigation";
import { municipioState } from "../municipioState";

export default function MunicipiosMenuAnos() {
  const [state] = useAtom(municipioState);
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.municipio}/`)[1];

  return (
    <li>
      <DropdownLinks
        className="min-w-[70px]"
        generateUrl={([_, value]) =>
          `/municipio/${value.value}/${routeParams.municipio}/${segments}`
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
