"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Municípios", createDropdownValue("municipios")],
  ["Estado", createDropdownValue("estado")],
]);

export default function BreadcrumbObrigacaoEnvioPaginas() {
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.ano}/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={([_, value]) =>
          `/obrigacao-envio/${routeParams.ano}/${value.value}`
        }
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
