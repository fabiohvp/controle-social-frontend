"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import BreadcrumbPaginas from "@/components/breadcrumb/BreadcrumbPaginas";
import { Pagina, getPaginaPorSlug, getUrlComSegmento } from "@/shared/paginas";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { LISTA_PAGINAS_RAIZ_MUNICIPIO } from "../(root)/routes";
import { municipioState } from "../municipioState";
import {
  INDICE_SEGMENTO_ANO,
  INDICE_SEGMENTO_PAGINA,
  INDICE_SEGMENTO_SUBPAGINA,
} from "../routes";
import BreadcrumbMunicipiosNomes from "./BreadcrumbMunicipiosNomes";
import BreadcrumbMunicipiosPaginas from "./BreadcrumbMunicipiosPaginas";

type Props = {
  /** páginas da seção (routes.ts); sem isso é uma página da raiz */
  paginas?: Pagina[];
  /** itens extras entre o seletor de página e o de ano (ex.: unidade gestora) */
  children?: ReactNode;
};

/** Breadcrumb padrão: município > página > [subpágina] > [extras] > ano */
export default function BreadcrumbMunicipioSecao({ paginas, children }: Props) {
  const [state] = useAtom(municipioState);
  const pathname = usePathname();
  const segmentos = pathname.split("/");
  const paginaAtual = paginas
    ? getPaginaPorSlug(paginas, segmentos[INDICE_SEGMENTO_SUBPAGINA])
    : getPaginaPorSlug(
        LISTA_PAGINAS_RAIZ_MUNICIPIO,
        segmentos[INDICE_SEGMENTO_PAGINA]
      );

  return (
    <>
      <BreadcrumbMunicipiosNomes />
      <BreadcrumbMunicipiosPaginas />
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
