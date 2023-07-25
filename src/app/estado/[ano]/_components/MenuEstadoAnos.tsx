"use client";
import { createDropdownValue } from "@/components/dropdowns/dropdown/Dropdown";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { useAtom } from "jotai";
import { useParams, usePathname } from "next/navigation";
import { estadoState } from "../estado-state";

export default function MenuEstadoAnos() {
  const [state] = useAtom(estadoState);
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.ano}/`)[1];

  return (
    <li>
      <DropdownLinks
        className="min-w-[70px]"
        generateUrl={(item) => `/estado/${item.value.value}/${segments}`}
        items={state.anos.map((ano) => ({
          key: ano.toString(),
          value: createDropdownValue(ano.toString()),
        }))}
        selected={createDropdownValue(routeParams.ano)}
      />
    </li>
  );
}
