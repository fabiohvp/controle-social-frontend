"use client";
import SidebarMenu from "@/components/sidebar/SidebarMenu";
import { useParams } from "next/navigation";
import { MunicipioPageProps, getUrlBaseMunicipio } from "../routes";
import { MENU_MUNICIPIO } from "./menuMunicipio";

/** Itens vêm de menuMunicipio.tsx + routes.ts de cada seção; não edite aqui */
export default function BarraLateralMunicipios() {
  const { ano, municipio } = useParams() as MunicipioPageProps;

  return (
    <SidebarMenu
      itens={MENU_MUNICIPIO}
      urlBase={getUrlBaseMunicipio(ano, municipio)}
    />
  );
}
