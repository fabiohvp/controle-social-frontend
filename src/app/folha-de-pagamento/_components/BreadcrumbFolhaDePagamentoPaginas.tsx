"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { createDropdownValue } from "@/components/dropdowns/dropdown/DropdownValue";
import { dropdownStartsWithComparer } from "@/components/dropdowns/dropdown/dropdownComparers";
import { useParams, usePathname } from "next/navigation";
import {
  FOLHA_DE_PAGAMENTO_PAGES,
  generateFolhaDePagamentoUrl,
  getFolhaDePagamentoSegment,
} from "../folhaDePagamentoState";

export default function BreadcrumbFolhaDePagamentoPaginas() {
  const routeParams = useParams();
  const segment = getFolhaDePagamentoSegment(usePathname());

  return (
    <li>
      <DropdownLinks
        comparer={dropdownStartsWithComparer}
        generateUrl={([_, value]) =>
          generateFolhaDePagamentoUrl({
            ...routeParams,
            segment: value.value,
          })
        }
        items={FOLHA_DE_PAGAMENTO_PAGES}
        selected={createDropdownValue(segment!)}
      />
    </li>
  );
}
