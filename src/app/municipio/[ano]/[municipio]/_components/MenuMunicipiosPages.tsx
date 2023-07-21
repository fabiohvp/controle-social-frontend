"use client";
import { dropdownStartsWithComparer } from "@/components/dropdowns/dropdown/dropdown-comparers";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: KeyValue<string, string>[] = [
  { key: "Visão geral", value: "visao-geral" },
  { key: "Obrigações junto ao TCE-ES", value: "obrigacao-envio" },
  {
    key: "Gestão orçamentária",
    value: "gestao-orcamentaria/planejamento-governamental",
  },
  {
    key: "Gestão fiscal",
    value: "gestao-fiscal/meta-arrecadacao",
  },
  {
    key: "Prestação de contas",
    value: "prestacao-conta",
  },
];

export default function MenuMunicipiosPages() {
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.municipio}/`)[1];
  const initialSegment = segments.split("/")[0];

  return (
    <li>
      <DropdownLinks
        comparer={dropdownStartsWithComparer}
        generateUrl={(item) =>
          `/municipio/${routeParams.ano}/${routeParams.municipio}/${item.value}`
        }
        items={PAGES}
        selectedValue={initialSegment}
      />
    </li>
  );
}
