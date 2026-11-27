"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import {
  Pagina,
  getPaginasImplementadas,
  getUrlComSegmento,
} from "@/shared/paginas";
import { usePathname } from "next/navigation";

type Props = {
  /** páginas da seção (routes.ts); só as implementadas aparecem */
  paginas: Pagina[];
  /** posição do slug da página no pathname (split("/")) */
  indiceSegmento: number;
  /** corta o pathname após N segmentos ao trocar de página */
  manterSegmentos?: number;
};

/** Dropdown de páginas de uma seção (ex.: Metas de arrecadação | RCL | ...) */
export default function BreadcrumbPaginas({
  paginas,
  indiceSegmento,
  manterSegmentos,
}: Props) {
  const pathname = usePathname();
  const items: Map<string, DropdownValue<string>> = new Map(
    getPaginasImplementadas(paginas).map((pagina) => [
      pagina.titulo,
      createDropdownValue(pagina.slug),
    ])
  );

  return (
    <li>
      <DropdownLinks
        bodyProps={{ className: "!min-w-[220px]" }}
        generateUrl={(item) =>
          getUrlComSegmento(
            pathname,
            indiceSegmento,
            item[1].value,
            manterSegmentos
          )
        }
        items={items}
        selected={createDropdownValue(pathname.split("/")[indiceSegmento])}
      />
    </li>
  );
}
