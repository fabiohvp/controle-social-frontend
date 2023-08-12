"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { useAtom } from "jotai";
import BreadcrumbPrestacaoDeContaLabel from "../../../_components/BreadcrumbPrestacaoDeContaLabel";
import BreadcrumbJulgamentoDeContaLabel from "../../_components/BreadcrumbJulgamentoDeContaLabel";
import BreadcrumbJulgamentoDeContaPaginas from "../../_components/BreadcrumbJulgamentoDeContaPaginas";
import { generateJulgamentoDeContaUrl } from "../../routes";
import BreadcrumbMunicipioMunicipiosNomes from "../_components/BreadcrumbMunicipioMunicipiosNomes";
import { sessaoState } from "./sessaoState";

export default function BreadcrumbSessao() {
  const [state] = useAtom(sessaoState);

  return (
    <>
      <BreadcrumbPrestacaoDeContaLabel />
      <BreadcrumbJulgamentoDeContaLabel />
      <BreadcrumbJulgamentoDeContaPaginas />
      <BreadcrumbMunicipioMunicipiosNomes />
      <BreadcrumbAno
        anos={state.anos}
        generateUrl={generateJulgamentoDeContaUrl}
      />
    </>
  );
}
