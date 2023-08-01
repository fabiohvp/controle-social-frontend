"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";
import { generateGestaoFiscalUrl } from "../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Metas de arrecadação", createDropdownValue("meta-arrecadacao")],
  ["RCL", createDropdownValue("receita-corrente-liquida")],
]);

export default function BreadcrumbGestaoFiscalPaginas() {
  const pathname = usePathname();
  const routeParams = useParams() as any;
  const segment = usePathname().split("/")[4];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          generateGestaoFiscalUrl({ ...routeParams, item, pathname })
        }
        items={PAGES}
        selected={createDropdownValue(segment)}
      />
    </li>
  );
}
