"use client";
import BreadcrumbMunicipioSecao from "../_components/BreadcrumbMunicipioSecao";
import { PAGINAS_GESTAO_ORCAMENTARIA } from "./routes";

export default function BreadcrumbGestaoOrcamentaria() {
  return <BreadcrumbMunicipioSecao paginas={PAGINAS_GESTAO_ORCAMENTARIA} />;
}
