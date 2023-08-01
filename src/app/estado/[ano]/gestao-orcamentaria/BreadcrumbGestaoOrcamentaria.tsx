"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { useAtom } from "jotai";
import BreadcrumbEstadoLabel from "../_components/BreadcrumbEstadoLabel";
import BreadcrumbEstadoPaginas from "../_components/BreadcrumbEstadoPaginas";
import { estadoState } from "../estadoState";
import { generateEstadoUrl } from "../routes";
import BreadcrumbGestaoOrcamentariaPaginas from "./_components/BreadcrumbGestaoOrcamentariaPaginas";

export default function BreadcrumbGestaoOrcamentaria() {
  const [state] = useAtom(estadoState);

  return (
    <>
      <BreadcrumbEstadoLabel />
      <BreadcrumbEstadoPaginas />
      <BreadcrumbGestaoOrcamentariaPaginas />
      <BreadcrumbAno anos={state.anos} generateUrl={generateEstadoUrl} />
    </>
  );
}
