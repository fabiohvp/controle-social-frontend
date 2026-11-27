"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { getPaginaPorSlug, getUrlComSegmento } from "@/shared/paginas";
import {
  PaginaPrevidencia,
  UnidadeGestoraPrevidencia,
  filtrarUnidadesGestorasDaPagina,
} from "@/shared/previdencia";
import { usePathname } from "next/navigation";

type Props = {
  /** UGs de RPPS do ente (carregadas no layout da seção, no servidor) */
  unidadesGestoras: UnidadeGestoraPrevidencia[];
  /** páginas da seção, para aplicar o `filtrarUnidadesGestoras` da página atual */
  paginas: PaginaPrevidencia[];
  /** posição do slug da página no pathname; a UG vem logo depois */
  indiceSegmentoPagina: number;
};

/** Seletor de unidade gestora (IPAM / Fundo Financeiro / Fundo Previdenciário) */
export default function BreadcrumbUnidadeGestora({
  unidadesGestoras,
  paginas,
  indiceSegmentoPagina,
}: Props) {
  const pathname = usePathname();
  const segmentos = pathname.split("/");
  const pagina = getPaginaPorSlug(paginas, segmentos[indiceSegmentoPagina]);
  const validas = filtrarUnidadesGestorasDaPagina(pagina, unidadesGestoras);

  if (!validas.length) return null;

  const items: Map<string, DropdownValue<string>> = new Map(
    validas.map((ug) => [ug.titulo, createDropdownValue(ug.codigo)])
  );

  return (
    <li>
      <DropdownLinks
        bodyProps={{ className: "!min-w-[220px]" }}
        generateUrl={(item) =>
          getUrlComSegmento(
            pathname,
            indiceSegmentoPagina + 1,
            item[1].value,
            indiceSegmentoPagina + 2
          )
        }
        items={items}
        selected={createDropdownValue(segmentos[indiceSegmentoPagina + 1])}
      />
    </li>
  );
}
