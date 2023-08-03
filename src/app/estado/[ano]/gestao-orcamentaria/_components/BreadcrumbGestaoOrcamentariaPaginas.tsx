"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";
import {
  GestaoOrcamentariaPageProps,
  generateGestaoOrcamentariaUrl,
  getSegment,
} from "../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  [
    "Planejamento governamental",
    createDropdownValue("planejamento-governamental"),
  ],
  ["Plano plurianual", createDropdownValue("plano-plurianual")],
]);

export default function BreadcrumbGestaoOrcamentariaPaginas() {
  const pathname = usePathname();
  const routeParams = useParams() as GestaoOrcamentariaPageProps;
  const segment = getSegment(pathname);

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          generateGestaoOrcamentariaUrl({
            ...routeParams,
            segment: item[1].value,
            pathname,
          })
        }
        items={PAGES}
        selected={createDropdownValue(segment)}
      />
    </li>
  );
}
