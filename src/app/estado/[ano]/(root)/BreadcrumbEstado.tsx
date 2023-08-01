"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { useAtom } from "jotai";
import BreadcrumbEstadoLabel from "../_components/BreadcrumbEstadoLabel";
import MenuEstadoPages from "../_components/BreadcrumbEstadoPaginas";
import { estadoState } from "../estadoState";
import { generateEstadoUrl } from "../routes";

export default function BreadcrumbEstado() {
  const [state] = useAtom(estadoState);

  return (
    <>
      <BreadcrumbEstadoLabel />
      <MenuEstadoPages />
      <BreadcrumbAno anos={state.anos} generateUrl={generateEstadoUrl} />
    </>
  );
}
