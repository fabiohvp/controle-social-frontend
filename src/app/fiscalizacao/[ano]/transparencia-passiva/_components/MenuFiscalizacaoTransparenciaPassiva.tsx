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
  {
    key: "Estado",
    value: "estado",
  },
];

export default function MenuFiscalizacaoTransparenciaPassiva() {
  const routeParams = useParams();
  const segments = usePathname().split(`/`)[4];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          `/fiscalizacao/${routeParams.ano}/portal-transparencia/${item.value}`
        }
        items={PAGES}
        selectedValue={segments}
      />
    </li>
  );
}
