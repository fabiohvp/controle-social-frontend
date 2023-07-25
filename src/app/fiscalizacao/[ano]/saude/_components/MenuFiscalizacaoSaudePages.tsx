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
    key: "Ações sobre a pandemia",
    value: createDropdownValue("acoes-pandemia"),
  },
  {
    key: "Câncer de colo de útero",
    value: createDropdownValue("cancer-colo-de-utero"),
  },
  {
    key: "Doenças crônicas não transmissíveis",
    value: createDropdownValue("doencas-cronicas-nao-transmissiveis"),
  },
];

export default function MenuFiscalizacaoSaudePages() {
  const routeParams = useParams();
  const segments = usePathname().split(`/`)[4];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          `/fiscalizacao/${routeParams.ano}/saude/${item.value.value}`
        }
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
