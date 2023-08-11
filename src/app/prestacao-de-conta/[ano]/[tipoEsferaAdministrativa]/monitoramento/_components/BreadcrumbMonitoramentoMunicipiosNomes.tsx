"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { createDropdownValue } from "@/components/dropdowns/dropdown/DropdownValue";
import { useGlobalState } from "@/providers/GlobalProvider";
import { useParams } from "next/navigation";
import {
  MonitoramentoPageProps,
  generateMonitoramentoUrl,
} from "../[[...municipio]]/routes";

type Props = {
  active?: boolean;
};

const TODOS_OPTION = {
  nome: "Todos",
  codigo: "todos",
  nomeNormalizado: "todos",
};

export default function BreadcrumbMonitoramentoMunicipiosNomes({
  active,
}: Props) {
  const globalState = useGlobalState();
  const routeParams = useParams() as MonitoramentoPageProps;
  const municipios = [TODOS_OPTION, ...globalState.municipios];

  if (routeParams.tipoEsferaAdministrativa === "estado") {
    return <></>;
  }

  return (
    <li>
      <DropdownLinks
        active={active}
        generateUrl={(item) =>
          generateMonitoramentoUrl({
            ...routeParams,
            municipio: item[1].value,
          })
        }
        items={
          new Map(
            municipios.map((municipio) => [
              municipio.nome,
              createDropdownValue(municipio.nomeNormalizado),
            ])
          )
        }
        selected={createDropdownValue(routeParams.municipio)}
      />
    </li>
  );
}
