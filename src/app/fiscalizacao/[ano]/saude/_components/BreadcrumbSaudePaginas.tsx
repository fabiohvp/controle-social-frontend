"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Ações sobre a pandemia", createDropdownValue("acoes-pandemia")],
  ["Câncer de colo de útero", createDropdownValue("cancer-colo-de-utero")],
  [
    "Doenças crônicas não transmissíveis",
    createDropdownValue("doencas-cronicas-nao-transmissiveis"),
  ],
]);

export default function BreadcrumbSaudePaginas() {
  const routeParams = useParams();
  const segments = usePathname().split(`/`)[4];

  return (
    <li>
      <DropdownLinks
        generateUrl={([_, value]) =>
          `/fiscalizacao/${routeParams.ano}/saude/${value.value}`
        }
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
