"use client";
import BreadcrumbMunicipioSecao from "../_components/BreadcrumbMunicipioSecao";
import { PAGINAS_GESTAO_FISCAL } from "./routes";

export default function BreadcrumbGestaoFiscal() {
  return <BreadcrumbMunicipioSecao paginas={PAGINAS_GESTAO_FISCAL} />;
}
