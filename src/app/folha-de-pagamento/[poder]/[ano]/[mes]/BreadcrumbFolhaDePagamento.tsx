"use client";
import BreadcrumbPessoalLabel from "@/app/folha-de-pagamento/_components/BreadcrumbPessoalLabel";
import { folhaDePagamentoState } from "@/app/folha-de-pagamento/folhaDePagamentoState";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { useAtom } from "jotai";
import { generateFolhaDePagamentoUrl } from "../../../routes";
import BreadcrumbFolhaDePagamentoPaginas from "../_components/BreadcrumbFolhaDePagamentoPaginas";
import BreadcrumbFolhaDePagamentoPoderes from "../_components/BreadcrumbFolhaDePagamentoPoderes";
import BreadcrumbFolhaDePagamentoTipoUnidadesGestoras from "../_components/BreadcrumbFolhaDePagamentoTipoUnidadesGestoras";
import BreadcrumbFolhaDePagamentoMeses from "./_components/BreadcrumbFolhaDePagamentoMeses";

export default function BreadcrumbFolhaDePagamento() {
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
      <BreadcrumbFolhaDePagamentoMeses />
      <BreadcrumbFolhaDePagamentoTipoUnidadesGestoras />
    </>
  );
}
