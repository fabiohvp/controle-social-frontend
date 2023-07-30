"use client";
import { createDropdownValue } from "@/components/dropdowns/dropdown/Dropdown";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { dropdownStartsWithComparer } from "@/components/dropdowns/dropdown/dropdownComparers";
import { useParams, usePathname } from "next/navigation";
import {
  PRESTACAO_DE_CONTA_PAGES,
  generatePrestacaoDeContaUrl,
  getPrestacaoDeContaSegment,
} from "../../../prestacaoDeContaState";

export default function PrestacaoDeContaMenuPaginas() {
  const routeParams = useParams();
  const initialSegment = getPrestacaoDeContaSegment(usePathname())!;

  return (
    <li>
      <DropdownLinks
        comparer={dropdownStartsWithComparer}
        generateUrl={(item) =>
          generatePrestacaoDeContaUrl({
            ...routeParams,
            tipoUnidadeGestora: item.value.value,
          })
        }
        items={PRESTACAO_DE_CONTA_PAGES}
        selected={createDropdownValue(initialSegment)}
      />
    </li>
  );
}
