"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { createDropdownValue } from "@/components/dropdowns/dropdown/DropdownValue";
import { useGlobalState } from "@/providers/GlobalProvider";
import { getUrlComSegmento } from "@/shared/paginas";
import { useParams, usePathname } from "next/navigation";
import {
  INDICE_SEGMENTO_MUNICIPIO,
  INDICE_SEGMENTO_SUBPAGINA,
  MunicipioPageProps,
} from "../routes";

type Props = {
  active?: boolean;
};

export default function BreadcrumbMunicipiosNomes({ active }: Props) {
  const globalState = useGlobalState();
  const pathname = usePathname();
  const routeParams = useParams() as MunicipioPageProps;
  const municipios = globalState.municipios;

  return (
    <li>
      <DropdownLinks<unknown>
        active={active}
        // mantém a página/subpágina; descarta o código de UG (é do município anterior)
        generateUrl={(item) =>
          getUrlComSegmento(
            pathname,
            INDICE_SEGMENTO_MUNICIPIO,
            item[1].value,
            INDICE_SEGMENTO_SUBPAGINA + 1
          )
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
