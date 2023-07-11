"use client";
import DropdownLinks from "@/components/dropdowns/links/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: KeyValue<string, string>[] = [
  {
    key: "Planejamento governamental",
    value: "gestao-orcamentaria/planejamento-governamental",
  },
  {
    key: "Plano plurianual",
    value: "gestao-orcamentaria/plano-plurianual",
  },
];

export default function DropdownLinksGestaoOrcamentaria() {
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.municipio}/`)[1];

  return (
    <DropdownLinks
      generateUrl={(item) =>
        `/municipio/${routeParams.ano}/${routeParams.municipio}/${item.value}`
      }
      items={PAGES}
      selectedValue={segments}
    />
  );
}
