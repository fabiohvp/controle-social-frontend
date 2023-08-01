"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Câmaras", createDropdownValue("camaras")],
  ["Prefeituras", createDropdownValue("prefeituras")],
]);

export default function BreadcrumbControleInternoPaginas() {
  const routeParams = useParams();
  const segments = usePathname().split(`/`)[4];

  return (
    <li>
      <DropdownLinks
        generateUrl={([_, value]) =>
          `/fiscalizacao/${routeParams.ano}/controle-interno/${value.value}`
        }
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
