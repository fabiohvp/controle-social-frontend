"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { MunicipiosProps } from "@/types/Municipio";
import { useAtom } from "jotai";
import BreadcrumbMunicipiosNomes from "../_components/BreadcrumbMunicipiosNomes";
import BreadcrumbMunicipiosPaginas from "../_components/BreadcrumbMunicipiosPaginas";
import { municipioState } from "../municipioState";
import { generateMunicipioUrl } from "../routes";

export default function BreadcrumbMunicipio({ municipios }: MunicipiosProps) {
  const [state] = useAtom(municipioState);

  return (
    <>
      <BreadcrumbMunicipiosNomes municipios={municipios} />
      <BreadcrumbMunicipiosPaginas />
      <BreadcrumbAno anos={state.anos} generateUrl={generateMunicipioUrl} />
    </>
  );
}
