"use client";
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
        generateUrl={(item) => `/municipio/${item.value}/${segments}`}
        items={state.anos.map((ano) => ({
          key: ano.toString(),
          value: ano.toString(),
        }))}
        selectedValue={routeParams.ano}
      />
    </li>
  );
}
