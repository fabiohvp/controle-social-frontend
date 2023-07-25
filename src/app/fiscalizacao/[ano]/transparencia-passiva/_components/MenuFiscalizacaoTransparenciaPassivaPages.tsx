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
    key: "Câmaras",
    value: createDropdownValue("camaras"),
  },
  {
    key: "Prefeituras",
    value: createDropdownValue("prefeituras"),
  },
  {
    key: "Estado",
    value: createDropdownValue("estado"),
  },
];

export default function MenuFiscalizacaoTransparenciaPassivaPages() {
  const routeParams = useParams();
  const segments = usePathname().split(`/`)[4];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          `/fiscalizacao/${routeParams.ano}/portal-transparencia/${item.value.value}`
        }
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
