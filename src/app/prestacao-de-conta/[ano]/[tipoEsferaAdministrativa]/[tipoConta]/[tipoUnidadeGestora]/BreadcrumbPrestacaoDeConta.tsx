"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { useAtom } from "jotai";
import BreadcrumbPrestacaoDeContaLabel from "../../../_components/BreadcrumbPrestacaoDeContaLabel";
import { prestacaoDeContaState } from "../../../prestacaoDeContaState";
import { generatePrestacaoDeContaUrl } from "../../../routes";
import BreadcrumbPrestacaoDeContaTipoConta from "./_components/BreadcrumbPrestacaoDeContaTipoConta";
import BreadcrumbPrestacaoDeContaTipoEsferaAdministrativa from "./_components/BreadcrumbPrestacaoDeContaTipoEsferaAdministrativa";
import BreadcrumbPrestacaoDeContaTipoUnidadeGestora from "./_components/BreadcrumbPrestacaoDeContaTipoUnidadeGestora";

export default function BreadcrumbPrestacaoDeConta({
  tiposUnidadesGestoras,
}: {
  tiposUnidadesGestoras: Map<string, string>;
}) {
  const [state] = useAtom(prestacaoDeContaState);

  return (
    <>
      <BreadcrumbPrestacaoDeContaLabel />
      <BreadcrumbPrestacaoDeContaTipoEsferaAdministrativa />
      <BreadcrumbAno
        anos={state.anos}
        generateUrl={generatePrestacaoDeContaUrl}
      />
      <BreadcrumbPrestacaoDeContaTipoConta />
      <BreadcrumbPrestacaoDeContaTipoUnidadeGestora
        tiposUnidadesGestoras={tiposUnidadesGestoras}
      />
    </>
  );
}
