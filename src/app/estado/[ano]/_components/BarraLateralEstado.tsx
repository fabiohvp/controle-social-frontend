"use client";
import SidebarMenu from "@/components/sidebar/SidebarMenu";
import { useParams } from "next/navigation";
import { EstadoPageProps, getUrlBaseEstado } from "../routes";
import { MENU_ESTADO } from "./menuEstado";

/** Itens vêm de menuEstado.tsx + routes.ts de cada seção; não edite aqui */
export default function BarraLateralEstado() {
  const { ano } = useParams() as EstadoPageProps;

  return <SidebarMenu itens={MENU_ESTADO} urlBase={getUrlBaseEstado(ano)} />;
}
