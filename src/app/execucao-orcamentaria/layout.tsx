import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import AlertPanel from "@/components/panel/AlertPanel";
import { ReactNode } from "react";
import BreadcrumbExecucaoOrcamentaria from "./BreadcrumbExecucaoOrcamentaria";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="px-2 pt-2"
      exibirFooter={false}
      itensBreadcrumb={BreadcrumbExecucaoOrcamentaria}
    >
      <AlertPanel type="info">
        <p>
          É o efetivo cumprimento do que foi planejado e aprovado na lei
          orçamentária, ou seja, arrecadação das receitas estimadas e realização
          das despesas autorizadas.
        </p>
        <p>
          É uma das etapas do ciclo orçamentário, que é composto das seguintes
          fases: planejamento/elaboração, apreciação legislativa, execução,
          controle e avaliação.
        </p>
      </AlertPanel>
      {children}
    </DashboardLayout>
  );
}
