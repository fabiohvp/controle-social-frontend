"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { createDropdownValue } from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams } from "next/navigation";
import {
  PrestacaoDeContaGovernoPageProps,
  generatePrestacaoDeContaUrl,
} from "../routes";

export default function BreadcrumbPrestacaoDeContaTipoUnidadeGestora({
  tiposUnidadesGestoras,
}: {
  tiposUnidadesGestoras: Map<string, string>;
}) {
  const routeParams = useParams() as PrestacaoDeContaGovernoPageProps;

  if (routeParams.tipoConta === "governo") {
    return <></>;
  }

  return (
    <li>
      <DropdownLinks
        bodyProps={{ className: "!min-w-[260px]" }}
        generateUrl={(item) =>
          generatePrestacaoDeContaUrl({
            ...routeParams,
            tipoUnidadeGestora: item[1].value,
          })
        }
        items={
          new Map(
            [...tiposUnidadesGestoras].map(([key, value]) => [
              value,
              createDropdownValue(key),
            ])
          )
        }
        selected={createDropdownValue(routeParams.tipoUnidadeGestora)}
      />
    </li>
  );
}
