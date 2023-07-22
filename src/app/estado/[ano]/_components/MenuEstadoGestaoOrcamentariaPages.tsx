"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
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

export default function MenuEstadoGestaoOrcamentariaPages() {
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.ano}/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) => `/municipio/${routeParams.ano}/${item.value}`}
        items={PAGES}
        selectedValue={segments}
      />
    </li>
  );
}
