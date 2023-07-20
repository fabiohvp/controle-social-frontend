"use client";
import DropdownLinks from "@/components/dropdowns/links/DropdownLinks";
import { useAtom } from "jotai";
import { useParams, usePathname } from "next/navigation";
import { boletinsState } from "../boletins-state";

export default function DropdownLinksBoletinsAnos() {
  const [state] = useAtom(boletinsState);
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.ano}/`)[1];

  return (
    <DropdownLinks
      className="menu-ano sm:!min-w-0"
      generateUrl={(item) => `/boletins/${item.value}/${segments}`}
      items={state.anos.map((ano) => ({
        key: ano.toString(),
        value: ano.toString(),
      }))}
      selectedValue={routeParams.ano}
    />
  );
}
