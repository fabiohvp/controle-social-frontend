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
    key: "Manifestação técnica",
    value: createDropdownValue("manifestacao-tecnica"),
  },
  {
    key: "Relatório",
    value: createDropdownValue("relatorio"),
  },
];

export default function MenuFiscalizacaoDesigualdadeEducacionalPages() {
  const routeParams = useParams();
  const segments = usePathname().split(`/`)[5];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          `/fiscalizacao/${routeParams.ano}/educacao/desigualdade-educacional/${item.value.value}`
        }
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
