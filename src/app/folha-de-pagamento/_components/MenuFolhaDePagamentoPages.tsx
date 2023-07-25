"use client";
import { createDropdownValue } from "@/components/dropdowns/dropdown/Dropdown";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { dropdownStartsWithComparer } from "@/components/dropdowns/dropdown/dropdown-comparers";
import { useParams, usePathname } from "next/navigation";
import {
  FOLHA_DE_PAGAMENTO_PAGES,
  generateFolhaDePagamentoUrl,
  getFolhaDePagamentoSegment,
} from "../folha-de-pagamento-state";

export default function MenuFolhaDePagamento() {
  const routeParams = useParams();
  const segment = getFolhaDePagamentoSegment(usePathname());

  return (
    <li>
      <DropdownLinks
        comparer={dropdownStartsWithComparer}
        generateUrl={(item) =>
          generateFolhaDePagamentoUrl({
            ...routeParams,
            segment: item.value.value,
          })
        }
        items={FOLHA_DE_PAGAMENTO_PAGES}
        selected={createDropdownValue(segment!)}
      />
    </li>
  );
}
