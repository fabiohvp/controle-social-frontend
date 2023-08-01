"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";

import { createDropdownValue } from "@/components/dropdowns/dropdown/DropdownValue";
import { getMonthNames } from "@/shared/date";
import { useParams, usePathname } from "next/navigation";
import {
  generateFolhaDePagamentoUrl,
  getFolhaDePagamentoSegment,
} from "../folhaDePagamentoState";

const meses = getMonthNames({ format: "long" });

export default function BreadcrumbFolhaDePagamentoMeses() {
  const routeParams = useParams();
  const segment = getFolhaDePagamentoSegment(usePathname())!;

  return (
    <li>
      <DropdownLinks
        generateUrl={([_, value]) =>
          generateFolhaDePagamentoUrl({
            ...routeParams,
            mes: value.value,
            segment,
          })
        }
        items={
          new Map(
            meses.map((mes, index) => [
              mes,
              createDropdownValue((index + 1).toString()),
            ])
          )
        }
        selected={createDropdownValue(routeParams.mes)}
      />
    </li>
  );
}
