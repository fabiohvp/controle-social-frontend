import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import AlertPanel from "@/components/panel/AlertPanel";
import { ReactNode } from "react";
import BreadcrumbDesigualdadeEducacional from "./BreadcrumbDesigualdadeEducacional";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="pt-2 px-2"
      exibirFooter={false}
      itensBreadcrumb={BreadcrumbDesigualdadeEducacional}
    >
      <AlertPanel type="info">
        Auditoria que teve por objetivo avaliar a governança da política pública
        estadual de educação do ponto de vista da redução da desigualdade de
        ensino e aprendizagem no Estado do Espírito Santo, em observância aos
        princípios e metas previstos no Objetivo de Desenvolvimento Sustentável
        4 da ONU (Organização das Nações Unidas).
        <br />O ODS 4 é Assegurar a educação inclusiva e equitativa e de
        qualidade, e promover oportunidades de aprendizagem ao longo da vida
        para todos. https://www.ipea.gov.br/ods/ods4.html.
      </AlertPanel>
      {children}
    </DashboardLayout>
  );
}
