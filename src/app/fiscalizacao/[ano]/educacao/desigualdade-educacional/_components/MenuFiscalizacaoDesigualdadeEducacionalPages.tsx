"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: KeyValue<string, string>[] = [
  {
    key: "Manifestação técnica",
    value: "manifestacao-tecnica",
  },
  {
    key: "Relatório",
    value: "relatorio",
  },
];

export default function MenuFiscalizacaoDesigualdadeEducacionalPages() {
  const routeParams = useParams();
  const segments = usePathname().split(`/`)[5];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          `/fiscalizacao/${routeParams.ano}/educacao/desigualdade-educacional/${item.value}`
        }
        items={PAGES}
        selectedValue={segments}
      />
    </li>
  );
}
