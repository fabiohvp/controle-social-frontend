"use client";
import { createDropdownValue } from "@/components/dropdowns/dropdown/Dropdown";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { getMonthNames } from "@/shared/date";
import { useParams, usePathname } from "next/navigation";
import {
  generateFolhaDePagamentoUrl,
  getFolhaDePagamentoSegment,
} from "../folhaDePagamentoState";

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
            mes: item.value.value,
            segment,
          })
        }
        items={meses.map((mes, index) => ({
          key: mes,
          value: createDropdownValue((index + 1).toString()),
        }))}
        selected={createDropdownValue(routeParams.mes)}
      />
    </li>
  );
}
