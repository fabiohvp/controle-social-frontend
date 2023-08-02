"use client";
import BreadcrumbFolhaDePagamentoMeses from "@/app/folha-de-pagamento/[poder]/[ano]/[mes]/_components/BreadcrumbFolhaDePagamentoMeses";
import BreadcrumbFolhaDePagamentoPaginas from "@/app/folha-de-pagamento/_components/BreadcrumbFolhaDePagamentoPaginas";
import BreadcrumbFolhaDePagamentoPoderes from "@/app/folha-de-pagamento/_components/BreadcrumbFolhaDePagamentoPoderes";
import BreadcrumbFolhaDePagamentoTipoUnidadesGestoras from "@/app/folha-de-pagamento/_components/BreadcrumbFolhaDePagamentoTipoUnidadesGestoras";
import BreadcrumbPessoalLabel from "@/app/folha-de-pagamento/_components/BreadcrumbPessoalLabel";
import { folhaDePagamentoState } from "@/app/folha-de-pagamento/folhaDePagamentoState";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { useAtom } from "jotai";
import { generateFolhaDePagamentoUrl } from "./routes";

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
