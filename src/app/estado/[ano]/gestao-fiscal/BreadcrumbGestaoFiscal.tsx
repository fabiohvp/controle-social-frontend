"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { useAtom } from "jotai";
import BreadcrumbEstadoLabel from "../_components/BreadcrumbEstadoLabel";
import BreadcrumbEstadoPaginas from "../_components/BreadcrumbEstadoPaginas";
import { estadoState } from "../estadoState";
import BreadcrumbGestaoFiscalPaginas from "./_components/BreadcrumbGestaoFiscalPaginas";
import { generateGestaoFiscalUrl } from "./routes";

export default function BreadcrumbGestaoFiscal() {
  const [state] = useAtom(estadoState);

  return (
    <>
      <BreadcrumbEstadoLabel />
      <BreadcrumbEstadoPaginas />
      <BreadcrumbGestaoFiscalPaginas />
      <BreadcrumbAno anos={state.anos} generateUrl={generateGestaoFiscalUrl} />
    </>
  );
}
