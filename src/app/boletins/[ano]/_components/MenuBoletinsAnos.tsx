"use client";
import { createDropdownValue } from "@/components/dropdowns/dropdown/Dropdown";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { useAtom } from "jotai";
import { useParams, usePathname } from "next/navigation";
import { boletinsState } from "../boletins-state";

export default function MenuBoletinsAnos() {
  const [state] = useAtom(boletinsState);
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.ano}/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) => `/boletins/${item.value.value}/${segments}`}
        items={state.anos.map((ano) => ({
          key: ano.toString(),
          value: createDropdownValue(ano.toString()),
        }))}
        selected={createDropdownValue(routeParams.ano)}
      />
    </li>
  );
}
