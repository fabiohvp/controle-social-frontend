"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { getMonthNames } from "@/shared/date";
import { useParams, usePathname } from "next/navigation";
import {
  generateFolhaDePagamentoUrl,
  getFolhaDePagamentoSegment,
} from "../folha-de-pagamento-state";

const meses = getMonthNames({ format: "long" });

export default function MenuFolhaDePagamentoMeses() {
  const routeParams = useParams();
  const segment = getFolhaDePagamentoSegment(usePathname())!;

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          generateFolhaDePagamentoUrl({
            ...routeParams,
            mes: item.value,
            segment,
          })
        }
        items={meses.map((mes, index) => ({
          key: mes,
          value: (index + 1).toString(),
        }))}
        selectedValue={routeParams.mes}
      />
    </li>
  );
}
