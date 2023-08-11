"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { useAtom } from "jotai";
import BreadcrumbPrestacaoDeContaLabel from "../../../_components/BreadcrumbPrestacaoDeContaLabel";
import BreadcrumbMonitoramentoLabel from "../_components/BreadcrumbMonitoramentoLabel";
import BreadcrumbMonitoramentoMunicipiosNomes from "../_components/BreadcrumbMonitoramentoMunicipiosNomes";
import BreadcrumbMonitoramentoTipoEsferaAdministrativa from "../_components/BreadcrumbMonitoramentoTipoEsferaAdministrativa";
import { monitoramentoState } from "./monitoramento";
import { generateMonitoramentoUrl } from "./routes";

export default function BreadcrumbMonitoramento() {
  const [state] = useAtom(monitoramentoState);

  return (
    <>
      <BreadcrumbPrestacaoDeContaLabel />
      <BreadcrumbMonitoramentoLabel />
      <BreadcrumbMonitoramentoTipoEsferaAdministrativa />
      <BreadcrumbMonitoramentoMunicipiosNomes />
      <BreadcrumbAno anos={state.anos} generateUrl={generateMonitoramentoUrl} />
    </>
  );
}
