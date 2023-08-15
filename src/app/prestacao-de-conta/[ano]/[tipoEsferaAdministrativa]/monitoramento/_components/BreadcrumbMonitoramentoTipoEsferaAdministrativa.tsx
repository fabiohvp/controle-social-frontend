"use client";
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
          generateMonitoramentoUrl({ ...routeParams, municipio: item[1].value })
        }
        items={MONITORAMENTO_TIPO_ESFERA_ADMINISTRATIVA}
        selected={createDropdownValue(routeParams.tipoEsferaAdministrativa)}
      />
    </li>
  );
}
