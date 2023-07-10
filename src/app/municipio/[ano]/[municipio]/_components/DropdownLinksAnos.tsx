"use client";
import DropdownLinks from "@/components/dropdowns/links/DropdownLinks";
import { useAtom } from "jotai";
import { useParams, usePathname } from "next/navigation";
import { municipioState } from "../municipio-state";

export default function DropdownLinksAnos() {
  const [state] = useAtom(municipioState);
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.municipio}/`)[1];

  return (
    <DropdownLinks
      generateUrl={(item) =>
        `/municipio/${item.value}/${routeParams.municipio}/${segments}`
      }
      items={state.anos.map((ano) => ({
        key: ano.toString(),
        value: ano.toString(),
      }))}
      selectedValue={routeParams.ano}
    />
  );
}
