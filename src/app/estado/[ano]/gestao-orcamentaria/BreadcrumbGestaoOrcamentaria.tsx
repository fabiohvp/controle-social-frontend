"use client";
import BreadcrumbEstadoSecao from "../_components/BreadcrumbEstadoSecao";
import { PAGINAS_GESTAO_ORCAMENTARIA } from "./routes";

export default function BreadcrumbGestaoOrcamentaria() {
  return <BreadcrumbEstadoSecao paginas={PAGINAS_GESTAO_ORCAMENTARIA} />;
}
