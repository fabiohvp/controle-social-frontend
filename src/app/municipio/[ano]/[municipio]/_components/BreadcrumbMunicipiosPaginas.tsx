"use client";
import BreadcrumbMenu from "@/components/breadcrumb/BreadcrumbMenu";
import { useParams } from "next/navigation";
import {
  INDICE_SEGMENTO_PAGINA,
  MunicipioPageProps,
  getUrlBaseMunicipio,
} from "../routes";
import { MENU_MUNICIPIO } from "./menuMunicipio";

export default function BreadcrumbMunicipiosPaginas() {
  const { ano, municipio } = useParams() as MunicipioPageProps;

  return (
    <BreadcrumbMenu
      itens={MENU_MUNICIPIO}
      urlBase={getUrlBaseMunicipio(ano, municipio)}
      indiceSegmento={INDICE_SEGMENTO_PAGINA}
    />
  );
}
