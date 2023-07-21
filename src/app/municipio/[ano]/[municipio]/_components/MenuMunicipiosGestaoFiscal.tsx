"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: KeyValue<string, string>[] = [
  {
    key: "Metas de arrecadação",
    value: "gestao-fiscal/meta-arrecadacao",
  },
  {
    key: "RCL",
    value: "gestao-fiscal/receita-corrente-liquida",
  },
];

export default function MenuMunicipiosGestaoFiscal() {
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.municipio}/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          `/municipio/${routeParams.ano}/${routeParams.municipio}/${item.value}`
        }
        items={PAGES}
        selectedValue={segments}
      />
    </li>
  );
}
