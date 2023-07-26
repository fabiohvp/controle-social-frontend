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
    key: "Municípios",
    value: createDropdownValue("municipios"),
  },
  {
    key: "Estado",
    value: createDropdownValue("estado"),
  },
];

export default function MenuObrigacaoEnvioPages() {
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.ano}/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          `/obrigacao-envio/${routeParams.ano}/${item.value.value}`
        }
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
