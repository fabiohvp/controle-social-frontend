"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { useAtom } from "jotai";
import BreadcrumbFiscalizacaoLabel from "../../_components/BreadcrumbFiscalizacaoLabel";
import BreadcrumbControleInternoLabel from "./_components/BreadcrumbControleInternoLabel";
import BreadcrumbControleInternoPaginas from "./_components/BreadcrumbControleInternoPaginas";
import { controleInternoState } from "./controleInternoState";
import { generateControleInternoUrl } from "./routes";

export default function BreadcrumbControleInterno() {
  const [state] = useAtom(controleInternoState);

  return (
    <>
      <BreadcrumbFiscalizacaoLabel />
      <BreadcrumbControleInternoLabel />
      <BreadcrumbControleInternoPaginas />
      <BreadcrumbAno
        anos={state.anos}
        generateUrl={generateControleInternoUrl}
      />
    </>
  );
}
