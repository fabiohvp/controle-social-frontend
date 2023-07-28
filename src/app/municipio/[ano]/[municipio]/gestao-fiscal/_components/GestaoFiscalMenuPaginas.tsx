"use client";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/Dropdown";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: KeyValue<string, DropdownValue<string>>[] = [
  {
    key: "Metas de arrecadação",
    value: createDropdownValue("gestao-fiscal/meta-arrecadacao"),
  },
  {
    key: "RCL",
    value: createDropdownValue("gestao-fiscal/receita-corrente-liquida"),
  },
];

export default function GestaoFiscalMenuPaginas() {
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.municipio}/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          `/municipio/${routeParams.ano}/${routeParams.municipio}/${item.value.value}`
        }
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
