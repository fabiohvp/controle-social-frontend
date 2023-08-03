"use client";
import { DropdownItem } from "@/components/dropdowns/dropdown/DropdownItem";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams } from "next/navigation";
import {
  PrestacaoDeContaGovernoPageProps,
  generatePrestacaoDeContaUrl,
} from "../routes";

export const PRESTACAO_DE_CONTA_TIPO_ESFERA_ADMINISTRATIVA: Map<
  string,
  DropdownValue<string>
> = new Map([
  ["Estado", createDropdownValue("estado")],
  ["Municípios", createDropdownValue("municipios")],
]);

export default function BreadcrumbPrestacaoDeContaTipoEsferaAdministrativa() {
  const routeParams = useParams() as PrestacaoDeContaGovernoPageProps;

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          generatePrestacaoDeContaUrl(routeChange(item, routeParams))
        }
        items={PRESTACAO_DE_CONTA_TIPO_ESFERA_ADMINISTRATIVA}
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
