"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: KeyValue<string, string>[] = [
  {
    key: "Ações sobre a pandemia",
    value: "acoes-pandemia",
  },
  {
    key: "Câncer de colo de útero",
    value: "cancer-colo-de-utero",
  },
  {
    key: "Doenças crônicas não transmissíveis",
    value: "doencas-cronicas-nao-transmissiveis",
  },
];

export default function MenuFiscalizacaoSaudePages() {
  const routeParams = useParams();
  const segments = usePathname().split(`/`)[4];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          `/fiscalizacao/${routeParams.ano}/saude/${item.value}`
        }
        items={PAGES}
        selectedValue={segments}
      />
    </li>
  );
}
