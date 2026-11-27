"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";
import {
  GRUPOS_INDICADOR,
  getGrupoDoIndicador,
  getIndicadoresPorGrupo,
} from "../indicadoresConfig";
import {
  IndicadoresPageProps,
  generateIndicadoresUrl,
  getSlugIndicador,
} from "../routes";

const GRUPOS: Map<string, DropdownValue<string>> = new Map(
  GRUPOS_INDICADOR.map((grupo) => [grupo.titulo, createDropdownValue(grupo.slug)])
);

export default function BreadcrumbIndicadoresGrupos() {
  const pathname = usePathname();
  const routeParams = useParams() as IndicadoresPageProps;
  const grupo = getGrupoDoIndicador(getSlugIndicador(pathname));

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          generateIndicadoresUrl({
            ano: routeParams.ano,
            // primeira página configurada do grupo
            slug: getIndicadoresPorGrupo(item[1].value)[0]?.slug,
          })
        }
        items={GRUPOS}
        selected={createDropdownValue(grupo?.slug ?? "")}
      />
    </li>
  );
}
