"use client";
import BreadcrumbFolhaDePagamentoPaginas from "@/app/folha-de-pagamento/_components/BreadcrumbFolhaDePagamentoPaginas";
import BreadcrumbFolhaDePagamentoPoderes from "@/app/folha-de-pagamento/_components/BreadcrumbFolhaDePagamentoPoderes";
import BreadcrumbFolhaDePagamentoTipoUnidadesGestoras from "@/app/folha-de-pagamento/_components/BreadcrumbFolhaDePagamentoTipoUnidadesGestoras";
import BreadcrumbPessoalLabel from "@/app/folha-de-pagamento/_components/BreadcrumbPessoalLabel";
import { folhaDePagamentoState } from "@/app/folha-de-pagamento/folhaDePagamentoState";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { useAtom } from "jotai";
import { generateFolhaDePagamentoUrl } from "../[mes]/routes";

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
