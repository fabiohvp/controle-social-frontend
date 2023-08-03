"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";
import {
  GestaoFiscalPageProps,
  generateGestaoFiscalUrl,
  getSegment,
} from "../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Metas de arrecadação", createDropdownValue("meta-arrecadacao")],
  ["RCL", createDropdownValue("receita-corrente-liquida")],
]);

export default function BreadcrumbGestaoFiscalPaginas() {
  const pathname = usePathname();
  const routeParams = useParams() as GestaoFiscalPageProps;
  const segment = getSegment(pathname);

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          generateGestaoFiscalUrl({
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
