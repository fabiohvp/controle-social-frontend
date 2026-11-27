"use client";
import BreadcrumbMenu from "@/components/breadcrumb/BreadcrumbMenu";
import { useParams } from "next/navigation";
import {
  EstadoPageProps,
  INDICE_SEGMENTO_PAGINA,
  getUrlBaseEstado,
} from "../routes";
import { MENU_ESTADO } from "./menuEstado";

export default function BreadcrumbEstadoPaginas() {
  const { ano } = useParams() as EstadoPageProps;

  return (
    <BreadcrumbMenu
      itens={MENU_ESTADO}
      urlBase={getUrlBaseEstado(ano)}
      indiceSegmento={INDICE_SEGMENTO_PAGINA}
    />
  );
}
