"use client";
import { DropdownItem } from "@/components/dropdowns/dropdown/DropdownItem";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams } from "next/navigation";
import {
  MonitoramentoPageProps,
  generateMonitoramentoUrl,
} from "../[[...municipio]]/routes";

export const MONITORAMENTO_TIPO_ESFERA_ADMINISTRATIVA: Map<
  string,
  DropdownValue<string>
> = new Map([
  ["Estado", createDropdownValue("estado")],
  ["Municípios", createDropdownValue("municipios")],
]);

export default function BreadcrumbMonitoramentoTipoEsferaAdministrativa() {
  const routeParams = useParams() as MonitoramentoPageProps;

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          generateMonitoramentoUrl(routeChange(item, routeParams))
        }
        items={MONITORAMENTO_TIPO_ESFERA_ADMINISTRATIVA}
        selected={createDropdownValue(routeParams.tipoEsferaAdministrativa)}
      />
    </li>
  );
}

function routeChange<T>(
  item: DropdownItem<T>,
  routeParams: PrestacaoDeContaGovernoPageProps
) {
  const value = item[1].value;
  const newRouteParams = {
    ...routeParams,
    tipoEsferaAdministrativa: value,
  };
  if (routeParams.tipoEsferaAdministrativa !== value) {
    newRouteParams.tipoConta = "governo";

    if (value === "estado") {
      newRouteParams.tipoUnidadeGestora = "10";
    } else {
      newRouteParams.tipoUnidadeGestora = "07";
    }
  }
  return newRouteParams;
}
