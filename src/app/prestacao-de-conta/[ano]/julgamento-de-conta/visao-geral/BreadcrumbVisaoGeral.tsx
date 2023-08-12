"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { useAtom } from "jotai";
import BreadcrumbPrestacaoDeContaLabel from "../../_components/BreadcrumbPrestacaoDeContaLabel";
import BreadcrumbJulgamentoDeContaLabel from "../_components/BreadcrumbJulgamentoDeContaLabel";
import BreadcrumbJulgamentoDeContaPaginas from "../_components/BreadcrumbJulgamentoDeContaPaginas";
import { generateJulgamentoDeContaUrl } from "../routes";
import { julgamentoDeContaState } from "./julgamentoDeContaState";

export default function BreadcrumbVisaoGeral() {
  const [state] = useAtom(julgamentoDeContaState);

  return (
    <>
      <BreadcrumbPrestacaoDeContaLabel />
      <BreadcrumbJulgamentoDeContaLabel />
      <BreadcrumbJulgamentoDeContaPaginas />
      <BreadcrumbAno
        anos={state.anos}
        generateUrl={generateJulgamentoDeContaUrl}
      />
    </>
  );
}
