"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { dropdownStartsWithComparer } from "@/components/dropdowns/dropdown/dropdown-comparers";
import { useParams, usePathname } from "next/navigation";
import { FOLHA_DE_PAGAMENTO_PAGES } from "../folha-de-pagamento-constants";
import {
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
          generateFolhaDePagamentoUrl({ ...routeParams, segment: item.value })
        }
        items={FOLHA_DE_PAGAMENTO_PAGES}
        selectedValue={segment!}
      />
    </li>
  );
}
