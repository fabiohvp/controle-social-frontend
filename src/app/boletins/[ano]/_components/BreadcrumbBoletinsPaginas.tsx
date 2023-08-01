"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Boletim de macrogestão", createDropdownValue("*")],
  ["Boletim extraordinário", createDropdownValue("extraordinario")],
  ["Informativos", createDropdownValue("informativo")],
]);

export default function BreadcrumbBoletinsPaginas() {
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.ano}/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={([_, value]) =>
          `/boletins/${routeParams.ano}/${value.value}`
        }
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
