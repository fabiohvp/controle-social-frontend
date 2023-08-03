"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { useAtom } from "jotai";
import BreadcrumbEstadoLabel from "../_components/BreadcrumbEstadoLabel";
import BreadcrumbEstadoPaginas from "../_components/BreadcrumbEstadoPaginas";
import { estadoState } from "../estadoState";
import BreadcrumbGestaoOrcamentariaPaginas from "./_components/BreadcrumbGestaoOrcamentariaPaginas";
import { generateGestaoOrcamentariaUrl } from "./routes";

export default function BreadcrumbGestaoOrcamentaria() {
  const [state] = useAtom(estadoState);

  return (
    <>
      <BreadcrumbEstadoLabel />
      <BreadcrumbEstadoPaginas />
      <BreadcrumbGestaoOrcamentariaPaginas />
      <BreadcrumbAno
        anos={state.anos}
        generateUrl={generateGestaoOrcamentariaUrl}
      />
    </>
  );
}
