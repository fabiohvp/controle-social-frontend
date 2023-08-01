"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams } from "next/navigation";
import { generatePrestacaoDeContaUrl } from "../../../../routes";
import { PrestacaoDeContaGovernoPageProps } from "../../../../types";

export const PRESTACAO_DE_CONTA_TIPO_ESFERA_ADMINISTRATIVA: Map<
  string,
  DropdownValue<string>
> = new Map([
  ["Gestão", createDropdownValue("gestao")],
  ["Governo", createDropdownValue("governo")],
]);

export default function BreadcrumbPrestacaoDeContaTipoConta() {
  const routeParams = useParams() as PrestacaoDeContaGovernoPageProps;

  return (
    <li>
      <DropdownLinks
        generateUrl={([_, value]) =>
          generatePrestacaoDeContaUrl(routeChange(value.value, routeParams))
        }
        items={PRESTACAO_DE_CONTA_TIPO_ESFERA_ADMINISTRATIVA}
        selected={createDropdownValue(routeParams.tipoConta)}
      />
    </li>
  );
}

function routeChange(
  itemValue: string,
  routeParams: PrestacaoDeContaGovernoPageProps
) {
  const newRouteParams = {
    ...routeParams,
    tipoConta: itemValue,
  };
  if (routeParams.tipoConta !== itemValue) {
    if (routeParams.tipoEsferaAdministrativa === "estado") {
      newRouteParams.tipoUnidadeGestora = "10";
    } else {
      newRouteParams.tipoUnidadeGestora = "07";
    }
  }
  return newRouteParams;
}
