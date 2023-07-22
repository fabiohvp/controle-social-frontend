"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: KeyValue<string, string>[] = [
  {
    key: "Câmaras",
    value: "camaras",
  },
  {
    key: "Prefeituras",
    value: "prefeituras",
  },
];

export default function MenuFiscalizacaoControleInterno() {
  const routeParams = useParams();
  const segments = usePathname().split(`/`)[4];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          `/fiscalizacao/${routeParams.ano}/controle-interno/${item.value}`
        }
        items={PAGES}
        selectedValue={segments}
      />
    </li>
  );
}
