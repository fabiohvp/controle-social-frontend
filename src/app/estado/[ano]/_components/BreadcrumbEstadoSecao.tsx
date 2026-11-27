"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import BreadcrumbPaginas from "@/components/breadcrumb/BreadcrumbPaginas";
import { Pagina, getPaginaPorSlug, getUrlComSegmento } from "@/shared/paginas";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { LISTA_PAGINAS_RAIZ_ESTADO } from "../(root)/routes";
import { estadoState } from "../estadoState";
import {
  INDICE_SEGMENTO_ANO,
  INDICE_SEGMENTO_PAGINA,
  INDICE_SEGMENTO_SUBPAGINA,
} from "../routes";
import BreadcrumbEstadoLabel from "./BreadcrumbEstadoLabel";
import BreadcrumbEstadoPaginas from "./BreadcrumbEstadoPaginas";

type Props = {
  /** páginas da seção (routes.ts); sem isso é uma página da raiz */
  paginas?: Pagina[];
  /** itens extras entre o seletor de página e o de ano (ex.: unidade gestora) */
  children?: ReactNode;
};

/** Breadcrumb padrão: Estado > página > [subpágina] > [extras] > ano */
export default function BreadcrumbEstadoSecao({ paginas, children }: Props) {
  const [state] = useAtom(estadoState);
  const pathname = usePathname();
  const segmentos = pathname.split("/");
  const paginaAtual = paginas
    ? getPaginaPorSlug(paginas, segmentos[INDICE_SEGMENTO_SUBPAGINA])
    : getPaginaPorSlug(
        LISTA_PAGINAS_RAIZ_ESTADO,
        segmentos[INDICE_SEGMENTO_PAGINA]
      );

  return (
    <>
      <BreadcrumbEstadoLabel />
      <BreadcrumbEstadoPaginas />
      {paginas && (
        <BreadcrumbPaginas
          paginas={paginas}
          indiceSegmento={INDICE_SEGMENTO_SUBPAGINA}
        />
      )}
      {children}
      <BreadcrumbAno
        anos={paginaAtual?.anos ?? state.anos}
        generateUrl={({ ano, pathname }) =>
          getUrlComSegmento(pathname, INDICE_SEGMENTO_ANO, ano)
        }
      />
    </>
  );
}
