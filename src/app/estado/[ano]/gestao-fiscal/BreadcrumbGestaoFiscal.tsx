"use client";
import BreadcrumbEstadoSecao from "../_components/BreadcrumbEstadoSecao";
import { PAGINAS_GESTAO_FISCAL } from "./routes";

export default function BreadcrumbGestaoFiscal() {
  return <BreadcrumbEstadoSecao paginas={PAGINAS_GESTAO_FISCAL} />;
}
