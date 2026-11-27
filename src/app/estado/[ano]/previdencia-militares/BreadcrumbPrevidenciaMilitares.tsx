"use client";
import BreadcrumbEstadoSecao from "../_components/BreadcrumbEstadoSecao";
import { PAGINAS_PREVIDENCIA_MILITARES } from "./routes";

/** Uma só UG (500E2900001): sem seletor de unidade gestora */
export default function BreadcrumbPrevidenciaMilitares() {
  return <BreadcrumbEstadoSecao paginas={PAGINAS_PREVIDENCIA_MILITARES} />;
}
