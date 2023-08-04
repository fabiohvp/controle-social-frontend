"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { MunicipiosProps } from "@/types/Municipio";
import { useAtom } from "jotai";
import BreadcrumbMunicipiosNomes from "../_components/BreadcrumbMunicipiosNomes";
import BreadcrumbMunicipiosPaginas from "../_components/BreadcrumbMunicipiosPaginas";
import { municipioState } from "../municipioState";
import BreadcrumbGestaoFiscalPaginas from "./_components/BreadcrumbGestaoFiscalPaginas";
import { generateGestaoFiscalUrl } from "./routes";

export default function GestaoFiscalItensSubmenu({
  municipios,
}: MunicipiosProps) {
  const [state] = useAtom(municipioState);

  return (
    <>
      <BreadcrumbMunicipiosNomes />
      <BreadcrumbMunicipiosPaginas />
      <BreadcrumbGestaoFiscalPaginas />
      <BreadcrumbAno anos={state.anos} generateUrl={generateGestaoFiscalUrl} />
    </>
  );
}
