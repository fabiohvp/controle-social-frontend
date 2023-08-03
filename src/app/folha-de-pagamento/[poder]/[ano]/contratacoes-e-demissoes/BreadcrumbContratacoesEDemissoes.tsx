"use client";
import BreadcrumbFolhaDePagamentoPaginas from "@/app/folha-de-pagamento/[poder]/[ano]/_components/BreadcrumbFolhaDePagamentoPaginas";
import BreadcrumbPessoalLabel from "@/app/folha-de-pagamento/_components/BreadcrumbPessoalLabel";
import { folhaDePagamentoState } from "@/app/folha-de-pagamento/folhaDePagamentoState";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { useAtom } from "jotai";
import { generateFolhaDePagamentoUrl } from "../../../routes";
import BreadcrumbFolhaDePagamentoPoderes from "../_components/BreadcrumbFolhaDePagamentoPoderes";
import BreadcrumbFolhaDePagamentoTipoUnidadesGestoras from "../_components/BreadcrumbFolhaDePagamentoTipoUnidadesGestoras";

export default function BreadcrumbContratacoesEDemissoes() {
  const [state] = useAtom(folhaDePagamentoState);

  return (
    <>
      <BreadcrumbPessoalLabel />
      <BreadcrumbFolhaDePagamentoPaginas />
      <BreadcrumbFolhaDePagamentoPoderes />
      <BreadcrumbAno
        anos={state.anos}
        generateUrl={generateFolhaDePagamentoUrl}
      />
      <BreadcrumbFolhaDePagamentoTipoUnidadesGestoras />
    </>
  );
}
