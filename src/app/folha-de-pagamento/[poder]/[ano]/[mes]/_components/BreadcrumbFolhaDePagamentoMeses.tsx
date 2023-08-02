"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";

import { createDropdownValue } from "@/components/dropdowns/dropdown/DropdownValue";
import { getMonthNames } from "@/shared/date";
import { useParams, usePathname } from "next/navigation";
import {
  FolhaDePagamentoPageProps,
  generateFolhaDePagamentoUrl,
} from "../routes";

const meses = getMonthNames({ format: "long" });

export default function BreadcrumbFolhaDePagamentoMeses() {
  const routeParams = useParams() as FolhaDePagamentoPageProps;
  const pathname = usePathname();

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          generateFolhaDePagamentoUrl({
            ...routeParams,
            item,
            pathname,
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
