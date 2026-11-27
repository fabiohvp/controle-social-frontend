"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";
import { getGrupoDoIndicador, getIndicadoresPorGrupo } from "../indicadoresConfig";
import {
  IndicadoresPageProps,
  generateIndicadoresUrl,
  getSlugIndicador,
} from "../routes";

export default function BreadcrumbIndicadoresPaginas() {
  const pathname = usePathname();
  const routeParams = useParams() as IndicadoresPageProps;
  const slug = getSlugIndicador(pathname);
  const indicadores = getIndicadoresPorGrupo(getGrupoDoIndicador(slug)?.slug);

  // grupos com uma única página não precisam do segundo seletor
  if (indicadores.length < 2) return null;

  const pages: Map<string, DropdownValue<string>> = new Map(
    indicadores.map((indicador) => [
      indicador.titulo,
      createDropdownValue(indicador.slug),
    ])
  );

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          generateIndicadoresUrl({ ano: routeParams.ano, slug: item[1].value })
        }
        items={pages}
        selected={createDropdownValue(slug)}
      />
    </li>
  );
}
